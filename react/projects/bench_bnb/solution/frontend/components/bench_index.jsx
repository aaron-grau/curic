"use strict";

const React = require('react');
const IndexItem = require('./index_item');

const BenchIndex = React.createClass({
  render() {
    const benches = this.props.benches;
    const benchKeys = Object.keys(benches);
    return (
      <div>
        <h1>Benches: </h1>
        {
          benchKeys.map( key => {
            return (<IndexItem
              bench={benches[key]}
              key={key} />);
          })
        }
      </div>
    );
  }
});

module.exports = BenchIndex;
