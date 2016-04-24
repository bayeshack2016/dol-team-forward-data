'use strict';

var express = require('express');
var app = express();

// Routes
app.use('/', express.static(__dirname + '/'));
app.use('/app', express.static(__dirname + '/app'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server Running on http://localhost:' + port);
});

module.exports = app;
