/**
 * sideNavigation - Directive for run metsiMenu on sidebar navigation
 */

(function () {
    'use strict';
    angular.module('core.directives').directive('sideNavigation', ['$timeout', function ($timeout) {

        return {
            restrict: 'A',
            link: function(scope, element) {
                // Call the metsiMenu plugin and plug it to sidebar navigation
                $timeout(function(){
                    element.metisMenu();
                });
            }
        };

    }]);
})();
