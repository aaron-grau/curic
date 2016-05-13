var express = require('express');

exports.init = function (app) {
  // SERVER
  // Setup server log
  app.use(express.logger());

  // VIEWS
  // Change view directory
  app.set('views', './app/views');
  // Set EJS as renderer for plain HTML files
  app.engine('html', require('ejs').renderFile);

  // STATIC ASSETS
  app.use('/scripts', express.static('./app/assets/javascripts'));
  app.use('/stylesheets', express.static('./app/assets/stylesheets'));

  // COOKIES
  app.use(express.cookieParser());

  // POST Data parsing
  app.use(express.bodyParser());

}

