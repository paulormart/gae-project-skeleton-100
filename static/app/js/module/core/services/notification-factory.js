/*
* File: app/js/module/a/services/version.js
*
* */

(function () {
    'use strict';
    angular.module('core.services').factory('NotificationFactory', ['$timeout','MessagingFactory','MESSAGES',
        function($timeout, MessagingFactory, MESSAGES){

        var messaging = MessagingFactory;
        var messages = MESSAGES;

        var _notifications = [];

        // type > error | info | warning

        ///////////////////////
        // _ADD_NOTIFICATION_
        ///////////////////////
        var _addNotification = function(message, type){
            if(!_notifications){
                _notifications = [];
            }

            _notifications.push({type: type, message: message});

            $timeout(function() {
                messaging.publish(messages.topic._ERROR_NOTIFICATION_UPDATED_, _notifications);
            }, 100);
        };

        messaging.subscribe(messages.topic._ADD_NOTIFICATION_, _addNotification);

        ///////////////////////
        // _CLEAR_NOTIFICATIONS_
        ///////////////////////
        var _clearNotification = function() {
            init();
        };

        messaging.subscribe(messages.topic._CLEAR_NOTIFICATIONS_, _clearNotification);

        ///////////////////////
        // Initialize
        ///////////////////////
        var init = function(){
            _notifications = [];
        };

        var api = {
            init: init
        };

        return api;

    }]);
})();