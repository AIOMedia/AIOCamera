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
                    'bower_components/bootstrap/dist/js/bootstrap.js'
                ],
                dest: '<%= distFolder %>/js/lib.js'
            },

            lib_min: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js'
                ],
                dest: '<%= distFolder %>/js/lib.min.js'
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
                dest: '<%= distFolder %>/css/app.min.css'
            }
        }
    });

    // Load Grunt task runners
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');

    // Register our own custom task alias.
    grunt.registerTask('build', ['concat', 'less']);
};