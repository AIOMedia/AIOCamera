module.exports = function (grunt) {
    // All upfront config goes in a massive nested object.
    grunt.initConfig({
        distFolder: 'public',

        // Concatenate JS task
        concat: {
            // Common options for all concatenate task
            options: {
                process: function(src, filepath) {
                    return '// File : ' + filepath + '\n' + src;
                }
            },

            // Concatenate libraries
            lib: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/bootstrap/dist/js/bootstrap.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-route/angular-route.js',
                ],
                dest: '<%= distFolder %>/dist/js/lib.js'
            },

            lib_min: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-route/angular-route.min.js'
                ],
                dest: '<%= distFolder %>/dist/js/lib.min.js'
            },

            // Concatenate app
            app: {
                // Wrap all application into an anonymous auto-callable function using 'use strict' env ( as recommended for angular app)
                options: {
                    banner: '(function() {\n',
                    footer: '\n})();'
                },
                src: [
                    'public/client/app.js',
                    'public/client/constants.js',

                    'public/client/src/**/*.js'
                ],
                dest: '<%= distFolder %>/dist/js/app.js'
            }
        },

        // Uglify JS task
        uglify: {
            // Uglify app
            app: {
                src: [
                    '<%= distFolder %>/dist/js/app.js'
                ],
                dest: '<%= distFolder %>/dist/js/app.min.js'
            }
        },

        // Compile LESS files task
        less: {
            options: {
                compress: true,
                yuicompress: true,
                optimization: 2
            },
            app: {
                src: [
                    '<%= distFolder %>/less/app.less'
                ],
                dest: '<%= distFolder %>/dist/css/app.min.css'
            }
        },

        // Copy fonts to public dir
        copy: {
            font_awesome: {
                expand: true,
                dot: true,
                cwd: 'bower_components/font-awesome/fonts/',
                src: [
                    '*.*'
                ],
                dest: '<%= distFolder %>/dist/fonts/'
            },

            glyphicon: {
                expand: true,
                dot: true,
                cwd: 'bower_components/bootstrap/fonts/',
                src: [
                    '*.*'
                ],
                dest: '<%= distFolder %>/dist/fonts/'
            }
        }
    });

    // Load Grunt task runners
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Register our own custom task alias.
    grunt.registerTask('build', ['concat', 'uglify', 'less', 'copy']);
};