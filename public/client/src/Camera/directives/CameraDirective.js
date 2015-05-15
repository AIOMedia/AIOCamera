/**
 * Camera Directive
 */
angular.module('AioCamera').directive('camera', [
    '$window',
    'VIEW_PATH',
    function CameraDirective($window, VIEW_PATH) {
        function getOrientation(viewport) {
            var orientation = 'landscape';
            if (viewport.innerHeight > viewport.innerWidth){
                orientation = 'portrait';
            }

            return orientation;
        }

        return {
            restrict: 'E',
            replace: true,
            templateUrl: VIEW_PATH + '/Camera/camera.html',
            controller: 'CameraController',
            controllerAs: 'cameraCtrl',
            scope: {},
            link: function (scope, element, attrs, cameraCtrl) {
                // Calculate viewport orientation
                cameraCtrl.orientation = getOrientation($window);
                $($window).on('resize', function () {
                    cameraCtrl.orientation = getOrientation($window);
                    scope.$apply();
                });

                // Initialize real-time connection to the server
                /*var socket = io();*/

                // Catch server events
                /*socket.on('snapshot', function (url) {
                    this.preview.url = url;

                    scope.$apply();
                }.bind(this));*/

                // Directive destructor
                scope.$on('$destroy', function handleDestroyEvent() {
                    $($window).off('resize');
                });
            }
        };
    }
]);