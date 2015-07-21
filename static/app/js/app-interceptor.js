
/*
* File: app/js/location.js
*
* Use the $locationProvider to configure how the application deep linking paths are stored.
* Based on ng-book --> page: 183, page -->221
*
* */

(function () {
    'use strict';
    angular.module('app').config(['$httpProvider', function($httpProvider) {

            var interceptor = function($q, $rootScope, MessagingFactory, MESSAGES, SpinnerFactory){

                var messaging = MessagingFactory;
                var messages = MESSAGES;
                var spinnerFactory = SpinnerFactory;

                // TODO this spinner methods should be in a directive
                var _showSpinner = function(){
                    spinnerFactory.isLoading = true;
                    $("#spinner").show();

                };
                var _hideSpinner = function(){
                    spinnerFactory.isLoading = false;
                    $("#spinner").hide();
                };

                var _getServerNotifications = function(headers){

                    if (headers.server_messages){
                        var notifications = $.parseJSON(headers.server_messages.replace(/'/g,"\""));
                        _.each(notifications, function (notification) {
                            messaging.publish(messages.topic._ADD_NOTIFICATION_, [notification.message, notification.extra_tags]);
                        });
                    }

                };

                return {
                    'request': function(request){
                        console.log('request>', request);
                        _showSpinner();
                        return $q.when(request);
                    },
                    'requestError': function(error){
                        console.log('requestError>', error);
                        // an error happened on the request
                        // if we can recover from the error
                        // we can return a new request
                        // or promise
                        //return response;  // or new promise
                        // Otherwise, we can reject the next
                        // by returning a rejection
                        _hideSpinner();
                        return $q.reject(error);

                    },

                    'response': function (response) {

                        console.log('response>', response);

                        //if (response.config.url == '/api/login') {
                        // API server response with the following data:
                        // { token: "AUTH_TOKEN"}
                        //Auth.setToken(resp.data.token);
                        //}

                        //return response;

                        // Get Server Alerts from the header response
                        var headers = response.headers();
                        _getServerNotifications(headers);
                        _hideSpinner();
                        return $q.when(response);

                    },

                    'responseError': function (response) {

                        console.log('responseError>', response);

                        // Handle errors
                        switch (response.status) {
                            case 400:
                                _.each(response.data, function(errors, key) {
                                    _.each(errors, function(e) {
                                        console.log('responseError-400>', errors, key, e);
                                        messaging.publish(messages.topic._ADD_NOTIFICATION_, [e, 'danger']);
                                    });
                                });

                                console.log('case> 400');

                                break;

                            case 401:
                                console.log('case> 401');
                                if (response.config.url !== 'api/login')
                                // if we are not in login page
                                    $rootScope
                                        .$broadcast('auth:loginRequired', response.config.url);
                                break;

                            case 403:
                                console.log('case> 403');
                                //$rootScope
                                //    .$broadcast('auth:forbidden');
                                break;

                            case 404:
                                console.log('case> 404');
                                //$rootScope
                                //    .$broadcast('page:notFound');
                                break;

                            case 500:
                                console.log('case> 500');
                                //$rootScope
                                //    .$broadcast('server:error');
                                messaging.publish(messages.topic._ADD_NOTIFICATION_, ['Upps! Internal Server Error!', 'danger']);
                                break;

                        }
                        _hideSpinner();
                        return $q.reject(response);
                    }
                };

            };

            // Integrate the interceptor in the
            // request/response chain for $http
            $httpProvider.interceptors.push(interceptor);

        }]);
})();