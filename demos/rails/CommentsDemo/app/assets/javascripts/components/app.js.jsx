var App = React.createClass({
  render: function () {
    return (
      <div>
        <ul>
          <li><Link to="app">Dashboard</Link></li>
          <li><Link to="comments">Comments</Link></li>
        </ul>

        <RouteHandler />
      </div>
    );
  }
});
