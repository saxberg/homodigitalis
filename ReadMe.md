# Homo Digitalis backstage

## Prerequisites

Assuming you have [npm](http://nodejs.org/) installed, `npm install` will download the needed [Grunt](http://gruntjs.com/) plugins, thus we also need Grunt as a global package, so `npm install -g grunt`. [Bower](http://twitter.github.com/bower/) is needed to download [Twitter Bootstrap](http://twitter.github.com/bootstrap/), so `npm install -g bower` and then `bower install`.

## Compile

Files in _scripts_ will by the command `grunt` be transmogriffed into the files you see in the _gh-pages_ branch serving [homodigitalis.org](http://homodigitalis.org/).

## Ship it

`grunt gitploy` will send the relevant files (_paths_ in _Gruntfile.js_) to the `gh-pages` branch on GitHub.

## License

Feel free to copy the source code I made.

---

Any [questions](http://twitter.com/webjay)?
