from django.shortcuts import render
from django.http import HttpResponse
import hashlib


def generate_short_url(request):
    # Remaining -- Check if tinyurl is given
    url = "https://www.python.org/dev/peps/pep-0008/#function-and-variable-names"
    key32 = hashlib.md5(url.encode()).hexdigest()
    tinyUrl = key32[:8]

    while(True):
        # Check database if key is present
        flag = get_short_url()

        if not flag:
            # Database call to





    return True


def delete_url_data(request):


    pass


def get_short_url(request):
    pass


def redirect(request):
    # Check if tiny url is given

    pass