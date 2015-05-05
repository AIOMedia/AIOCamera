/**
 * Radio Field
 */
angular.module('AioCamera').directive('radioField', [
    'VIEW_PATH',
    function (VIEW_PATH) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: VIEW_PATH + '/fields/radio-field.html',
            scope: {
                value : '=?',
                options: '='
            },
            link: function (scope, element, attrs) {
                scope.value = angular.isDefined(scope.value) ? scope.value : null;

                scope.setValue = function (newValue) {
                    scope.value = newValue;
                }
            }
        };
    }
]);