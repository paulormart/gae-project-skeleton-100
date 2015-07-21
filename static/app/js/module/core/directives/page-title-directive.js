/**
 * pageTitle - Directive for set Page title - meta title
 */

(function () {
    'use strict';
    angular.module('core.directives').directive('dirPageTitle', ['$rootScope','$timeout', function ($rootScope, $timeout) {

        return {
            restrict: 'A',
            link: function(scope, element) {
                var listener = function(event, toState, toParams, fromState, fromParams) {
                    // Default title - load on Dashboard 1
                    var title = 'GAE | Responsive Admin Theme';
                    // Create your own title pattern
                    if (toState.data && toState.data.pageTitle) title = 'GAE | ' + toState.data.pageTitle;
                    $timeout(function() {
                        element.text(title);
                    });
                };
                $rootScope.$on('$stateChangeStart', listener);
            }
        }

    }]);
})();
