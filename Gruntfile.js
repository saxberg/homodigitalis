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
	function run (cmd, callback) {
		grunt.util.spawn({ cmd: cmd }, function (err) {
			if (err !== null) {
				return grunt.util.error(err);
			}
			callback();
		});
	}
	grunt.registerTask('deploy', 'Deploy to GitHub gh-pages', function(){
		var paths = ['img', 'lib', 'media', '404.html', 'BingSiteAuth.xml', 'CNAME', 'favicon.ico', 'google001da78e150395d4.html', 'index.html', 'kilder.html', 'robots.txt', 'sitemap.xml']
		run('git checkout gh-pages', function(){
			run('git checkout master -- ' + paths.join(' '), function(){
				run('git commit -am "updates from master"', function(){
					run('git push origin gh-pages', function(){
						run('git checkout master', function(){
						});
					});
				});
			});
		});
	});
	
};
