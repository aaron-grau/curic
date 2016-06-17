"use strict";

const React = require('react');

const Splits = React.createClass({
  render() {
    return(
      <ul>
        {
          this.props.splits.map(function(split){
            return <li>{split}</li>;
          })
        }
      </ul>
    );
  }
});

module.exports = Splits;
