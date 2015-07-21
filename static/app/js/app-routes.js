
/*
* File: app/js/routes.js
*
* Defines the main routes in the application.
* The routes you see here will be anchors '#/' unless specifically configured otherwise.
*
* */

(function () {
    'use strict';
    ///////////////////////
    // Angular Config
    ///////////////////////
    angular.module('app').config(['$routeProvider','$urlRouterProvider','$stateProvider','ACCESS_LEVELS','URLS',
        function ($routeProvider, $urlRouterProvider, $stateProvider, ACCESS_LEVELS, URLS) {

            ///* Authentication */
            //$routeProvider.when(URLS.path._LOGIN_, {
            //    templateUrl: 'static/partial/authentication/login.html',
            //    access_level: ACCESS_LEVELS.pub,
            //    controller: 'LoginController',
            //    controllerAs: 'ctrl'
            //});
            //
            //$routeProvider.when(URLS.path._SIGNUP_, {
            //    templateUrl: 'static/partial/authentication/signup.html',
            //    access_level: ACCESS_LEVELS.pub,
            //    controller: 'SignupController',
            //    controllerAs: 'ctrl'
            //});

            //$routeProvider.when(URLS.path._RESET_PASSWORD_, {
            //    templateUrl: 'static/partial/authentication/reset_password.html',
            //    access_level: ACCESS_LEVELS.pub,
            //    controller: 'ResetPasswordController',
            //    controllerAs: 'ctrl'
            //});
            //
            //$routeProvider.when(URLS.path._RESET_PASSWORD_CONFIRMATION_, {
            //    templateUrl: 'static/partial/authentication/reset_password_confirmation.html',
            //    access_level: ACCESS_LEVELS.pub,
            //    controller: 'ResetPasswordConfirmationController',
            //    controllerAs: 'ctrl'
            //});
            //
            //// Home
            //$routeProvider.when(URLS.path._HOME_, {
            //    templateUrl: 'static/partial/core/layout.html',
            //    access_level: ACCESS_LEVELS.pub,
            //    controller: 'MainController',
            //    controllerAs: 'ctrl'
            //});
            //
            //$routeProvider.otherwise({
            //    redirectTo: URLS.path._HOME_,
            //    access_level: ACCESS_LEVELS.pub,
            //    controller: 'HeaderController',
            //    controllerAs: 'ctrl'
            //});

            // *****************
            // using angularUiRoute
            // *****************

            // Public Views
            //$stateProvider.state('search', {
            //    //abstract: true,
            //    url: "/search",
            //    templateUrl: "static/partial/core/layout_public.html",
            //    access_level: ACCESS_LEVELS.pub,
            //    controller: 'MainController',
            //    controllerAs: 'ctrl'
            //});

            //$stateProvider.state('index.search', {
            //    url: "/index/search",
            //    templateUrl: "static/partial/core/search.html",
            //    access_level: ACCESS_LEVELS.pub,
            //    //controller: 'LoginController',
            //    //controllerAs: 'ctrl',
            //    data: { pageTitle: '' }
            //});

            $stateProvider.state('login', {
                url: URLS.path._LOGIN_+'?redirectTo',
                templateUrl: "static/partial/authentication/login.html",
                access_level: ACCESS_LEVELS.pub,
                controller: 'LoginController',
                controllerAs: 'ctrl',
                data: { pageTitle: 'Login' }
            });

            $stateProvider.state('signup', {
                url: URLS.path._SIGNUP_,
                templateUrl: "static/partial/authentication/signup.html",
                access_level: ACCESS_LEVELS.pub,
                controller: 'SignupController',
                controllerAs: 'ctrl',
                data: { pageTitle: 'Signup' }
            });
            $stateProvider.state('reset-password', {
                url: URLS.path._RESET_PASSWORD_,
                templateUrl: "static/partial/authentication/reset_password.html",
                access_level: ACCESS_LEVELS.pub,
                controller: 'ResetPasswordController',
                controllerAs: 'ctrl',
                data: { pageTitle: 'Reset password' }
            });
            $stateProvider.state('reset-password-confirmation', {
                url: URLS.path._RESET_PASSWORD_CONFIRMATION_,
                templateUrl: "static/partial/authentication/reset_password_confirmation.html",
                access_level: ACCESS_LEVELS.pub,
                controller: 'ResetPasswordConfirmationController',
                controllerAs: 'ctrl',
                data: { pageTitle: 'Confirm password' }
            });

            // Private Views
            $stateProvider.state('main', {
                // Note: With abstract set to true, that means this state can not be explicitly activated.
                // It can only be implicitly activated by activating one of its children.
                abstract: true,
                url: "/main",
                templateUrl: "static/partial/core/layout.html",
                access_level: ACCESS_LEVELS.user,
                controller: 'MainController',
                controllerAs: 'ctrl'
            });

            $stateProvider.state('main.hello', {
                url: "/hello",
                templateUrl: "static/partial/core/hello.html",
                access_level: ACCESS_LEVELS.pub,
                controller: 'HelloController as ctrl',
                data: { pageTitle: 'Hello' }
            });

            $urlRouterProvider.otherwise("/main/hello");

        }
    ]);

})();