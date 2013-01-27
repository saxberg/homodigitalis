fs = require 'fs'
{exec} = require 'child_process'
UglifyJS = require 'uglify-js2'
recess = require 'recess'

run = (cmd, callback) ->
	exec cmd, (err, stdout, stderr) ->
		throw err if err?
		console.log stdout + stderr
		callback?()


files = 
	js:
		in: [
			# Bower components
			## Twitter Bootstrap
			'components/bootstrap/js/bootstrap-scrollspy.js'
			'components/bootstrap/js/bootstrap-affix.js'
			# app 
			'scripts/app.js'
		]
		out: 'lib/app.min.js'
		mapfile: 'app.js.map'
	less:
		in: [
			# Bower components
			## Twitter Bootstrap
			'scripts/bootstrap.less'
			# 'components/bootstrap/less/reset.less'
			# 'components/bootstrap/less/variables.less'
			# 'components/bootstrap/less/mixins.less'
			# 'components/bootstrap/less/scaffolding.less'
			# 'components/bootstrap/less/grid.less'
			# 'components/bootstrap/less/layouts.less'
			# 'components/bootstrap/less/type.less'
			# 'components/bootstrap/less/utilities.less'
			#'components/bootstrap/bootstrap/css/bootstrap-responsive.css'
			# app
			#'scripts/main.less'
		]
		out: 'lib/style.min.css'
	push: [
		'lib'
		'index.html'
		'media'
		'img'
	]


task 'compile', 'Compress JavaScript', ->
	result = UglifyJS.minify files.js.in,
		outSourceMap: files.js.mapfile
		sourceRoot: '/'
		warnings: false
	# write code
	code = result.code + '\n' + '//@ sourceMappingURL=/lib/' + files.js.mapfile
	fs.writeFile files.js.out, code, (err) ->
		console.error err if err?
	# write source map
	fs.writeFile 'lib/' + files.js.mapfile, result.map, (err) ->
		console.error err if err?


task 'recess', 'Make LESS into CSS', ->
	options =
		compile: true
		compress: true
	recess files.less.in, options, (err, obj) ->
		return console.error err if err?
		console.error obj.errors if obj.errors?
		console.log obj.output
		fs.writeFile files.less.out, obj.output, (err) ->
			console.error err if err?


task 'deploy', 'Push to server', ->
	run 'git checkout gh-pages', ->
		cmd = 'git checkout master -- ' + files.push.join ' '
		run cmd, ->
			run 'git commit -am "updates from master"', ->
				run 'git push origin gh-pages', ->
					run 'git checkout master'


task 'update', 'Update NPM modules and Bower components', ->
	run 'npm update'
	run 'bower update'
