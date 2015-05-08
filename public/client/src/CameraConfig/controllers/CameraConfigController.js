/**
 * Parameters Controller
 */
angular.module('AioCamera').controller('CameraConfigController', [
    function CameraConfigController() {
        this.parameters = {
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

        this.rotations = {
            0: '0°',
            90: '90°',
            270: '270°'
        };

        this.exposureModes = [
            'off',
            'auto', // Use automatic exposure mode
            'night', // Select setting for night shooting
            'nightpreview',
            'backlight', // Select setting for back-lit subject
            'spotlight',
            'sports', // Select setting for sports (fast shutter e
            'snow', // Select setting optimized for snowy scenery
            'beach', // Select setting optimized for beach
            'verylong', // Select setting for long exposures
            'fixedfps', // Constrain fps to a fixed value
            'antishake', // Antishake mode
            'fireworks' // Select setting optimized for firewo
        ];

        this.awbModes = [
            'off',
            'auto',
            'sun',
            'cloud',
            'shade',
            'tungsten',
            'fluorescent',
            'incandescent',
            'flash',
            'horizon'
        ];

        this.imageEffects = [
            'none', // No effect
            'negative', // Produces a negative image
            'solarise', // Solarise the image
            'sketch',
            'denoise',
            'emboss',
            'oilpaint',
            'hatch',
            'gpen',
            'pastel',
            'watercolour',
            'film',
            'blur',
            'saturation',
            'colourswap',
            'washedout',
            'posterise',
            'colourpoint',
            'colourbalance',
            'cartoon'
        ];

        this.meteringModes = [
            'average', // Average the whole frame for metering
            'spot', // Spot metering
            'backlit', // Assume a backlit image
            'matrix', // Matrix metering
        ];
    }
]);