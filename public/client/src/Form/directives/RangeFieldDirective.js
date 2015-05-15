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

                // Initialize events
                $window.addEventListener('mousedown', dragStart, true);
                $window.addEventListener('mouseup', dragEnd, true);

                $progressBar.get()[0].addEventListener('click', click, true);

                $progressHandler.get()[0].addEventListener('focus', function (event) {
                    console.log('focusin');

                    $window.addEventListener('keydown', function (event) {

                    }, true);

                    $window.addEventListener('keypress', function (event) {

                    }, true);

                    $window.addEventListener('keyup', function (event) {

                    }, true);
                }, true);

                $progressHandler.get()[0].addEventListener('blur', function (event) {
                    console.log('focusout');
                }, true);

                // Directive destroy event
                scope.$on('$destroy', function() {
                    $window.removeEventListener('mousedown', dragStart, true);
                    $window.removeEventListener('mouseup', dragEnd, true);

                    $progressBar.get()[0].removeEventListener('click', click, true);
                });
            }
        };
    }
]);