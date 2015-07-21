/*
* File: app/js/module/a/services/version.js
*
* */

(function () {
    'use strict';
    angular.module('authentication.services').factory('ResetPasswordResourceFactory', ['$resource', 'URLS',
    function($resource, URLS){



    return $resource(URLS.api._RESET_PASSWORD_,
        { key_url: "@key_url" },
        {
            'create':  { method: 'POST' },
            //'index':   { method: 'GET', isArray: true },
            'get':    { method: 'GET', isArray: false },
            'update':  { method: 'PUT' }
            //'destroy': { method: 'DELETE' }
        }
    );

    }]);

})();
