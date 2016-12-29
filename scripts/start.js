process.env.NODE_ENV = 'development';

// remove this if you prefer "localhost"
process.env.HOST     = require('ip').address(); 
// Load environment variables from .env file. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
require('dotenv').config({silent: true});


var path = require('path');
var webpack = require('webpack');
var express = require('express');
var config = require('../config/webpack.config.dev');
var paths = require('../config/paths');
var open = require('open');
var app = express();
var compiler = webpack(config);



// Tools like Cloud9 rely on this.
var DEFAULT_PORT = process.env.PORT || 3030;
var DEFAULT_HOST = process.env.HOST || 'localhost'

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
  publicPath: config.output.publicPath,
  historyApiFallback: true
}));

app.use(require('webpack-hot-middleware')(compiler));

// app.use(function(req, res) {
//   res.sendFile(paths.appHtml);
// });

app.listen(DEFAULT_PORT, function(err) {
  if (err) {
    return console.error(err);
  }
  open('http://' +DEFAULT_HOST+ ':' +DEFAULT_PORT+ '/')
  console.log('Listening at http://' +DEFAULT_HOST+ ':' +DEFAULT_PORT+ '/');
})
