import django.core.validators
from django.shortcuts import render
from django.http import HttpResponse
from pymongo import MongoClient
import hashlib
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
import socket


connect_string = 'mongodb+srv://mukul:samplepassword@cluster0.2ergm.mongodb.net/test'
db_client = MongoClient(connect_string)
dbname = db_client['shortURLDB']
url_collection = dbname['URL']


def get_short_url(tiny_url):
    pass


def generate_short_url(request):

    url = "https://www.python.org/dev/peps/pep-0008/#function-and-variable-names"
    # Check if Given Url is valid
    try:
        URLValidator()(url)
    except ValidationError  as  exception:
        return HttpResponse("Given url is not valid")

    # Remaining -- Check if tinyurl is given


    # Converting the URL to 32 bit MD5 hash value.
    key32 = hashlib.md5(url.encode()).hexdigest()
    tiny_url = key32[:8]


    for i in range(4):
        # Check database if key is present
        flag = get_short_url(tiny_url)
        if not flag:

            return HttpResponse(socket.gethostname()+tiny_url)




def get_original_url(request):
    pass


def delete_url_data(request):
    docs = url_collection.find({})
    print(docs)
    for r in docs:
        print(r)
    pass


def redirect(request):
    # Check if tiny url is given
    pass
