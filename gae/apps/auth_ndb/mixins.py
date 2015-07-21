# ================
# User Mixin
# ================
#

import json

from django.http import Http404
from django.utils.translation import ugettext_lazy as _
from django.conf import settings

from rest_framework import serializers

from .models import User as UserModel

class UserValidationMixin(object):
    """
    Mixin to add few helper methods to User
    """
    def validate_username(self, value):
        """
        Validates the username. You can hook into this if you want to
        (dynamically) restrict what usernames can be chosen.
        """
        username = value.strip()

        from django.contrib.auth.forms import UserCreationForm
        USERNAME_REGEX = UserCreationForm().fields['username'].regex
        if not USERNAME_REGEX.match(username):
            raise serializers.ValidationError(_("Usernames can only contain letters, digits and @/./+/-/_."))

        # TODO: Add regexp support to USERNAME_BLACKLIST
        if username in settings.USERNAME_BLACKLIST:
            raise serializers.ValidationError(_("Username can not be used. "
                                          "Please use another username."))

        if UserModel.query(UserModel.username==username).get():
            raise serializers.ValidationError(_("This username is already taken. Please choose another."))

        value = username
        return value

    def validate_email(self, value):
        email = value.strip()
        if UserModel.query(UserModel.email==email).get():
            raise serializers.ValidationError(_("This email is already registered."))

        value = email
        return value


class UserMixin(object):
    """
    Mixin to add few helper methods to User
    """
    def get_user_obj(self, username=None, email=None):
        '''
        Get User obj
        '''
        if username:
            obj = UserModel.query(UserModel.username == username).get()
        elif email:
            obj = UserModel.query(UserModel.email == email).get()
        else:
            raise Http404
        return obj