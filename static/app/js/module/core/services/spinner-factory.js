/*
* File: app/js/module/a/services/version.js
*
* */

(function () {
    'use strict';
    angular.module('core.services').factory('SpinnerFactory', [function(){

        var _isLoading = false;

        return {
            isLoading : _isLoading
        }

    }]);
})();
