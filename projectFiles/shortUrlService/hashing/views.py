import django.core.validators
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from pymongo import MongoClient
import hashlib
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
import datetime
from django.http import JsonResponse
from bson import json_util, ObjectId
import json
from django.shortcuts import redirect
import re
from django.core.cache import cache
from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT

CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)

try:
    connect_string = 'mongodb+srv://mukul:samplepassword@cluster0.2ergm.mongodb.net/test'
    db_client = MongoClient(connect_string)
    dbname = db_client['shortURLDB']
    url_collection = dbname['URL']
except Exception as error:
    print(error)


def get_domain_name():
    return "http://127.0.0.1:8000/"


def short_url_check(request, tiny_url_path):
    if url_collection.find({"shortURL": get_domain_name() + tiny_url_path}).count() > 0:
        return True
    return False


def url_validator(url):
    regex = ("[a-zA-Z0-9@:%._\\+~#?&//=]" +
             "{2,256}\\.[a-z]" +
             "{2,6}\\b([-a-zA-Z0-9@:%" +
             "._\\+~#?&//=]*)")
    p = re.compile(regex)

    if url is None:
        return False

    if re.search(p, url):
        return True
    else:
        return False


@csrf_exempt
def generate_short_url(request):
    if request.method == 'POST':
        post_data = json.loads(request.body.decode("utf-8"))
        url = post_data.get('url')

        try:
            milliseconds_expiration_date_and_time = post_data.get('expirationDateAndTime')
        except:
            milliseconds_expiration_date_and_time = 8.64e+7

        # Check- Given Url is valid
        if not url_validator(url):
            return JsonResponse({"Error": "Given url is not valid"})

        # Check if tinyurl is given
        if get_domain_name() in url:
            return JsonResponse({"Error": "Cannot create tiny Url for this domain."})

        if url in cache:
            record = cache.get(url)
            page_sanitized = json.loads(json_util.dumps(record))
            return JsonResponse(page_sanitized)

        # Converting the URL to 32 bit MD5 hash value.
        key32 = hashlib.md5(url.encode()).hexdigest()
        tiny_url_path = key32[:7]

        for i in range(25):
            # Check database if key is present
            flag = short_url_check(request, tiny_url_path)
            if not flag:
                current_date_and_time = datetime.datetime.utcnow()
                hours_added = datetime.timedelta(milliseconds=milliseconds_expiration_date_and_time)
                future_date_and_time = current_date_and_time + hours_added

                record = {"shortURL": get_domain_name() + tiny_url_path,
                          "isPrivate": False,
                          "originalURL": url,
                          "creationDate": current_date_and_time,
                          "expirationDate": future_date_and_time}
                url_collection.insert_one(record)
                page_sanitized = json.loads(json_util.dumps(record))
                cache.set(url, record, timeout = milliseconds_expiration_date_and_time / 1000)
                cache.set(get_domain_name() + tiny_url_path, record, timeout = milliseconds_expiration_date_and_time / 1000)
                return JsonResponse(page_sanitized)
            else:
                tiny_url_path = key32[(i + 1): (i + 8)]

        return JsonResponse({"Error": "Cannot create Tiny URL for given URL"})


def get_original_url(request):
    pass


@csrf_exempt
def redirect_url(request):
    try:
        if (get_domain_name() + request.path[1:]) in cache:
            record = cache.get(get_domain_name() + request.path[1:])
            return redirect(record["originalURL"])
        else:
            urls = url_collection.find({"shortURL": get_domain_name() + request.path[1:]})
            for url in urls:
                longURL = url['originalURL']
                expDate = url['expirationDate']
                today = datetime.datetime.utcnow()
                remainingTimeToExp = expDate - today
                if(remainingTimeToExp > 0):
                    cache.set(get_domain_name() + request.path[1:], longURL, timeout=remainingTimeToExp.total_seconds())
                return redirect(longURL)
    except Exception as e:
        return HttpResponse(e)

    return HttpResponse("Given url does not exist")


def delete_url_data(request):
    # docs = url_collection.find({})
    # print(docs)
    # for r in docs:
    domain = request.build_absolute_uri('/')[:-1]
    print("****")
    print(domain)

    return HttpResponse(domain)
