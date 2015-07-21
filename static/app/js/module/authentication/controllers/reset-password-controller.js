/*
* File: app/js/module/a/controllers/myctrl1.js
*
* */

(function () {
    'use strict';
    angular.module('authentication.controllers').controller('ResetPasswordController',

        ['$scope','$location','$controller','MESSAGES', 'URLS',

            function ($scope, $location, $controller, MESSAGES, URLS) {

                var messages = MESSAGES;

                var _self = this;

                // this call to $controller adds the base controller's methods
                // and properties to the controller's scope
                $controller('BaseController', {$scope: $scope});

                ///////////////////////
                // Handlers Methods
                ///////////////////////
                var _onResetPasswordComplete = function(){
                    $location.path(URLS.path._HOME_);
                };
                ///////////////////////
                // Public Functions
                //////////////////////
                this.submit = function(valid) {
                    if (valid){
                        var data = {
                            email: _self.email
                        };
                        $scope.publish(messages.topic._RESET_PASSWORD_, [data]);
                    }
                };
                this.login_url = function () {
                    $location.path(URLS.path._LOGIN_);
                };
                ///////////////////////
                // Initialize
                ///////////////////////
                var init = function() {
                    $scope.subscribe(messages.topic._RESET_PASSWORD_COMPLETE_, _onResetPasswordComplete);
                };
                init();

    }]);
})();
