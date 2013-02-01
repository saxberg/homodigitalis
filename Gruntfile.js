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
			main: {
				src: 'scripts/main.less',
				dest: 'lib/style.min.css',
				options: {
					compile: true,
					compress: true
				}
			}
		},
		template: {
			index: {
				src: 'scripts/index.mustache',
				dest: 'index.html',
				variables: text_data,
				engine: 'hogan'
			},
			sources: {
				src: 'scripts/kilder.mustache',
				dest: 'kilder.html',
				variables: text_data,
				engine: 'hogan'
			}
		},
	});

	grunt.loadNpmTasks('grunt-recess');
	grunt.loadNpmTasks('grunt-templater');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	grunt.registerTask('default', ['uglify', 'recess', 'template']);

	// gitploy
	grunt.registerTask('gitploy', 'Deploy to GitHub gh-pages', function(){
		var exec = require('child_process').exec;
		var run = function (cmd, callback) {
			return exec(cmd, function(err, stdout, stderr) {
				if (err !== null) {
					throw err;
				}
				console.log(stdout + stderr);
				return typeof callback === "function" ? callback() : void 0;
			});
		};
		var done = this.async();
		var paths = ['img', 'lib', 'media', '404.html', 'BingSiteAuth.xml', 'CNAME', 'favicon.ico', 'google001da78e150395d4.html', 'index.html', 'kilder.html', 'robots.txt', 'sitemap.xml', 'fbchannel.html']
		run('git checkout gh-pages', function(){
			run('git checkout master -- ' + paths.join(' '), function(){
				run('git commit -am "updates from master"', function(){
					run('git push origin gh-pages', function(){
						run('git checkout master', function(){
							done();
						});
					});
				});
			});
		});
	});
	
};
