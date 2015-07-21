/*
* File: app/js/module/a/services/version.js
*
* */

(function () {
    'use strict';
    angular.module('authentication.services').factory('ResetPasswordFactory',

        ['MessagingFactory','MESSAGES', 'URLS','ResetPasswordResourceFactory','ModelTransformerFactory','UserModel',

        function(MessagingFactory, MESSAGES, URLS, ResetPasswordResourceFactory, ModelTransformerFactory,UserModel){

            var messaging = MessagingFactory;
            var messages = MESSAGES;
            var resetPasswordResource =ResetPasswordResourceFactory;
            var modelTransformer = ModelTransformerFactory;

            ///////////////////////
            // Private Functions
            ///////////////////////

            ///////////////////////
            // _RESET_PASSWORD_
            ///////////////////////

            var _resetPassword = function (data) {
                return resetPasswordResource.create(data, _resetPasswordSuccess, _resetPasswordFailure);

            };

            var _resetPasswordSuccess = function(response, headerFn){
               messaging.publish(messages.topic._RESET_PASSWORD_COMPLETE_);
            };

            var _resetPasswordFailure = function(response){
                messaging.publish(messages.topic._RESET_PASSWORD_FAILED_);
            };

            messaging.subscribe(messages.topic._RESET_PASSWORD_, _resetPassword);

            ///////////////////////
            // _GET_RESET_PASSWORD_
            ///////////////////////

            var _getResetPassword = function (key_url) {
                return resetPasswordResource.get({ key_url: key_url }, _getResetPasswordSuccess, _getResetPasswordFailure);

            };

            var _getResetPasswordSuccess = function(response, headerFn){
                if (response){
                    messaging.publish(messages.topic._GET_RESET_PASSWORD_COMPLETE_,
                      [modelTransformer.transform(response, UserModel)]);
                }
                else {
                    _getResetPasswordFailure();
                }
            };

            var _getResetPasswordFailure = function(response){
                messaging.publish(messages.topic._GET_RESET_PASSWORD_FAILED_);
            };

            messaging.subscribe(messages.topic._GET_RESET_PASSWORD_, _getResetPassword);

            ///////////////////////
            // _RESET_PASSWORD_CONFIRMATION_
            ///////////////////////

            var _resetPasswordConfirmation = function (data) {
                return resetPasswordResource.update(data, _resetPasswordConfirmationSuccess, _resetPasswordConfirmationFailure);

            };

            var _resetPasswordConfirmationSuccess = function(response, headerFn){
               messaging.publish(messages.topic._RESET_PASSWORD_CONFIRMATION_COMPLETE_);
            };

            var _resetPasswordConfirmationFailure = function(response){
                messaging.publish(messages.topic._RESET_PASSWORD_CONFIRMATION_FAILED_);
            };

            messaging.subscribe(messages.topic._RESET_PASSWORD_CONFIRMATION_, _resetPasswordConfirmation);

            ///////////////////////
            // Initialize
            ///////////////////////
            var init = function(){};
            ///////////////////////
            // API
            ///////////////////////

            return {
                init:init
            };
    }]);
})();