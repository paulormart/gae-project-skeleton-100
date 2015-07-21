
/*
* File: app/js/location.js
*
* // nb-book --> page: 223
*
* */

(function () {
    'use strict';
    angular.module('app').constant('ACCESS_LEVELS', {
            pub: 1,
            user: 2
        })
        // URLS
        .constant('URLS',
        {
            path:{
                _DASHBOARD_:'/index/main',
                _SEARCH_: '/search',
                _LOGIN_: '/login',
                _SIGNUP_: '/signup',
                _RESET_PASSWORD_: '/reset-password',
                _RESET_PASSWORD_CONFIRMATION_: '/reset-password/:key_url/:token',
                _EMAIL_VERIFICATION_BY_TOKEN_:'/email-verification-by-token/:token',

            },
            api:{
                _LOGIN_:'/api/login/',
                _LOGOUT_:'/api/logout/',
                _SIGNUP_:'/api/signup/',
                _RESET_PASSWORD_:'/api/reset-password/:key_url/',
                _EMAIL_VERIFICATION_BY_TOKEN_:'/api/email-verification-by-token/:token/',
                _USER_:'/api/user/:key_url/',
                _USER_VERIFICATION_:'/api/user-verification/:key_url/',

            }
        });

})();