/**
 * Camera Directive
 */
angular.module('AioCamera').directive('cameraConfig', [
    'VIEW_PATH',
    function CameraConfigDirective(VIEW_PATH) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: VIEW_PATH + '/CameraConfig/camera-config.html',
            controller: 'CameraConfigController',
            controllerAs: 'cameraConfigCtrl',
            scope: {
                config: '='
            },
            link: function (scope, element, attrs, cameraConfigCtrl) {
                scope.$watch('config', function (newValue) {
                    cameraConfigCtrl.parameters = newValue;
                });

                // Directive destructor
                scope.$on('$destroy', function handleDestroyEvent() {

                });
            }
        };
    }
]);