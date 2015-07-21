/*
* File: app/js/module/components/directives/drop-directive.js
*
*  http://blog.parkji.co.uk/2013/08/11/native-drag-and-drop-in-angularjs.html
*
* */

(function () {
    'use strict';
    angular.module('core.directives').directive('dirModal', ['MessagingFactory', 'MESSAGES',
        function (MessagingFactory,MESSAGES) {

        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'static/partial/core/dir_modal.html',
            link: function(scope, element) {

                var messaging = MessagingFactory;
                var messages = MESSAGES;

                element.hide();
                scope.modalType = 'popup';
                scope.message = '';

                var showPopupHandler = function (messageText) {
                    // got the request start notification, show the element
                    scope.message = messageText;
                    scope.modalType = 'popup';
                    element.show();
                    console.log('messageText', messageText, element)
                };

                var showConfirmationHandler = function(messageText) {
                    // got the request start notification, show the element
                    scope.message = messageText;
                    scope.modalType = 'confirmation';
                    element.show();
                };

                scope.showPopupHandle = messaging.subscribe(messages.topic._MODAL_POPUP_, showPopupHandler);
                scope.showConfirmationHandle = messaging.subscribe(messages.topic._MODAL_CONFIRMATION_, showConfirmationHandler);

                scope.$on('$destroy', function() {
                    messaging.unsubscribe(scope.showPopupHandle);
                    messaging.unsubscribe(scope.showConfirmationHandle);
                });

                scope.answeredOk = function(){
                    element.hide();
                    messaging.publish(messages.topic._MODAL_USER_RESPONSE_, "OK");
                };

                scope.answeredYes = function(){
                    element.hide();
                    messaging.publish(messages.topic._MODAL_USER_RESPONSE_, "YES");
                };

                scope.answeredNo = function(){
                    element.hide();
                    messaging.publish(messages.topic._MODAL_USER_RESPONSE_, "NO");
                };
            }
        };

    }]);
})();
