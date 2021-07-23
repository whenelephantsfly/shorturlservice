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

connect_string = 'mongodb+srv://mukul:samplepassword@cluster0.2ergm.mongodb.net/test'
db_client = MongoClient(connect_string)
dbname = db_client['shortURLDB']
url_collection = dbname['URL']


def get_short_url(request, tiny_url_path):
    if url_collection.find({"shortURL": request.build_absolute_uri('/')[:-1] + "/" + tiny_url_path}).count() > 0:
        return True
    return False


def url_validator(url):
    try:
        URLValidator()(url)
        return True
    except ValidationError:
        return False


@csrf_exempt
def generate_short_url(request):
    if request.method == 'POST':
        url = request.POST.get('url')
        # Check- Given Url is valid
        if not url_validator(url):
            return HttpResponse("Given url is not valid")

        # Check if tinyurl is given
        if request.build_absolute_uri('/')[:-1] in url:
            return HttpResponse("Cannot create tiny Url for this domain.")

        # Converting the URL to 32 bit MD5 hash value.
        key32 = hashlib.md5(url.encode()).hexdigest()
        tiny_url_path = key32[:7]

        for i in range(25):
            # Check database if key is present
            flag = get_short_url(request, tiny_url_path)
            if not flag:
                current_date_and_time = datetime.datetime.now()
                hours_added = datetime.timedelta(hours=24)
                future_date_and_time = current_date_and_time + hours_added

                record = {"shortURL": request.build_absolute_uri('/')[:-1] + "/" + tiny_url_path,
                          "isPrivate": False,
                          "originalURL": url,
                          "creationDate":  current_date_and_time.utcnow().isoformat(),
                          "expirationDate":  future_date_and_time.utcnow().isoformat()}
                url_collection.insert_one(record)
                # Remaining - Return complete Json object.
                page_sanitized = json.loads(json_util.dumps(record))
                return JsonResponse(page_sanitized)
            else:
                tiny_url_path = key32[(i + 1): (i + 8)]

        return HttpResponse("Cannot create Tiny URL for given URL")


def get_original_url(request):
    pass


def redirect(request):
    # Check if tiny url is given
    pass


def delete_url_data(request):
    # docs = url_collection.find({})
    # print(docs)
    # for r in docs:
    domain = request.build_absolute_uri('/')[:-1]
    print("****")
    print(domain)

    return HttpResponse(domain)



