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
// File : public/client/routes.js
/**
 * Routes
 */
angular.module('AioCamera').config([
    '$routeProvider',
    'VIEW_PATH',
    function($routeProvider, VIEW_PATH) {
        // Recorder view
        $routeProvider.when('/', {
            templateUrl  : VIEW_PATH + '/recorder.html',
            controller   : 'RecorderController',
            controllerAs : 'recorderCtrl'
        });

        // Parameters view
        $routeProvider.when('/parameters', {
            templateUrl  : VIEW_PATH + '/parameters.html',
            controller   : 'ParametersController',
            controllerAs : 'parametersCtrl'
        });

        // Records view
        $routeProvider.when('/records', {
            templateUrl  : VIEW_PATH + '/records.html',
            controller   : 'RecordsController',
            controllerAs : 'recordsCtrl'
        });
    }
]);
// File : public/client/controllers/ParametersController.js
/**
 * Parameters Controller
 */
angular.module('AioCamera').controller('ParametersController', [
    function ParametersController() {
        this.parameters = {
            width: 1000,
            height: 1000,

            fullscreen: true,

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
// File : public/client/controllers/RecorderController.js
/**
 * Recorder Controller
 */
angular.module('AioCamera').controller('RecorderController', [
    '$scope',
    function RecorderController($scope) {
        var socket = io();

        this.previewUrl = null;

        socket.on('snapshot', function (url) {
            console.log(url);
            this.previewUrl = url;

            $scope.$apply();
        }.bind(this));

        /*this.start = function () {
            socket.emit('start-stream');
        };*/
    }
]);
// File : public/client/controllers/RecordsController.js
/**
 * Records Controller
 */
angular.module('AioCamera').controller('RecordsController', [
    function RecordsController() {
        this.records = [];
    }
]);
// File : public/client/directives/RadioFieldDirective.js
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
// File : public/client/directives/RangeFieldDirective.js
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
            templateUrl: VIEW_PATH + '/fields/range-field.html',
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
// File : public/client/directives/SwitchFieldDirective.js
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
})();