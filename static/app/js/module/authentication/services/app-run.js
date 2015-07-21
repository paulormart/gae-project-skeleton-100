
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
    // Angular Run
    ///////////////////////
    angular.module('app').run(['AuthFactory',
        function(AuthFactory) {
            AuthFactory.init();
        }]);

    angular.module('app').run(['$rootScope','$state','$location','$injector','$http','AuthFactory',

        function($rootScope, $state, $location, $injector, $http, AuthFactory) {

            var auth = AuthFactory;

            $rootScope.$on('$stateChangeStart',
                function(event, toState, toParams, fromState, fromParams){
                    // Note: Use event.preventDefault() to prevent the transition from happening.
                    // event.preventDefault();
                    // Note: transitionTo() promise will be rejected with
                    // a 'transition prevented' error
                    console.log('$stateChangeStart', event, toState, toParams, fromState, fromParams);
                    var user = auth.getUser();
                    console.log(!user.isAuthorized(toState.access_level))
                    if (!user.isAuthorized(toState.access_level)){
                        console.log('user.isLoggedIn()', user.isLoggedIn())
                        if (user.isLoggedIn()){
                            console.log('The user do not have permissions to view the view');
                            event.preventDefault();
                        }else{
                            var redirectTo = $location.url();
                            $state.go('login', { redirectTo: redirectTo });
                            event.preventDefault();
                        }
                    }
            });

            $rootScope.$on('$stateNotFound',
                function(event, unfoundState, fromState, fromParams){
                    console.log('$stateNotFound', event, unfoundState, fromState, fromParams);
            });

            $rootScope.$on('$stateChangeSuccess',
                function(event, toState, toParams, fromState, fromParams){
                    console.log('$stateChangeSuccess', event, toState, toParams, fromState, fromParams);
            });

            $rootScope.$on('$stateChangeError',
                function(event, toState, toParams, fromState, fromParams, error){
                    console.log('$stateChangeError', event, toState, toParams, fromState, fromParams, error);
            });

            // set Authorization token on every request
            // http://engineering.talis.com/articles/elegant-api-auth-angular-js/
            $injector.get("$http").defaults.transformRequest = function(data, headersFn) {

                var user = auth.getUser();
                if (user.isLoggedIn()){
                    var token = user.getToken();
                    if (token) {
                        headersFn()['Authorization'] = 'Token ' + token;
                    }
                }

                if (data) {
                    return angular.toJson(data);
                }
            };

            // TEST
            //$http.defaults.headers.common = { 'My-Header' : 'value' };

        }]);

})();