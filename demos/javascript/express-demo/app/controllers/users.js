var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.init = function (app) {
  app.get('/users', function (req, res) {
    User.find(function (err, users) {
      res.render('users/index.ejs', { users: users });
    });
  });

  app.get('/users/new', function (req, res) {
    res.render('users/new.ejs'); 
  });

  app.get('/users/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
      res.render('users/show.ejs', { user: user }); 
    });
  });

  app.post('/users', function (req, res) {
    var user = new User(req.body.user);
    user.save(function (err, user) {
      console.log("Created: ", user);
      res.redirect('/users/' + user._id);
    });
  });

}
