
from django.contrib.auth import authenticate
from django.utils.translation import ugettext_lazy as _
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator

from rest_framework import serializers

from ..models import User as UserModel
from ..mixins import UserValidationMixin


class UserSerializer(serializers.Serializer):
    key_url = serializers.ReadOnlyField()
    username = serializers.ReadOnlyField()
    email = serializers.ReadOnlyField()
    first_name = serializers.ReadOnlyField()
    last_name = serializers.ReadOnlyField()
    created_on = serializers.DateTimeField(format='%Y-%m-%d', read_only=True)


class SignupSerializer(UserValidationMixin, serializers.Serializer):
    username = serializers.CharField(max_length=30)
    email = serializers.CharField(max_length=50)
    password = serializers.CharField(max_length=50, write_only=True)

    def create(self, validated_data):
        user = UserModel(email=validated_data.get('email', None),
                         username=validated_data.get('username', None))
        user.set_password(validated_data.get('password', None))
        user.put()
        user = authenticate(email=self.validated_data['email'], password=self.validated_data['password'])
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=50)
    password = serializers.CharField(max_length=50, write_only=True)

    def validate_email(self, value):
        email = value.strip()
        return email

    def validate(self, data):
        self.user_cache = authenticate(email=data['email'], password=data['password'])
        if self.user_cache is None:
            raise serializers.ValidationError, _("Please enter a correct email and password. Note that both fields are case-sensitive.")
        elif not self.user_cache.is_active:
            raise serializers.ValidationError, _("This account is inactive.")
        return data


class ResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True, max_length=100)

    def validate_email(self, value):
        email = value.strip()
        self.user = UserModel.get_by_email(email)
        if email and self.user:
            return email
        else:
            raise serializers.ValidationError(_("The e-mail address is not assigned to any user account"))


class ResetPasswordConfirmationSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True, max_length=100)
    password = serializers.CharField(required=True)
    token = serializers.CharField(required=True)

    def validate_email(self, value):
        email = value.strip()
        self.user = UserModel.get_by_email(email)
        if email and self.user:
            return email
        else:
            raise serializers.ValidationError(_("The e-mail address is not assigned to any user account"))

    def validate_token(self, value):
        token = value
        user_from_key = self.context['user_from_key']
        try:
            if user_from_key == self.user and default_token_generator.check_token(self.user, token):
                return token
            else:
                raise serializers.ValidationError(_("You have an invalid token, please request a new token."))
        except AttributeError:
            raise serializers.ValidationError(_("You have an invalid token, please request a new token."))

    def update(self, instance, validated_data):
        instance.password = validated_data.get('password', instance.password)
        instance.set_password(instance.password)
        instance.put()
        return instance