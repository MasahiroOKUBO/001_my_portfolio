module.exports = function (grunt) {
    //no need to grunt.loadNpmTasks('task_name');
    require('load-grunt-tasks')(grunt);

    // use config file, if need.
    var config = grunt.file.readYAML('Gruntconfig.yml');

    grunt.initConfig({
        responsive_images: {
            dev: {
                options: {
                    engine: 'im',
                    sizes: [{
                        width: 1200,
                        suffix: '_large',
                        quality: 50
                    },{
                        width: 600,
                        suffix: '_medium',
                        quality: 50
                    },{
                        width: 400,
                        suffix: '_small',
                        quality: 50
                    }]
                },
                files: [{
                    expand: true,
                    src: ['*.{gif,jpg,png}'],
                    cwd: '01_src/img_src/',
                    dest: '01_src/img/'
                }]
            }
        },

        cssmin : {
            mystyles : {
                src : ['01_src/css/mystyles.css'],
                dest : '01_src/css/mystyles.min.css'
            },
        },

        concat: {
            dist: {
                src: '01_src/js_src/*js',
                dest: '01_src/js/app.js'
            }
        },

        jshint: {
            options:{
                "eqeqeq": true
            },
            all:[
                'Gruntfile.js',
                config.src_dir_js+'*.js'
            ]
        },

        copy: {
            main: {
                files: [
                    {expand: true, cwd: config.src_dir, src: ['*.html'], dest: config.dst_dir},
                    {expand: true, cwd: config.src_dir, src: ['css/*.min.css'], dest: config.dst_dir},
                    {expand: true, cwd: config.src_dir, src: ['js/*.min.js'], dest: config.dst_dir},
                    {expand: true, cwd: config.src_dir, src: ['img/*'], dest: config.dst_dir},
                    {expand: true, cwd: config.src_dir, src: ['fonts/*'], dest: config.dst_dir},
                ],
            },
        },

        watch: {

        }

    });

    grunt.registerTask('default', [
        'responsive_images',
        'cssmin',
    ]);

    grunt.registerTask('make_dst', [
        'copy',
    ]);
};
