/**
 * Camera Parameters Model
 */

// Load mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create CameraParameters schema
var CameraParametersSchema = new Schema({
    // Set width of the image
    width: {
        type: Number,
        default: 800,
        min: 0,
        max: 1920
    },

    // Set height of the image
    height: {
        type: Number,
        default: 600,
        min: 0,
        max: 1080
    },

    flipY: {
        type: Boolean,
        default: false
    },

    flipX: {
        type: Boolean,
        default: false
    },

    rotation: {
        type: Number
    },

    // Set the sharpness of the image (-100 to 100)
    sharpness: {
        type: Number,
        default: 0,
        min: -100,
        max: 100
    },

    // Set the contrast of the image (-100 to 100)
    contrast: {
        type: Number,
        default: 0,
        min: -100,
        max: 100
    },

    // Set the brightness of the image (0 is black, 100 is white)
    brightness: {
        type: Number,
        default: 50,
        min: 0,
        max: 100
    },

    // Set the saturation of the image (-100 to 100)
    saturation: {
        type: Number,
        default: 50,
        min: 0,
        max: 100
    },

    iso: {
        type: Number,
        default: 100,
        min: 100,
        max: 800
    },

    // VIDEO MODE ONLY
    stabilisation: {
        type: Boolean,
        default: false
    },

    evCompensation: {
        type: Number,
        default: 0,
        min: -25,
        max: 25
    },

    exposureMode: {
        type: String,
        default: 'auto'
    },

    // Set automatic white balance (AWB)
    awb: {
        type: String,
        default: 'auto'
    },

    // Set image effect
    imageEffect: {
        type: String,
        default: 'none'
    },

    // Set colour effect <U:V
    // colourEffect: null, // U:V (range 0 to 255)

    // Specify the metering mode used for the preview and capture
    meteringMode: {
        type: String,
        default: 'average'
    }
});