var React = require('react');
var BenchStore = require('../stores/bench');
var FilterParamsStore = require('../stores/filter_params');
var ClientActions = require('../actions/client_actions');
var Filters = require('./Filters');
var Index = require('./Index');
var Map = require('./Map');
var hashHistory = require('react-router').hashHistory;


var Search = React.createClass({
  _benchesChanged: function(){
    this.setState({benches: BenchStore.all()});
  },
  _filtersChanged: function () {
    var newParams = FilterParamsStore.params();
    this.setState({ filterParams: newParams });
    ClientActions.fetchBenches(newParams);
  },
  getInitialState: function(){
    return {
      benches: BenchStore.all(),
      filterParams: FilterParamsStore.params(),
      clickedLoc: null,
    };
  },
  componentDidMount: function(){
    this.benchListener = BenchStore.addListener(this._benchesChanged);
    this.filterListener = FilterParamsStore.addListener(this._filtersChanged);
    var filterParams = FilterParamsStore.params();
    ClientActions.fetchBenches(filterParams);
  },
  componentWillUnmount: function(){
    this.benchListener.remove();
    this.filterListener.remove();
  },
  render: function(){
    return(
      <div>
        <h5>Click Map to Add Bench!</h5>
        <Map
          benches={this.state.benches}/>
        <div className="half">
          <Filters filterParams={this.state.filterParams}/>
          <Index benches={this.state.benches}/>
        </div>
      </div>
    );
  }
});

module.exports = Search;
