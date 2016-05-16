exports.init = function (app) {
  app.get('/', function (req, res) {
    res.send('Hello, World!');
  });

  app.get('/counter', function (req, res) {
    var cookie = req.cookies.express_app || {};
    var initial_count = cookie.count || 0;
    var new_count = initial_count + 1;
    res.cookie('express_app', { count: new_count });
    res.send('' + initial_count);
  });
}



