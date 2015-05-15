var express = require('express');

var app = express();

var http = require('http').Server(app);
var io   = require('socket.io')(http);
var fs   = require('fs');
var path = require('path');

var RaspiCam = require('raspicam');

// Public directory
app.use('/', express.static(path.join(__dirname, 'public')));

// Error handling
app.use(function(err, req, res, next) {
    if (!err) return next();

    console.log("error!!!");
    res.send("error!!!");

    http.close();

    // Kill the process if it doesn't close normally
    setTimeout(function () {
        process.exit(1);
    }, 3*1000);
});

// Display User Interface
app.get('/', function(req, res) {
    res.sendFile('public/index.html');
});

var sockets = {};

// Manage connections of the clients
io.on('connection', function (socket) {
    sockets[socket.id] = socket;
    console.log("Total clients connected : ", Object.keys(sockets).length);

    // Take a snapshot
    var camera = new RaspiCam({
        mode: 'photo',
        output: 'public/files/camera/tmp/snapshot.jpg',
        encoding: 'jpg',
        timeout: 0 // take the picture immediately
    });

    camera.on('started', function (err, timestamp) {
        console.log("photo started at " + timestamp);
    });

    camera.on('read', function (err, timestamp, filename) {
        console.log("photo image captured with filename: " + filename);

        // Send image to clients
        io.sockets.emit('snapshot', 'files/camera/tmp/snapshot.jpg?_t=' + (Math.random() * 100000));
    });

    camera.on('stop', function () {
        console.log('camera stopped');
    });

    camera.on('exit', function (timestamp) {
        console.log("photo child process has exited at " + timestamp);
    });

    /*camera.start();*/

    // Bind events to socket
    socket.on('disconnect', function() {
        console.log('Client disconnect...');

        var snapshotFile = 'public/files/camera/tmp/snapshot.jpg';

        /*if (fs.existsSync(snapshotFile)) {
            // There is a snapshot for this client => delete it
            fs.unlink(snapshotFile, function (err) {
                if (err) throw err;
                console.log('delete "public/camera/tmp/snapshot.jpg"');
            });
        }*/

        delete sockets[socket.id];
        console.log('disconnected');
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});
