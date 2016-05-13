var React = require('react');

var Review = React.createClass({
  render: function () {
    return (
      <div>
      <ul>
        <li>Rating: {this.props.rating}</li>
        <li>{this.props.body}</li>
      </ul>
      </div>
    );
  }
});

module.exports = Review;
