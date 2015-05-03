/**
 * Recorder Controller
 */
angular.module('AioCamera').controller('RecorderController', [
    function RecorderController() {
        var socket = io();

        this.previewUrl = null;

        socket.on('liveStream', function (url) {
            this.previewUrl = url;
        }.bind(this));

        this.start = function () {
            socket.emit('start-stream');
        };
    }
]);