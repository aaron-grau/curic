var React = require('react');
var FilterActions = require('../actions/filter_actions');

var Filters = React.createClass({
  maxSeatingChanged: function(e){
    FilterActions.updateMaxSeating(e.target.value);
  },
  minSeatingChanged: function (e) {
    FilterActions.updateMinSeating(e.target.value);
  },
  currentMax: function(){
    return this.props.filterParams.maxSeating;
  },
  currentMin: function(){
    return this.props.filterParams.minSeating;
  },
  updateSeating: function (min, max) {
    FilterActions.updateParams({
      seating: {min: min, max: max}
    });
  },
  render: function(){
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

module.exports = Filters;
