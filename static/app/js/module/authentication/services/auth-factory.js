/*
* File: app/js/module/a/services/version.js
*
* */

(function () {
    'use strict';
    angular.module('authentication.services').factory('AuthFactory',

        ['$cookieStore', '$http', 'MessagingFactory','MESSAGES','ACCESS_LEVELS', 'URLS',
            'ModelTransformerFactory','UserModel',

        function($cookieStore, $http, MessagingFactory, MESSAGES, ACCESS_LEVELS, URLS,
                 ModelTransformerFactory, UserModel){

            var messaging = MessagingFactory;
            var messages = MESSAGES;
            var modelTransformer = ModelTransformerFactory;
            var _user = null;
            var _receivedUser = {};
            var _authType = '';

            ///////////////////////
            // Private Functions
            ///////////////////////

            var _setUser = function (user) {
                if (!user.role || user.role < 0){
                    user.role = ACCESS_LEVELS.user;
                }
                _user = user;
                $cookieStore.put('user', _user);
            };
            var _getTokenFromAuthorizationHeader = function(header){
                var t = header.split(' ');
                if (t.length == 2 && t[0]==='Token'){
                    return t[1];
                }
            };
            var _resetCookies = function(){
                $cookieStore.remove('user');
            };

            ///////////////////////
            // _LOGIN_USER_
            ///////////////////////

            var _onLogin = function (data) {
                return $http({
                    method: "post",
                    url: URLS.api._LOGIN_,
                    data: data
                }).success(_onLoginSuccess).error(_onLoginFailure);

            };

            var _onLoginSuccess = function(response, status, headerFn){
                var user = modelTransformer.transform(response, UserModel);
                if(headerFn().authorization){
                    var token = _getTokenFromAuthorizationHeader(headerFn().authorization);
                    user.setToken(token);
                }
                messaging.publish(messages.topic._LOGIN_USER_COMPLETE_, [user]);
            };

            var _onLoginFailure = function(response){
                messaging.publish(messages.topic._LOGIN_USER_FAILED_);
            };

            messaging.subscribe(messages.topic._LOGIN_USER_, _onLogin);

            ///////////////////////
            // _SIGNUP_USER_
            ///////////////////////
            var _onSignup = function (data) {
                return $http({
                    method: "post",
                    url: URLS.api._SIGNUP_,
                    data: data
                }).success(_onSignupSuccess).error(_onSignupFailure);
            };

            var _onSignupSuccess = function(response, status, headerFn){
                var user = modelTransformer.transform(response, UserModel);
                if(headerFn().authorization){
                    var token = _getTokenFromAuthorizationHeader(headerFn().authorization);
                    user.setToken(token);
                }
                messaging.publish(messages.topic._SIGNUP_USER_COMPLETE_, [user]);
            };

            var _onSignupFailure = function(response){
                messaging.publish(messages.topic._SIGNUP_USER_FAILED_);
            };

            messaging.subscribe(messages.topic._SIGNUP_USER_, _onSignup);

            ///////////////////////
            // _LOGOUT_USER_
            ///////////////////////
            var _onLogout = function () {
                return $http({
                    method: "post",
                    url: URLS.api._LOGOUT_
                }).success(_onLogoutSuccess).error(_onLogoutFailure);

            };

            var _onLogoutSuccess = function(response, status, headerFn){
                _resetCookies();
                init();
                messaging.publish(messages.topic._LOGOUT_USER_COMPLETE_);
            };

            var _onLogoutFailure = function(response){
                messaging.publish(messages.topic._LOGOUT_USER_FAILED_);

            };

            messaging.subscribe(messages.topic._LOGOUT_USER_, _onLogout);

            ///////////////////////
            // _AUTHENTICATION_COMPLETED_
            ///////////////////////
            var _onAuthenticationCompleted = function(user){
                _setUser(user);
                messaging.publish(messages.topic._AUTHENTICATION_COMPLETED_, [_user]);
            };
            messaging.subscribe(messages.topic._LOGIN_USER_COMPLETE_, _onAuthenticationCompleted);
            messaging.subscribe(messages.topic._SIGNUP_USER_COMPLETE_, _onAuthenticationCompleted);
            messaging.subscribe(messages.topic._COOKIES_SIGNIN_COMPLETED_, _onAuthenticationCompleted);

            ///////////////////////
            // _COOKIES_SIGNIN_
            ///////////////////////
            var _onCookiesSignin = function () {
                var user_cookie = $cookieStore.get('user');
                var user = modelTransformer.transform(user_cookie, UserModel);

                if(user.key_url && user.getToken()){
                    var header = {};
                    header['Authorization'] = 'Token ' + user.getToken();
                    messaging.publish(messages.topic._COOKIES_SIGNIN_COMPLETED_, [user]);
                }
            };

            messaging.subscribe(messages.topic._COOKIES_SIGNIN_, _onCookiesSignin);

            var _onCookiesSigninFailed = function () {
                _resetCookies();
            };

            messaging.subscribe(messages.topic._COOKIES_SIGNIN_FAILED_, _onCookiesSigninFailed);

            ///////////////////////
            // Public
            ///////////////////////
            var getUser = function(){
                return _user || new UserModel();
            };
            var init = function () {
                _user = new UserModel();
                messaging.publish(messages.topic._COOKIES_SIGNIN_)
            };

            ///////////////////////
            // API
            ///////////////////////
            var api = {
                init:init,
                getUser: getUser
            };
            return api;
    }]);
})();