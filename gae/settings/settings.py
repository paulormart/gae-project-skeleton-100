# Django settings for leyaproject project.

import os

DEBUG = True
TEMPLATE_DEBUG = DEBUG

ADMINS = (
    # ('Your Name', 'your_email@example.com'),
)

MANAGERS = ADMINS

if os.getenv('SERVER_SOFTWARE', '').startswith('Google App Engine'):
    # Running on production App Engine, so use a Google Cloud SQL database.
    DATABASES = {}

elif os.getenv('SETTINGS_MODESETTINGS_MODE') == 'prod':
    # Running in development, but want to access the Google Cloud SQL instance
    # in production.
    DATABASES = {}
else:
    # Running in development, so use a local MySQL database.
    DATABASES = {}


# Hosts/domain names that are valid for this site; required if DEBUG is False
# See https://docs.djangoproject.com/en/1.5/ref/settings/#allowed-hosts
ALLOWED_HOSTS = []

# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# In a Windows environment this must be set to your system time zone.
TIME_ZONE = 'America/Chicago'

# Language code for this installation. All choices can be found here:
# http://www.i18nguy.com/unicode/language-identifiers.html
LANGUAGE_CODE = 'en-us'

SITE_ID = 1

# If you set this to False, Django will make some optimizations so as not
# to load the internationalization machinery.
USE_I18N = True

# If you set this to False, Django will not format dates, numbers and
# calendars according to the current locale.
USE_L10N = True

# If you set this to False, Django will not use timezone-aware datetimes.
USE_TZ = True


# ============
# PATHS Configuration
# ============

#from ..libs import unipath

import unipath

# PROJECT_DIR = ../themoon_project
PROJECT_DIR = unipath.Path(__file__).ancestor(3)

# ============
# MEDIA
# ============

# Example: "/var/www/example.com/media/"
MEDIA_ROOT = PROJECT_DIR.child('media')
# Examples: "http://example.com/media/", "http://media.example.com/"
MEDIA_URL = '/media/'
# ============

# Example: "/var/www/example.com/static/"
STATIC_ROOT = PROJECT_DIR.child('static')
# Example: "http://example.com/static/", "http://static.example.com/"
#STATIC_URL = 'http://storage.googleapis.com/%s/%s/' % (os.getenv('GOOGLE_CLOUD_STORAGE_BUCKET_NAME_STATIC'), 'assets')

STATIC_URL = '/static/'


STATICFILES_DIRS = (
    #PROJECT_DIR.child('assets'),
)

TEMPLATE_DIRS = (
    PROJECT_DIR.child('templates'),
)

LOCALE_PATHS = (
    PROJECT_DIR.child('locale'),
)

# List of finder classes that know how to find static files in
# various locations.
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    #'django.contrib.staticfiles.finders.DefaultStorageFinder',
)

# Make this unique, and don't share it with anybody.
SECRET_KEY = os.getenv('SECRET_KEY')


# List of callables that know how to import templates from various sources.
TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
#     'django.template.loaders.eggs.Loader',
)

TEMPLATE_CONTEXT_PROCESSORS = (
    'django.contrib.auth.context_processors.auth',
    'django.core.context_processors.static',
)

MIDDLEWARE_CLASSES = ('google.appengine.ext.ndb.django_middleware.NdbDjangoMiddleware',
                      'django.middleware.common.CommonMiddleware',
                      'django.contrib.sessions.middleware.SessionMiddleware',
                      'django.contrib.auth.middleware.AuthenticationMiddleware',
                      'django.middleware.csrf.CsrfViewMiddleware',
                      'django.middleware.clickjacking.XFrameOptionsMiddleware', )

# https://docs.djangoproject.com/en/1.7/topics/http/sessions/#using-cached-sessions
SESSION_ENGINE = "django.contrib.sessions.backends.cache"

# https://docs.djangoproject.com/en/dev/topics/cache/#local-memory-caching
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        'LOCATION': 'unique-snowflake'
    }
}

#MIDDLEWARE_CLASSES = (
#    'django.middleware.common.CommonMiddleware',
#    'django.contrib.sessions.middleware.SessionMiddleware',
#    'django.middleware.csrf.CsrfViewMiddleware',
#    'django.contrib.auth.middleware.AuthenticationMiddleware',
#    'django.contrib.messages.middleware.MessageMiddleware',
    # Uncomment the next line for simple clickjacking protection:
    # 'django.middleware.clickjacking.XFrameOptionsMiddleware',
#)

ROOT_URLCONF = 'gae.urls'

# Python dotted path to the WSGI application used by Django's runserver.
WSGI_APPLICATION = 'gae.wsgi.application'

import os
TEMPLATE_DIRS = (os.path.join(os.path.dirname(__file__), '../../', 'templates').replace('\\','/'),)


INSTALLED_APPS = (
    #'django.contrib.auth',
    #'django.contrib.contenttypes',
    #'django.contrib.sessions',
    #'django.contrib.sites',
    #'django.contrib.messages',
    'django.contrib.staticfiles',
    # Uncomment the next line to enable the admin:
    #'django.contrib.admin',
    # Uncomment the next line to enable admin documentation:
    # 'django.contrib.admindocs',

    'rest_framework',

    'gae.apps.auth_ndb',
    #'auth_ndb'
)

SESSION_SERIALIZER = 'django.contrib.sessions.serializers.JSONSerializer'

# A sample logging configuration. The only tangible logging
# performed by this configuration is to send an email to
# the site admins on every HTTP 500 error when DEBUG=False.
# See http://docs.djangoproject.com/en/dev/topics/logging for
# more details on how to customize your logging configuration.
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        }
    },
    'handlers': {
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        }
    },
    'loggers': {
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': True,
        },
    }
}

# ================
# Custom User Authentication
# ================

AUTH_USER_MODEL = "gae.apps.auth_ndb.User"
USERNAME_BLACKLIST = []
AUTHENTICATION_BACKENDS = ('gae.apps.auth_ndb.backends.ModelBackend',)

# ================
# Rest Framework
# ================

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'gae.apps.auth_ndb.rest_authentication.TokenAuthentication',
    ),
    #'DEFAULT_PERMISSION_CLASSES': ('rest_framework.permissions.IsAdminUser',),
    'PAGINATE_BY': 100,
    'TEST_REQUEST_DEFAULT_FORMAT': 'json'
}