/*
* File: app/js/module/a/controllers/myctrl1.js
*
* */

(function () {
    'use strict';
    angular.module('authentication.controllers').controller('ResetPasswordConfirmationController',

        ['$scope','$routeParams','$location','$controller','MESSAGES', 'URLS',

            function ($scope, $routeParams, $location, $controller, MESSAGES, URLS) {

                var messages = MESSAGES;

                var _self = this;

                // this call to $controller adds the base controller's methods
                // and properties to the controller's scope
                $controller('BaseController', {$scope: $scope});

                ///////////////////////
                // Handlers Methods
                ///////////////////////
                var _onResetPasswordConfirmationComplete = function(){
                    $location.path(URLS.path._LOGIN_);
                };
                ///////////////////////
                // Public Functions
                //////////////////////
                this.submit = function(valid) {
                    if (valid){
                        var data = {
                            email: _self.email,
                            password: _self.password,
                            key_url: _self.key_url,
                            token: _self.token
                        };
                        $scope.publish(messages.topic._RESET_PASSWORD_CONFIRMATION_, [data]);
                    }
                };
                this.login_url = function () {
                    $location.path(URLS.path._LOGIN_);
                };
                ///////////////////////
                // Initialize
                //////////////////////
                var init = function(){
                    _self.key_url = $routeParams.key_url;
                    _self.token = $routeParams.token;
                    $scope.subscribe(messages.topic._RESET_PASSWORD_CONFIRMATION_COMPLETE_, _onResetPasswordConfirmationComplete);
                };
                init();

    }]);
})();
