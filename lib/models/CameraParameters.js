/**
 * Camera Parameters Model
 */

// Load mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create CameraParameters schema
var CameraParametersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    position: {
        type: Number
    },
    dateDue     : Date,
    done        : Boolean,
    dateDone    : Date
});