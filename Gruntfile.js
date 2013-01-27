'use strict';

var text_data = require('./scripts/text.json');

module.exports = function (grunt) {

	grunt.initConfig({
		uglify: {
			hd: {
				options: {
					sourceMap: 'lib/app.js.map'
				},
				files: {
					'lib/app.min.js': [
						'components/bootstrap/js/bootstrap-scrollspy.js',
						'components/bootstrap/js/bootstrap-affix.js',
						'scripts/app.js'
					]
				}
			}
		},
		recess: {
			hd: {
				src: [
					'scripts/bootstrap.less',
					'scripts/main.less'
				],
				dest: 'lib/style.min.css',
				options: {
					compile: true,
					compress: true
				}
			}
		},
		template: {
			hd: {
				src: 'scripts/index.mustache',
				dest: 'index.html',
				variables: text_data,
				engine: 'hogan'
			}
		}
	});

	grunt.loadNpmTasks('grunt-recess');
	grunt.loadNpmTasks('grunt-templater');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	grunt.registerTask('default', ['uglify', 'recess', 'template']);
	
};