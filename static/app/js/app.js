/*
* File: app/js/app.js
*
* */

(function () {
    'use strict';
    angular.module('app', [
        // Angular modules
        'ngRoute',
        'ngCookies',
        'ngResource',
        'ngAnimate',
        //// 3rd party modules
        'ui.router',
        'ui.bootstrap',
        //// Custom modules
        'app.core',
        'app.authentication'
    ])

})();