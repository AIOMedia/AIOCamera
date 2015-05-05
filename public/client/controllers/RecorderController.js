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