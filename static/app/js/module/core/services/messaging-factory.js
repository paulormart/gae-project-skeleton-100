/*
* File: app/js/module/core/services/messaging-factory.js
* based on AngularJS Services Chapter 4: Handling Cross-cutting Concerns
* Messaging design pattern to notify the consumer once your service method completes
*
* */

(function () {
    'use strict';
    angular.module('core.services').factory('MessagingFactory', [function(){

        var cache = {};

        ///////////////////////
        // Private Methods
        ///////////////////////
        var _subscribe = function (topic, callback) {
            if (!cache[topic]) {
                cache[topic] = [];
            }
            cache[topic].push(callback);
            return [topic, callback];
        };

        var _publish = function (topic, args) {
            if (cache[topic]) {
                angular.forEach(cache[topic], function (callback) {
                    callback.apply(null, args || []);
                });
            }
        };

        var _unsubscribe = function (handle) {
            var t = handle[0];
            if (cache[t]) {
                for(var x = 0; x < cache[t].length; x++)
                {
                    if (cache[t][x] === handle[1]) {
                        cache[t].splice(x, 1);
                    }
                }
            }
        };

        ///////////////////////
        // API Methods
        ///////////////////////
        var api = {
            publish: _publish,
            subscribe: _subscribe,
            unsubscribe: _unsubscribe
        };

        return api;


    }]);
})();
