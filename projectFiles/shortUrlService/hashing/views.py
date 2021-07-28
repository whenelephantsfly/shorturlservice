from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from pymongo import MongoClient
import hashlib
import datetime
from django.http import JsonResponse
from bson import json_util
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
    compiler = re.compile(regex)

    if url is None:
        return False

    if re.search(compiler, url):
        return True
    else:
        return False


def get_username(request):
    # return None if not logged in
    return 'admin'



@csrf_exempt
def generate_short_url(request):
    if request.method == 'POST':
        # post_data = json.loads(request.body.decode("utf-8"))
        url = request.POST.get('url')

        try:
            milliseconds_expiration_date_and_time = request.POST.get('expirationDateAndTime')
            if milliseconds_expiration_date_and_time is None:
                milliseconds_expiration_date_and_time = 8.64e+7
        except:
            milliseconds_expiration_date_and_time = 8.64e+7

        is_private = request.POST.get('isPrivate')
        if is_private is not None or is_private is True:
            # Remaining add logged in user to it
            # Remanining convert allowed user string to array.
            allowed_users = request.POST.get('allowedUsers')
            if allowed_users is None:
                return JsonResponse({'Error': "Please enter atleast one user"})
        else:
            is_private = False
            allowed_users = None

        # Check- Given Url is valid
        if not url_validator(url):
            return JsonResponse({"Error": "Given url is not valid"})

        # Check if tinyurl is given
        if get_domain_name() in url:
            return JsonResponse({"Error": "Cannot create tiny Url for this domain."})

        # Check url in cache
        if url in cache:
            record = cache.get(url)
            page_sanitized = json.loads(json_util.dumps(record))
            return JsonResponse(page_sanitized)

        # Check url in db
        # Check if user is trying to convert it into private
        record = url_collection.find_one({"originalURL": get_domain_name() + request.path[1:]})
        if record is not None:
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
                          "isPrivate": is_private,
                          "originalURL": url,
                          "creationDate": current_date_and_time,
                          "allowedUsers": allowed_users,
                          "expirationDate": future_date_and_time}
                url_collection.insert_one(record)
                page_sanitized = json.loads(json_util.dumps(record))
                cache_size = cache.dbsize()
                if cache_size > 198:
                    least_recently_used_key = cache.randomkey()
                    longest_idle = cache.object("idletime", least_recently_used_key)
                    for key in cache.scan_iter("*"):
                        idle = cache.object("idletime", key)
                        if idle > longest_idle:
                            least_recently_used_key = key
                            longest_idle = idle
                    cache.delete(least_recently_used_key)

                cache.set(url, record, timeout = milliseconds_expiration_date_and_time / 1000)
                cache.set(get_domain_name() + tiny_url_path, record, timeout = milliseconds_expiration_date_and_time / 1000)
                return JsonResponse(page_sanitized)
            else:
                tiny_url_path = key32[(i + 1): (i + 8)]

        return JsonResponse({"Error": "Cannot create Tiny URL for given URL"})


@csrf_exempt
def redirect_url(request):
    try:
        if (get_domain_name() + request.path[1:]) in cache:
            record = cache.get(get_domain_name() + request.path[1:])
            if record['isPrivate']:
                # Check if user is logged in then redirect or throw error
                username = get_username(request)
                if username is None:
                    return JsonResponse({"Error": "Please login the given url is private"})
                elif username in record['allowedUsers']:
                    return redirect(record["originalURL"])
                else:
                    return JsonResponse({"Error": "You don't have access to given uel"})
            else:
                return redirect(record["originalURL"])
        else:
            url = url_collection.find_one({"shortURL": get_domain_name() + request.path[1:]})
            if url is not None:
                print(url['isPrivate'])
                if url['isPrivate']:
                    # Check if user is logged in then add to cache and redirect or throw error
                    username = get_username(request)
                    if username is None:
                        return JsonResponse({"Error": "Please login the given url is private"})
                    elif username in url['allowedUsers']:
                        long_url = url['originalURL']
                        exp_date = url['expirationDate']
                        today = datetime.datetime.utcnow()
                        remaining_time_to_exp = exp_date - today

                        if remaining_time_to_exp > 0:
                            cache_size = cache.dbsize()
                            if cache_size > 199:
                                least_recently_used_key = cache.randomkey()
                                longest_idle = cache.object("idletime", least_recently_used_key)
                                for key in cache.scan_iter("*"):
                                    idle = cache.object("idletime", key)
                                    if idle > longest_idle:
                                        least_recently_used_key = key
                                        longest_idle = idle
                                cache.delete(least_recently_used_key)
                            cache.set(get_domain_name() + request.path[1:], long_url,
                                      timeout=remaining_time_to_exp.total_seconds())
                        return redirect(long_url)
                    else:
                        return JsonResponse({"Error": "You don't have access to given uel"})
                else:
                    long_url = url['originalURL']
                    exp_date = url['expirationDate']
                    today = datetime.datetime.utcnow()
                    remaining_time_to_exp = exp_date - today

                    if remaining_time_to_exp > 0:
                        cache_size = cache.dbsize()
                        if cache_size > 199:
                            least_recently_used_key = cache.randomkey()
                            longest_idle = cache.object("idletime", least_recently_used_key)
                            for key in cache.scan_iter("*"):
                                idle = cache.object("idletime", key)
                                if idle > longest_idle:
                                    least_recently_used_key = key
                                    longest_idle = idle
                            cache.delete(least_recently_used_key)
                        cache.set(get_domain_name() + request.path[1:], long_url,
                                  timeout=remaining_time_to_exp.total_seconds())
                    return redirect(long_url)
    except Exception as e:
        return HttpResponse(e)

    return HttpResponse("Given url does not exist")


def delete_url_data(request):
    pass


def get_original_url(request):
    pass

