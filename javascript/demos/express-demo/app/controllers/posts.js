exports.init = function (app) {
  app.get('/posts', function (req, res) {
    res.render('posts/index.ejs');
  });
}
