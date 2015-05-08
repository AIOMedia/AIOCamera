# AIO Camera

[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)
[![Dependencies Status](https://img.shields.io/david/AIOMedia/AIOCamera.svg?style=flat-square)](https://david-dm.org/AIOMedia/AIOCamera)

Web interface for accessing the Raspberry Camera.

## Requirements

### Hardware
* Raspberry Pi Model B/B+ or Rapsberry Pi 2 Model B - [Official site](https://www.raspberrypi.org/)
* [Raspberry Pi Camera](https://www.raspberrypi.org/products/camera-module/) or [Raspberry Pi Camera NoIR](https://www.raspberrypi.org/products/pi-noir-camera/)

You can find full documentation for the Raspberry Camera [here](http://elinux.org/Rpi_Camera_Module).

Camera module can be enabled from the Raspberry configuration :

```
$ sudo raspi-config
```

And enable the Camera option.

If you can't find the camera option in config list, try to update your Raspberry :

```
$ sudo apt-get update
$ sudo apt-get upgrade
```

### Software
* raspistill - see Raspberry Camera documentation for more information
* raspivid - see Raspberry Camera documentation for more information
* Node.js - [Download & Install Node.js](http://www.nodejs.org/download/)
* NPM Package Manager - [Download & Install NPM](https://www.npmjs.org/doc/README.html)

## Download

### GitHub Repository

Clone project repository into `your_project_name` directory.

```
$ git clone git@github.com:AIOMedia/AIOCamera.git your_project_name
```

### Zip archive

Download zip archive and extract it into your project directory.

## Installation

Got into project directory :

```
$ cd your_project_name
```

Install project dependencies :

```
$ npm install --production
```

## Running application

After the install process is over, you'll be able to run your application using NPM, just run npm start script:

```
$ npm start
```

Your application should run on the 3000 port so in your browser just go to http://localhost:3000

## Development

In order to be able to rebuild the application after you have made changes, you need to install project's `devDependencies` :

```
$ npm install --dev
```

Install client's libraries :

```
$ bower install
```

Build application (e.g. publish public files, build JS & CSS) :

```
$ grunt build
```

## Third party libraries

### Server
* Express v4.10.2 - [http://expressjs.com](http://expressjs.com)
* Socket IO - [http://socket.io](http://socket.io)
* Raspicam v0.2.13 - [https://github.com/troyth/node-raspicam](https://github.com/troyth/node-raspicam)

### Client
* jQuery
* Angular JS
* Bootstrap 3
* FontAwesome

## License

The MIT License (MIT).
See [LICENSE file](LICENSE) for more information.

## Authors

* Axel Penin ([Elorfin](https://github.com/Elorfin)) as main author
