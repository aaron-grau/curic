"use strict";

const React = require("react");

const Currency = React.createClass({
  render() {
    let color = "green";
    if(this.props.rate < 1) {
      color = "red";
    }

    return (
      <div className={color}>
        {this.props.name}
        &nbsp;
        {this.props.rate}
      </div>
    );
  }
});

module.exports = Currency;
