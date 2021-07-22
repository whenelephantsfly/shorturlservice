from django.conf.urls import url, include
from . import views

urlpatterns = [
    url(r'generateShortUrl', views.generate_short_url, name='generateShortUrl'),
    url(r'deleteUrlData', views.delete_url_data, name='deleteUrlData'),
    url(r'getShortUrl', views.get_short_url, name='getShortUrl'),
    # Remaining regular expression for url matching
    url(r'regularExpression to redirect remaining', views.redirect, name='redirect'),
]