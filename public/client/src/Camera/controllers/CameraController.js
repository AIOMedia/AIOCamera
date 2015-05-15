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