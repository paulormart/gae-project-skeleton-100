/*
* File: app/js/module/a/controllers/myctrl1.js
*
* */

(function () {
    'use strict';
    angular.module('core.controllers').controller('HelloController',

        ['$scope','$controller','$location','MESSAGES','URLS','UserModel',
            function ($scope,$controller,$location,MESSAGES, URLS, UserModel) {

                var messages = MESSAGES;
                var _self = this;
                this.helloText = 'Welcome in SeedProject';

                $controller('BaseController', {$scope: $scope});

                ///////////////////////
                // Handlers Methods
                ///////////////////////
                 ///////////////////////
                // Public Functions
                //////////////////////
                // Navigation Left side
                ///////////////////////
                // Initialize
                ///////////////////////
                var init = function() {
                    _self.user = $scope.auth.getUser();
                };
                init();

    }]);
})();
