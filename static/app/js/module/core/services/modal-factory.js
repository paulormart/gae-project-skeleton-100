/*
* File: app/js/module/a/services/version.js
*
* */

(function () {
    'use strict';
    angular.module('core.services').factory('ModalFactory', ['$timeout','MessagingFactory','MESSAGES',

        function($timeout, MessagingFactory, MESSAGES){

            var messaging = MessagingFactory;
            var messages = MESSAGES;

            var _messageText = '';
            var _displayType = 'popup';

            ///////////////////////
            // _SHOW_MODAL_
            ///////////////////////
            var _displayDialogHandler = function(message, type){

                _messageText = message;
                _displayType = type;

                $timeout(function(){
                    switch(_displayType){
                        case 'popup':
                            messaging.publish(messages.topic._MODAL_POPUP_, [_messageText]);
                            break;
                        case 'confirmation':
                            messaging.publish(messages.topic._MODAL_CONFIRMATION_, [_messageText]);
                            break;
                        default:
                            messaging.publish(messages.topic._MODAL_POPUP_, [_messageText]);
                            break;
                    }
                }, 0);
            };

            messaging.subscribe(messages.topic._SHOW_MODAL_, _displayDialogHandler);

            ///////////////////////
            // Initialize
            ///////////////////////
            var init = function() {
                _messageText = '';
                _displayType = 'popup';
            };

            var api = {
                init: init
            };

            return api;

        }]);
})();