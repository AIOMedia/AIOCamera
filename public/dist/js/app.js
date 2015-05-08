(function() {
// File : public/client/app.js
/**
 * AIOCamera Application
 * Manages Raspberry Pi Camera
 */
angular.module('AioCamera', [
    'ngRoute'
]);
// File : public/client/constants.js
/**
 * Constants
 */
angular.module('AioCamera')
    .constant('VIEW_PATH', 'client/views');
// File : public/client/src/Camera/controllers/CameraController.js
/**
 * Camera Controller
 */
angular.module('AioCamera').controller('CameraController', [
    function CameraController() {
        /**
         * Orientation of the viewport (`portrait` or `landscape`)
         * @type {string}
         */
        this.orientation = null;

        /**
         * Camera mode
         * @type {string}
         */
        this.mode = 'streaming';

        /**
         * List of modes available
         * @type {string[]}
         */
        this.modesAvailable = [ 'streaming', 'photo', 'video' ];

        /**
         * Camera preview settings
         * @type {{fillColor: string, url: string, fullscreen: boolean}}
         */
        this.preview = {
            fillColor : '#000100',
            url       : 'camera/tmp/snapshot.jpg',
            fullscreen: true
        };

        /**
         * Flags for opened window
         * @type {{config: boolean, records: boolean}}
         */
        this.openedWindow = {
            config: false,
            records: false
        };

        /**
         * Open or Close the configuration window
         */
        this.toggleConfigWindow = function () {
            if (!this.openedWindow.config) {
                // Open window => Close other window if needed
                this.openedWindow.records = false;
            }

            this.openedWindow.config = !this.openedWindow.config;
        };

        /**
         * Open or Close the records window
         */
        this.toggleRecordsWindow = function () {
            if (!this.openedWindow.records) {
                // Open window => Close other window if needed
                this.openedWindow.config = false;
            }

            this.openedWindow.records = !this.openedWindow.records;
        };

        /**
         * Enable or disable fullscreen
         */
        this.toggleFullscreen = function () {
            this.preview.fullscreen = !this.preview.fullscreen;
        };
    }
]);
// File : public/client/src/Camera/directives/CameraDirective.js
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
                var socket = io();

                // Catch server events
                socket.on('snapshot', function (url) {
                    this.preview.url = url;

                    scope.$apply();
                }.bind(this));

                // Directive destructor
                scope.$on('$destroy', function handleDestroyEvent() {
                    $($window).off('resize');
                });
            }
        };
    }
]);
// File : public/client/src/CameraConfig/controllers/CameraConfigController.js
/**
 * Parameters Controller
 */
angular.module('AioCamera').controller('CameraConfigController', [
    function CameraConfigController() {
        this.parameters = {
            width: 1000,
            height: 1000,

            flipY: true,
            flipX: false,

            rotation: 0,

            // Set the sharpness of the image (-100 to 100)
            sharpness: 0,

            // Set the contrast of the image (-100 to 100)
            contrast: 0,

            // Set the brightness of the image (0 is black, 100 is white)
            brightness: 50,

            saturation: 0, // -100 to 100
            iso: 100, // 100 to 800
            stabilisation: false, // VIDEO MODE ONLY
            evCompensation: 0, // -25 to 25
            exposureMode: 'auto',

            // Set automatic white balance (AWB)
            awb: 'auto',

            // Set image effect
            imageEffect: 'none',

            // Set colour effect <U:V
            colourEffect: null, // U:V (range 0 to 255)

            // Specify the metering mode used for the preview and capture
            meteringMode: 'average'
        };

        this.rotations = {
            0: '0°',
            90: '90°',
            270: '270°'
        };

        this.exposureModes = [
            'off',
            'auto', // Use automatic exposure mode
            'night', // Select setting for night shooting
            'nightpreview',
            'backlight', // Select setting for back-lit subject
            'spotlight',
            'sports', // Select setting for sports (fast shutter e
            'snow', // Select setting optimized for snowy scenery
            'beach', // Select setting optimized for beach
            'verylong', // Select setting for long exposures
            'fixedfps', // Constrain fps to a fixed value
            'antishake', // Antishake mode
            'fireworks' // Select setting optimized for firewo
        ];

        this.awbModes = [
            'off',
            'auto',
            'sun',
            'cloud',
            'shade',
            'tungsten',
            'fluorescent',
            'incandescent',
            'flash',
            'horizon'
        ];

        this.imageEffects = [
            'none', // No effect
            'negative', // Produces a negative image
            'solarise', // Solarise the image
            'sketch',
            'denoise',
            'emboss',
            'oilpaint',
            'hatch',
            'gpen',
            'pastel',
            'watercolour',
            'film',
            'blur',
            'saturation',
            'colourswap',
            'washedout',
            'posterise',
            'colourpoint',
            'colourbalance',
            'cartoon'
        ];

        this.meteringModes = [
            'average', // Average the whole frame for metering
            'spot', // Spot metering
            'backlit', // Assume a backlit image
            'matrix', // Matrix metering
        ];
    }
]);
// File : public/client/src/CameraConfig/directives/CameraConfigDirective.js
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
                // Directive destructor
                scope.$on('$destroy', function handleDestroyEvent() {

                });
            }
        };
    }
]);
// File : public/client/src/CameraRecord/controllers/CameraRecordsController.js
/**
 * Records Controller
 */
angular.module('AioCamera').controller('CameraRecordsController', [
    function CameraRecordsController() {
        this.records = [];
    }
]);
// File : public/client/src/CameraRecord/directives/CameraRecordsDirective.js
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
// File : public/client/src/Form/directives/RadioFieldDirective.js
/**
 * Radio Field
 */
angular.module('AioCamera').directive('radioField', [
    'VIEW_PATH',
    function (VIEW_PATH) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: VIEW_PATH + '/Form/radio-field.html',
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
// File : public/client/src/Form/directives/RangeFieldDirective.js
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
// File : public/client/src/Form/directives/SwitchFieldDirective.js
/**
 * Range Field
 */
angular.module('AioCamera').directive('switchField', [
    'VIEW_PATH',
    function (VIEW_PATH) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: VIEW_PATH + '/Form/switch-field.html',
            scope: {
                value : '=?'
            },
            link: function (scope, element, attrs) {
                scope.value = scope.value ? true : false;
            }
        };
    }
]);
})();