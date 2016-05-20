var React = require('react');

var Display = React.createClass({
  render: function(){
    return (
      <div>{this.props.elapsed}</div>
    );
  }
});

module.exports = Display;
