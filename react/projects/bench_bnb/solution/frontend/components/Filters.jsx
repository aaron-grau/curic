import React from 'react';
import FilterActions from '../actions/filter_actions';

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
        <label>Minimum Seats</label>
        <input type="number"
          onChange={this.minSeatingChanged}
          value={this.currentMin()}/>
         <br/>
        <label>Maximum Seats</label>
        <input type="number"
          onChange={this.maxSeatingChanged}
          value={this.currentMax()}/>
      </div>
    );
  }
});

export default Filters;
