from django.conf.urls import patterns, include, url

from . import views

urlpatterns = patterns('',

        url(r'^signup/$',
            views.Signup.as_view(),
            name='signup'),

        url(r'^login/$',
            views.Login.as_view(),
            name='login'),

        url(r'^logout/$',
            views.Logout.as_view(),
            name='logout'),

        url(r'^reset-password/$',
            views.ResetPassword.as_view(),
            name='reset_password'),

        url(r'^reset-password/(?P<key_url>[-\w]+)/$',
            views.ResetPasswordConfirmation.as_view(),
            name='reset_password_detail'),

        url(r'^reset-password/(?P<key_url>[-\w]+)/(?P<token>[-\w]+)/$',
            views.ResetPasswordConfirmation.as_view(),
            name='reset_password_token'),

)

    # User - RESTful Service

    # Task              Method  URL                     Accepts             Returns                 Status
    # List objects      GET     /accounts               Nothing             An array of objects     Not Implemented
    # Create an object  POST    /accounts               A single object     The saved object        Not Implemented
    # Get an object     GET     /account/<username>     Nothing             A single object         Available
    # Update an object  PUT     /account/<username>     Nothing             The saved object        Not Implemented
    # Delete an object  DELETE  /account/<username>     A single object     Nothing                 Not Implemented
