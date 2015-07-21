/*
* File: app/js/module/a/services/version.js
*
* */

(function () {
    'use strict';
    angular.module('core.animations').animation('.fadeIn', function(){

        return {
            // to be used on ng-repeat / ng-view
            enter: function(elem, done){
                $(elem).css({
                    opacity: 0.5
                });
                $(elem).animate({
                    opacity: 1
                }, 200, done);
            },
            leave: function(elem, done){
                done();
            },
            // to be used on ng-show / ng-hide
            addClass: function(elem, clsName, done){
                done();
            },
            removeClass: function(elem, clsName, done){
                if (clsName === 'ng-hide'){
                    $(elem).css({
                        opacity: 0
                    });
                    // $(elem).removeClass('ng-hide');
                    $(elem).animate({
                        opacity: 1
                    }, 200, done);
                }
            }
        }
    });

});
