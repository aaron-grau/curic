// File system utility
var fs = require('fs');

// Require express
var express = require('express');
var app = express();

// Setup database connection
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error.bind(console, "Connection Error: "));
mongoose.connect('mongodb://localhost/mydb');


// Load and run configuration
require('./config.js').init(app);


// Load all models
var modelPath = './app/models/';
var models = fs.readdirSync(modelPath);
models.forEach(function (model) {
  require(modelPath + model);  
})


// Load all routes & controllers

// Read all filenames in app/controllers
var controllers = fs.readdirSync('./app/controllers');

// Require and run init method for each one
controllers.forEach(function (controller) {
  var controller = require('./app/controllers/' + controller);
  controller.init(app);
});



// Start server
app.listen(8181);
console.log("Listening on 8181");

