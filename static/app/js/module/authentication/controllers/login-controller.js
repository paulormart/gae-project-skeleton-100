/*
* File: app/js/module/a/controllers/myctrl1.js
*
* */

(function () {
    'use strict';
    angular.module('authentication.controllers').controller('LoginController',

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
                var _onAuthenticationCompleted = function(user){
                    $scope.publish(messages.topic._ADD_NOTIFICATION_, ['Hi ' + user.getShortName() + '. Welcome back!', 'info']);
                    // TODO define where to go, or if it cames from a different url and needs redirect..
                    var searchObj = $location.search();
                    if (searchObj.redirectTo){
                        $location.path(searchObj.redirectTo).search({});
                    }
                    else{
                        $location.path(URLS.path._DASHBOARD_);
                    }
                };
                var _onAuthenticationFailed = function(){
                    console.log("_onAuthenticationFailed");
                };

                ///////////////////////
                // Public Functions
                //////////////////////
                this.submit = function(valid) {
                    if (valid){
                        var data = {
                            email: _self.email,
                            password: _self.password
                        };
                        $scope.publish(messages.topic._LOGIN_USER_, [data]);
                    }
                };
                this.loginFacebook = function(){
                    $scope.publish(messages.topic._FACEBOOK_SIGNIN_);
                };
                this.loginGPlus = function(){
                    $scope.publish(messages.topic._GPLUS_SIGNIN_);
                };
                this.signup_url = function () {
                    $location.path(URLS.path._SIGNUP_);
                };
                this.forgot_password_url = function () {
                    $location.path(URLS.path._RESET_PASSWORD_);
                };
                ///////////////////////
                // Initialize
                ///////////////////////
                var _init = function() {
                    $scope.subscribe(messages.topic._AUTHENTICATION_COMPLETED_, _onAuthenticationCompleted);
                    $scope.subscribe(messages.topic._AUTHENTICATION_FAILED_, _onAuthenticationFailed);
                };
                _init();

    }]);
})();
