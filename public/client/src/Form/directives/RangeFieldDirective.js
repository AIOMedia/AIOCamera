/**
 * Range Field
 */
angular.module('AioCamera').directive('rangeField', [
    'VIEW_PATH',
    function (VIEW_PATH) {
        var defaultOptions = {
            step  : 1,
            min   : 0,
            max   : 100,
            showMilestones: true
        };

        return {
            restrict: 'E',
            replace: true,
            templateUrl: VIEW_PATH + '/Form/range-field.html',
            scope: {
                step           : '=?',
                min            : '=?',
                max            : '=?',
                value          : '=?',
                showMilestones : '=?'
            },
            link: function (scope, element, attrs) {
                scope.step  = angular.isDefined(scope.step)  ? scope.step  : defaultOptions.step;
                scope.min   = angular.isDefined(scope.min)   ? scope.min   : defaultOptions.min;
                scope.max   = angular.isDefined(scope.max)   ? scope.max   : defaultOptions.max;
                scope.value = angular.isDefined(scope.value) ? scope.value : defaultOptions.value;
                scope.showMilestones = angular.isDefined(scope.showMilestones) ? scope.showMilestones : defaultOptions.showMilestones;

                // Calculate width

            }
        };
    }
]);