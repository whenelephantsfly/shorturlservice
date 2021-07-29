from django.conf.urls import url, include
from . import views

urlpatterns = [
    url(r'generateShortUrl', views.generate_short_url, name='generateShortUrl'),
    url(r'deleteUrlData', views.delete_url_data, name='deleteUrlData'),
    url(r'getOriginalUrl', views.get_original_url, name='getOriginalUrl'),
    url(r'^[A-Z,a-z,0-9]{7}$', views.redirect_url, name='redirect'),
    url(r'getPrivateUrls', views.get_private_urls, name='getPrivateUrls')
]
