var express = require('express');

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var path = require('path');

var RaspiCam = require('raspicam');

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

var sockets = {};

// Manage connections of the clients
io.on('connection', function (socket) {
    sockets[socket.id] = socket;

    // Take a snapshot
    var camera = new RaspiCam({
        mode: "photo",
        output: __dirname + '/public/camera/tmp/image.jpg',
        encoding: "jpg",
        timeout: 0 // take the picture immediately
    });

    camera.on("started", function( err, timestamp ){
        console.log("photo started at " + timestamp );
    });

    camera.on("read", function( err, timestamp, filename ){
        console.log("photo image captured with filename: " + filename );

        // Send image to client
        io.sockets.emit('snapshot', 'camera/tmp/image.jpg?_t=' + (Math.random() * 100000));
    });

    camera.on("exit", function( timestamp ){
        console.log("photo child process has exited at " + timestamp );
    });

    /*try {
        camera.start();
    } catch (err) {

    }*/

    // Bind events to socket
    socket.on('disconnect', function() {
        delete sockets[socket.id];
    });

    socket.on('start-stream', function() {
        startStreaming(io);
    });

    console.log("Total clients connected : ", Object.keys(sockets).length);
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});

function stopStreaming() {
    if (Object.keys(sockets).length == 0) {
        app.set('watchingFile', false);
        if (proc) proc.kill();
        fs.unwatchFile(__dirname + '/public/stream/image_stream.jpg');
    }
}

function startStreaming(io) {
    /*if (app.get('watchingFile')) {
        io.sockets.emit('liveStream', 'image_stream.jpg?_t=' + (Math.random() * 100000));
        return;
    }

    var args = ["-w", "640", "-h", "480", "-o", __dirname + "/public/stream/image_stream.jpg", "-t", "999999999", "-tl", "100"];
    proc = spawn('raspistill', args);

    console.log('Watching for changes...');

    app.set('watchingFile', true);

    fs.watchFile(__dirname + '/public/stream/image_stream.jpg', function(current, previous) {
        io.sockets.emit('liveStream', 'stream/image_stream.jpg?_t=' + (Math.random() * 100000));
    });*/
}
