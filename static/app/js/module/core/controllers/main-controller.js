/*
* File: app/js/module/a/controllers/myctrl1.js
*
* */

(function () {
    'use strict';
    angular.module('core.controllers').controller('MainController',

        ['$scope','$controller','$location','MESSAGES','URLS','UserModel',
            function ($scope,$controller,$location,MESSAGES, URLS, UserModel) {

                var messages = MESSAGES;
                var _self = this;
                this.userName = 'Example user';
                this.helloText = 'Welcome in SeedProject';

                $controller('BaseController', {$scope: $scope});

                ///////////////////////
                // Handlers Methods
                ///////////////////////
                var _onAuthenticationCompleted = function(user){
                    _self.user = user;
                };
                var _onLogoutComplete = function(){
                    _self.user = new UserModel();
                    $location.path(URLS.path._SEARCH_);
                };
                ///////////////////////
                // Public Functions
                //////////////////////
                // Navigation Left side
                this.search = function () {
                    console.log('search');
                };

                // Navigation Right side
                this.onLogin = function () {
                    $location.path(URLS.path._LOGIN_);
                };

                this.onLogout = function () {
                    $scope.publish(messages.topic._LOGOUT_USER_);
                };

                this.onSettings = function () {
                    console.log('**** TO BE CHANGED ****');
                    //$location.path(URLS.path._HOME_);
                };

                ///////////////////////
                // Initialize
                ///////////////////////
                var init = function() {
                    _self.user = $scope.auth.getUser();
                    $scope.subscribe(messages.topic._AUTHENTICATION_COMPLETED_, _onAuthenticationCompleted);
                    $scope.subscribe(messages.topic._LOGOUT_USER_COMPLETE_, _onLogoutComplete);
                };
                init();

    }]);
})();
