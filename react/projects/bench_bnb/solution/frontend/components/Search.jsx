import React from 'react';
import BenchStore from '../stores/bench';
import FilterParamsStore from '../stores/filter_params';
import ClientActions from '../actions/client_actions';
import Filters from './Filters';
import Index from './Index';
import Map from './Map';
import {hashHistory} from 'react-router';


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
