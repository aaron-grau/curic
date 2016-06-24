"use strict";

const React = require('react');
const FilterActions = require('../actions/filter_actions');

const Filters = React.createClass({
  maxSeatingChanged(e) {
    FilterActions.updateMaxSeating(e.target.value);
  },

  minSeatingChanged(e) {
    FilterActions.updateMinSeating(e.target.value);
  },

  currentMax() {
    return this.props.filterParams.maxSeating;
  },

  currentMin() {
    return this.props.filterParams.minSeating;
  },

  updateSeating(min, max) {
    FilterActions.updateParams({
      seating: { min, max}
    });
  },

  render() {
    return (
      <div>
        <span className="filter">Filter results:</span>
        <br/>
        <label>Minimum Seats </label>
        <input type="number"
          onChange={this.minSeatingChanged}
          value={this.currentMin()}/>
         <br/>
        <label>Maximum Seats </label>
        <input type="number"
          onChange={this.maxSeatingChanged}
          value={this.currentMax()}/>
      </div>
    );
  }
});

module.exports = Filters;
