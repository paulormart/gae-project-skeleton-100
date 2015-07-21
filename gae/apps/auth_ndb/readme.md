=====
Authentication NDB
=====

Auth_ndb is a simple Django app for User authentication using NDB Datastore API

Quick start
-----------

1. Add "auth_ndb" to your INSTALLED_APPS setting like this::

    INSTALLED_APPS = (
        ...
        'auth_ndb',
    )

2. Include the polls URLconf in your project urls.py like this::

    url(r'^api/', include('auth_ndb.urls')),

3. Under settings add the following

# ================
# Custom User Authentication
# ================

AUTH_USER_MODEL = "leya.apps.auth_ndb.User"
USERNAME_BLACKLIST = []
AUTHENTICATION_BACKENDS = ('leya.apps.auth_ndb.backends.ModelBackend',)
