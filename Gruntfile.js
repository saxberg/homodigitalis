'use strict';

var text_data = require('./scripts/text.json');

module.exports = function (grunt) {

  grunt.initConfig({
    uglify: {
      hd: {
        options: {
          sourceMap: 'dist/lib/app.js.map'
        },
        files: {
          'dist/lib/app.min.js': [
            'bower_components/bootstrap/js/bootstrap-scrollspy.js',
            'bower_components/bootstrap/js/bootstrap-affix.js',
            'scripts/app.js'
          ]
        }
      }
    },
    recess: {
      main: {
        src: 'scripts/main.less',
        dest: 'dist/lib/style.min.css',
        options: {
          compile: true,
          compress: true
        }
      }
    },
    template: {
      index: {
        src: 'scripts/index.mustache',
        dest: 'dist/index.html',
        variables: text_data,
        engine: 'hogan'
      },
      sources: {
        src: 'scripts/kilder.mustache',
        dest: 'dist/kilder.html',
        variables: text_data,
        engine: 'hogan'
      }
    },
    copy: {
      files: {
        cwd: 'files/',
        src: '**',
        dest: 'dist/',
        expand: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-templater');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['uglify', 'recess', 'template', 'copy']);

};
