/*
* File: app/js/module/components/directives/drag-directive.js
*
*  http://blog.parkji.co.uk/2013/08/11/native-drag-and-drop-in-angularjs.html
*
* */

(function () {
    'use strict';
    angular.module('core.directives').directive('dirNotification', ['MessagingFactory', 'MESSAGES', function (MessagingFactory, MESSAGES) {

        var _template = '<div class="row"><div class="col-sm-4 col-sm-offset-4">' +
            '<div class="alert alert-dismissable alert-{{notification.type}} fadeIn" ng-repeat="notification in notifications track by $index">' +
            '<button type="button" class="close" ng-click="close($index)" aria-hidden="true">&times;</button>' +
            '{{notification.message}}</div></div></div>';

        return {
            restrict: 'E',
            scope: {},
            template: _template,
            replace: true,
            link: function(scope, element, attrs) {

                var messaging = MessagingFactory;
                var messages = MESSAGES;

                scope.notifications = [];

                ///////////////////////
                // _ERROR_NOTIFICATION_UPDATED_
                ///////////////////////

                var _onErrorNotificationUpdated = function (errorMessages) {
                    if(!scope.notifications){
                        scope.notifications = [];
                    }
                    scope.notifications.push(errorMessages);
                    messaging.publish(messages.topic._CLEAR_NOTIFICATIONS_);
                };

                var _errorNotificationUpdate = messaging.subscribe(messages.topic._ERROR_NOTIFICATION_UPDATED_, _onErrorNotificationUpdated);

                scope.$on('$destroy', function() {
                    messaging.unsubscribe(_errorNotificationUpdate);
                });

                scope.close = function(index){
                    scope.notifications.splice(index, 1);
                };

            }
        };

    }]);
})();
