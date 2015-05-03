/**
 * Range Field
 */
angular.module('AioCamera').directive('switchField', [
    'VIEW_PATH',
    function (VIEW_PATH) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: VIEW_PATH + '/fields/switch-field.html',
            scope: {
                value : '=?'
            },
            link: function (scope, element, attrs) {
                scope.value = scope.value ? true : false;
            }
        };
    }
]);