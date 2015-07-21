
/*
* File: app/js/app.config.headersjs
*
* Use the $httpProvider to configure headers for every request
* Based on ng-book --> page: 184
*
* */

(function () {
    'use strict';
    ///////////////////////
    // Angular Config
    ///////////////////////
    angular.module('app').config(['$httpProvider','$locationProvider','$resourceProvider',

        function($httpProvider, $locationProvider, $resourceProvider) {

            $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
            $httpProvider.defaults.xsrfCookieName = 'csrftoken';

            // html5Mode(false) = sets the hash key in the url
            $locationProvider.html5Mode(false);

            // https://docs.angularjs.org/api/ngResource/service/$resource
            $resourceProvider.defaults.stripTrailingSlashes = false;


        }]);


})();