
from django.conf.urls import patterns, include, url

urlpatterns = patterns('',

            url(r'^api/', include('gae.apps.auth_ndb.api.urls')),

)