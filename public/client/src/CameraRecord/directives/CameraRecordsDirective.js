/**
 * Camera Directive
 */
angular.module('AioCamera').directive('cameraRecords', [
    'VIEW_PATH',
    function CameraRecordsDirective(VIEW_PATH) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: VIEW_PATH + '/CameraRecord/camera-records.html',
            controller: 'CameraRecordsController',
            controllerAs: 'cameraRecordsCtrl',
            scope: {},
            link: function (scope, element, attrs, cameraRecordsCtrl) {
                // Directive destructor
                scope.$on('$destroy', function handleDestroyEvent() {

                });
            }
        };
    }
]);