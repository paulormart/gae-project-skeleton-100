/*
* File: app/js/module/a/controllers/myctrl1.js
*
* */

(function () {
    'use strict';
    angular.module('authentication.controllers').controller('EmailVerificationByTokenController',

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
                var _onGetEmailVerificationByTokenComplete = function(model){
                    _self.email = model.email;
                };
                var _onUpdateEmailVerificationByTokenComplete = function(){
                    $location.path(URLS.path._HOME_);
                };
                ///////////////////////
                // Public Functions
                //////////////////////
                this.submit = function(valid) {
                    if (valid){
                        var data = {
                            token: _self.token,
                            is_confirmed: true
                        };
                        $scope.publish(messages.topic._UPDATE_EMAIL_VERIFICATION_BY_TOKEN_, [data]);
                    }
                };
                this.home_url = function () {
                    $location.path(URLS.path._HOME_);
                };
                ///////////////////////
                // Initialize
                ///////////////////////
                var init = function() {
                    _self.token = $routeParams.token;
                    _self.user = $scope.auth.getUser();
                    $scope.subscribe(messages.topic._GET_EMAIL_VERIFICATION_BY_TOKEN_COMPLETE_, _onGetEmailVerificationByTokenComplete);
                    $scope.subscribe(messages.topic._UPDATE_EMAIL_VERIFICATION_BY_TOKEN_COMPLETE_, _onUpdateEmailVerificationByTokenComplete);
                    $scope.publish(messages.topic._GET_EMAIL_VERIFICATION_BY_TOKEN_,[_self.token])
                };
                init();

    }]);
})();
