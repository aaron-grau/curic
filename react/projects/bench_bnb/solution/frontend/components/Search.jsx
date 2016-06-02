import React from 'react';
import BenchStore from '../stores/bench';
import FilterParamsStore from '../stores/filter_params';
import ClientActions from '../actions/client_actions';
import Filters from './Filters';
import Index from './Index';
import Map from './Map';
import {hashHistory} from 'react-router';


const Search = React.createClass({
  getInitialState: function(){
    return {
      benches: BenchStore.all(),
      filterParams: FilterParamsStore.params(),
      clickedLoc: null,
    };
  },

  _benchesChanged: function(){
    this.setState({benches: BenchStore.all()});
  },

  _filtersChanged: function () {
    const newParams = FilterParamsStore.params();
    this.setState({ filterParams: newParams });
    ClientActions.fetchBenches(newParams);
  },

  componentDidMount: function(){
    this.benchListener = BenchStore.addListener(this._benchesChanged);
    this.filterListener = FilterParamsStore.addListener(this._filtersChanged);
    const filterParams = FilterParamsStore.params();
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

export default Search;
