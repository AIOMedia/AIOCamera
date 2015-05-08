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