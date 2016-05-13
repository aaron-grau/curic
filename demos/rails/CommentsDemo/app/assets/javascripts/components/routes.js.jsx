_.extend(
  window,
  _.pick(
    ReactRouter,
    "DefaultRoute", "Link", "Route", "Router", "RouteHandler"
  )
);

var Dashboard = React.createClass({
  render: function () {
    return <h1>DASHBOARD!</h1>
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="comments"
                       path="/comments"
                       handler={CommentsIndex} />
    <DefaultRoute handler={Dashboard} />
  </Route>
);

$(function () {
  ReactRouter.run(routes, function (Handler) {
    React.render(<Handler />, document.body);
  });
});