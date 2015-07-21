
from django.contrib.auth import logout as auth_logout
from django.http import Http404
from django.utils.translation import ugettext_lazy as _
from django.contrib import messages
from django.shortcuts import redirect

from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response
from rest_framework import views

from .serializers import UserSerializer, SignupSerializer, LoginSerializer, ResetPasswordSerializer, \
    ResetPasswordConfirmationSerializer

from .. import signals
from ..mixins import UserMixin
from ..models import User as UserModel


class Signup(UserMixin, views.APIView):

    def post(self, request, format=None, *args, **kwargs):
        serializer = SignupSerializer(data=request.DATA)
        if serializer.is_valid():
            user = serializer.save()
            user_serializer = UserSerializer(user)

            headers = dict()
            headers['Authorization'] = 'Token %s' % user.token

            kwargs['request']=request
            signals.user_signed_up.send(sender=self.__class__, user=user, **kwargs)

            return Response(user_serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Login(views.APIView):

    def post(self, request, format=None, *args, **kwargs):
        serializer = LoginSerializer(data=request.DATA)
        if serializer.is_valid():

            user = serializer.user_cache
            user_serializer = UserSerializer(user)

            headers = dict()
            headers['Authorization'] = 'Token %s' % user.token

            kwargs['request']=request
            signals.user_logged_in.send(sender=self.__class__, user=user, **kwargs)

            return Response(user_serializer.data, status=status.HTTP_200_OK, headers=headers)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Logout(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None, *args, **kwargs):
        if self.request.user.is_authenticated():
            auth_logout(request)
        return Response(status=status.HTTP_200_OK)


class ResetPassword(UserMixin, views.APIView):

    def post(self, request, *args, **kwargs):
        serializer = ResetPasswordSerializer(data=request.DATA)
        if serializer.is_valid():

            kwargs['request']=request
            signals.reset_password.send(sender=self.__class__, user=serializer.user, **kwargs)

            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ResetPasswordConfirmation(UserMixin, views.APIView):

    def get_object(self, queryset=None):
        key_url = self.kwargs.get('key_url', None)
        if  key_url is None:
            raise Http404

        obj = UserModel.get_by_key_url(key_url)
        if obj is None:
            raise Http404

        return obj

    def get(self, request, format=None, *args, **kwargs):
        self.object = user = self.get_object()
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, format=None, *args, **kwargs):
        self.object = self.get_object()
        context = {}
        context['user_from_key'] = self.object
        serializer = ResetPasswordConfirmationSerializer(instance=self.object, data=request.DATA, context=context)
        if serializer.is_valid():
            serializer.save()

            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
