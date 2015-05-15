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
        this.mode = 'photo';

        /**
         * List of modes available
         * @type {string[]}
         */
        this.modesAvailable = [ 'photo', 'video' ];

        this.config = {
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

        /**
         * Camera preview settings
         * @type {{fillColor: string, url: string, fullscreen: boolean}}
         */
        this.preview = {
            fillColor : '#000100',
            url       : 'files/camera/tmp/snapshot.jpg',
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
// File : public/client/src/CameraConfig/controllers/CameraConfigController.js
/**
 * Parameters Controller
 */
angular.module('AioCamera').controller('CameraConfigController', [
    function CameraConfigController() {
        this.parameters = {};

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
// File : public/client/src/Form/controllers/RangeFieldController.js
/**
 * Range Field Controller
 */
angular.module('AioCamera').controller('RangeFieldController', [
    function RangeFieldController() {
        /**
         * Value of the fill
         * @type {number}
         */
        this.value = null;

        /**
         * Percentage of data range filling (for rendering progressbar)
         * @type {number}
         */
        this.fill = null;

        /**
         * Minimum value of the field
         * @type {number}
         */
        this.min = null;

        /**
         * Maximum value of the field
         * @type {number}
         */
        this.max = null;

        /**
         * Full data range between min and mx milestones
         * @type {null}
         */
        this.dataRange = null;

        /**
         * Step between two values
         * @type {number}
         */
        this.step = 1;

        /**
         * Total of steps into the data range
         * @type {null}
         */
        this.steps = null;

        /**
         * Display buttons to increment/decrement value
         * @type {boolean}
         */
        this.showButtons = true;

        /**
         * Display min and max milestones
         * @type {boolean}
         */
        this.showMilestones = false;

        /**
         * Display current value
         * @type {boolean}
         */
        this.showValue = true;

        /**
         * Set value of the field
         * @param {number} value
         */
        this.setValue = function setValue(value) {
            value = angular.isDefined(value) ? Number(value) : null;
            if (value !== this.value) {
                this.value = value;
                this.calculateFill();
            }
        };

        /**
         * Jump to previous step
         */
        this.previousValue = function previousValue() {
            console.log('previous');
            var currentStep = (this.value - this.min) / this.step;

            console.log(currentStep);

            // Decrement step
            currentStep--;

            if (currentStep >= 0) {
                // Calculate value for new step
                var newValue = this.min + (currentStep * this.step);
                this.setValue(newValue);
            }
        };

        /**
         * Jump to next step
         */
        this.nextValue = function nextValue() {
            console.log('next');
            var currentStep = (this.value - this.min) / this.step;

            // Increment step
            currentStep++;

            if (currentStep <= this.steps) {
                // Calculate value for new step
                var newValue = this.min + (currentStep * this.step);
                this.setValue(newValue);
            }
        };

        /**
         * Set min milestone
         * @param {number} value
         */
        this.setMin = function setMin(value) {
            value = angular.isDefined(value) ? Number(value) : null;
            if (value !== this.min) {
                this.min = value;
                this.calculateDataRange();
                this.calculateFill();
            }
        };

        /**
         * Set max milestone
         * @param {number} value
         */
        this.setMax = function setMax(value) {
            value = angular.isDefined(value) ? Number(value) : null;
            if (value !== this.max) {
                this.max = value;
                this.calculateDataRange();
                this.calculateFill();
            }
        };

        /**
         * Set step
         * @param {number} value
         */
        this.setStep = function setStep(value) {
            value = angular.isDefined(value) ? Number(value) : 1;
            if (value !== this.step) {
                this.step = value;
                this.calculateSteps();
            }
        };

        /**
         * Set show buttons flag
         * @param {boolean} value
         */
        this.setShowButtons = function setShowMilestones(value) {
            this.showButtons = !(angular.isDefined(value) && ('false' == value || !value));
        };

        /**
         * Set show milestones flag
         * @param {boolean} value
         */
        this.setShowMilestones = function setShowMilestones(value) {
            this.showMilestones = (angular.isDefined(value) && !('false' == value || !value));
        };

        /**
         * Set show value flag
         * @param {boolean} value
         */
        this.setShowValue = function setShowValue(value) {
            this.showValue = !(angular.isDefined(value) && ('false' == value || !value));
        };

        /**
         * Calculate percentage of filling
         */
        this.calculateFill = function calculateFill() {
            // Calculate width
            this.fill = (this.value - this.min) * 100 / this.dataRange;
        };

        /**
         * Calculate data range of the field
         */
        this.calculateDataRange = function calculateDataRange() {
            this.dataRange = null;
            if (typeof(this.min) !== 'undefined' && null !== this.min && typeof(this.max) !== 'undefined' && null !== this.max) {
                // Validate min and max values
                if (this.max <= this.min) {
                    // Min value is greater than max value
                    throw new Error('RangeField : `min` (' + this.min + ') value can not be greater than `max` (' + this.max + ') value.');
                }

                this.dataRange = this.max - this.min;

                this.calculateSteps();
            }
        };

        /**
         * Calculate number of steps
         */
        this.calculateSteps = function calculateSteps() {
            this.steps = null;
            if (typeof (this.dataRange) !== 'undefined' && null !== this.dataRange) {
                // Validate step value
                if (this.step > this.dataRange) {
                    // Step is greater than the full data range between min and max
                    throw new Error('RangeFieldDirective :  `step` (' + this.step + ') must be smaller than the full data range between `min` (' + this.min + ') and `max` (' + this.max + ') milestones.');
                }

                this.steps = Math.floor(this.dataRange / this.step);
            }
        }
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
 * Range Field Directive
 */
angular.module('AioCamera').directive('rangeField', [
    '$window',
    'VIEW_PATH',
    function ($window, VIEW_PATH) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: VIEW_PATH + '/Form/range-field.html',
            controller: 'RangeFieldController',
            controllerAs: 'rangeField',
            scope: {
                value          : '=',
                min            : '@',
                max            : '@',
                step           : '@?',
                showButtons    : '@?',
                showMilestones : '@?',
                showValue      : '@?'
            },
            link: function (scope, element, attrs, rangeFieldCtrl) {
                // Watch properties
                scope.$watch('value', function (newValue) {
                    rangeFieldCtrl.setValue(newValue);
                }, true);

                scope.$watch('min', function (newValue) {
                    rangeFieldCtrl.setMin(newValue);
                }, true);

                scope.$watch('max', function (newValue) {
                    rangeFieldCtrl.setMax(newValue);
                }, true);

                scope.$watch('step', function (newValue) {
                    rangeFieldCtrl.setStep(newValue);
                }, true);

                scope.$watch('showButtons', function (newValue) {
                    rangeFieldCtrl.setShowButtons(newValue);
                }, true);

                scope.$watch('showMilestones', function (newValue) {
                    rangeFieldCtrl.setShowMilestones(newValue);
                }, true);

                scope.$watch('showValue', function (newValue) {
                    rangeFieldCtrl.setShowValue(newValue);
                }, true);

                var $progressBar     = element.find('.progress');
                var $progressHandler = $progressBar.find('.progress-handler');

                function changeValue(event) {
                    // Get element position
                    var position = $progressBar.offset();

                    var elementStart = position.left;
                    var elementWidth = $progressBar.width();
                    var elementEnd   = elementStart + elementWidth;

                    // Step count = NB values /
                    var stepCount = Math.floor((rangeFieldCtrl.dataRange) / rangeFieldCtrl.step);
                    var stepWidth = elementWidth / stepCount;

                    // We only check for horizontal position
                    var mousePosition = event.clientX;

                    if (mousePosition <= elementStart) {
                        // Set min value
                        scope.value = rangeFieldCtrl.min;
                    } else if (mousePosition >= elementEnd) {
                        // Set max value
                        scope.value = rangeFieldCtrl.max;
                    } else {
                        // Calculate nearest value
                        var distFromMin = mousePosition - elementStart;
                        var nbSteps = (distFromMin - (distFromMin % stepWidth)) / stepWidth;

                        if ((distFromMin % stepWidth) > (rangeFieldCtrl.step / 2)) {
                            // Floor to greater integer
                            nbSteps++;
                        }

                        scope.value = Math.floor(rangeFieldCtrl.min + (nbSteps * rangeFieldCtrl.step));
                    }

                    scope.$apply();
                }

                var dragged = false;

                function dragStart(event) {
                    if (event.target == $progressHandler.get()[0] && !dragged) {
                        // Focus the handler
                        $progressHandler.get()[0].focus();

                        dragged = true;

                        // Create events
                        $window.addEventListener('mousemove', changeValue, true);

                        event.preventDefault();
                    }
                }

                function dragEnd(event) {
                    if (dragged) {
                        dragged = false;

                        // Remove events
                        $window.removeEventListener('mousemove', changeValue, true);
                    }
                }

                function click(event) {
                    if (!dragged) {
                        changeValue(event);
                    }
                }

                function keyPressed(event) {
                    if (37 == event.keyCode) {
                        // Left arrow pressed => get previous value
                        rangeFieldCtrl.previousValue();
                        scope.$apply();
                    } else if (39 == event.keyCode) {
                        // Next arrow pressed => get next value
                        rangeFieldCtrl.nextValue();
                        scope.$apply();
                    }
                }

                function bindKeyPressedEvents(event) {
                    $window.addEventListener('keydown', keyPressed, true);
                }

                function removeKeyPressedEvents(event) {
                    $window.removeEventListener('keydown', keyPressed, true);
                }

                // Controls : change value by dragging the progress bar cursor
                $window.addEventListener('mousedown', dragStart, true);
                $window.addEventListener('mouseup', dragEnd, true);

                // Controls : change value by clicking anywhere on the progress bar
                $progressBar.get()[0].addEventListener('click', click, true);

                // Controls : change value by pressing left or right arrow keys
                $progressHandler.get()[0].addEventListener('focus', bindKeyPressedEvents, true);
                $progressHandler.get()[0].addEventListener('blur', removeKeyPressedEvents, true);

                // Directive destroy event
                scope.$on('$destroy', function() {
                    $window.removeEventListener('mousedown', dragStart, true);
                    $window.removeEventListener('mouseup', dragEnd, true);

                    $progressBar.get()[0].removeEventListener('click', click, true);

                    $progressHandler.get()[0].removeEventListener('focus', bindKeyPressedEvents, true);
                    $progressHandler.get()[0].removeEventListener('blur', removeKeyPressedEvents, true);
                });
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