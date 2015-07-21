/*
* File: app/js/module/core/services/model-transformer-factory.js
* based on AngularJS Services page 74
* K. Scott Allen also provides a generic translation service that allows you to transform the
* plain JSON objects received from external data services into your model object.
*
* */

(function () {
    'use strict';
    angular.module('core.services').factory('ModelTransformerFactory', function(){

            ///////////////////////
            // Private Methods
            ///////////////////////

            var _transformObject = function(jsonResult, constructor) {
                var model = new constructor();
                angular.extend(model, jsonResult);
                return model;
            };

            var _transformResult = function(jsonResult, constructor) {
                if (angular.isArray(jsonResult)) {
                    var models = [];
                    angular.forEach(jsonResult, function(object) {
                        models.push(_transformObject(object, constructor));
                    });
                    return models;
                } else {
                    return _transformObject(jsonResult, constructor);
                }
            };
            ///////////////////////
            // API Methods
            ///////////////////////
            var api = {
                transform: _transformResult
            };

            return api;

    });
})();
