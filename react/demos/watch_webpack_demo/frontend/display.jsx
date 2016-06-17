"use strict";

const React = require('react');

const Display = React.createClass({
  render(){
    return (
      <div>{this.props.elapsed}</div>
    );
  }
});

module.exports = Display;
