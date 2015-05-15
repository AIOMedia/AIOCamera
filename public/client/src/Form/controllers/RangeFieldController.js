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
         * Display min and max milestones
         * @type {boolean}
         */
        this.showMilestones = true;

        /**
         * Display current value
         * @type {boolean}
         */
        this.showValue = true;

        /**
         * Set value of the field
         * @param {number} value
         */
        this.setValue = function (value) {
            value = angular.isDefined(value) ? Number(value) : null;
            if (value !== this.value) {
                this.value = value;
                this.calculateFill();
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
         * Set show value flag
         * @param {number} value
         */
        this.setShowValue = function setShowValue(value) {
            this.showValue = !(angular.isDefined(value) && ('false' == value || !value));
        };

        /**
         * Set show milestones flag
         * @param {number} value
         */
        this.setShowMilestones = function setShowMilestones(value) {
            this.showMilestones = !(angular.isDefined(value) && ('false' == value || !value));
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