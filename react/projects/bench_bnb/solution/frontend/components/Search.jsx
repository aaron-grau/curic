"use strict";

const React = require('react');
const BenchStore = require('../stores/bench_store');
const FilterParamsStore = require('../stores/filter_params_store');
const BenchActions = require('../actions/bench_actions');
const FilterForm = require('./filter_form');
const BenchIndex = require('./bench_index');
const BenchMap = require('./bench_map');
const hashHistory = require('react-router').hashHistory;


const Search = React.createClass({
  getInitialState() {
    return {
      benches: BenchStore.all(),
      filterParams: FilterParamsStore.params(),
    };
  },

  _benchesChanged() {
    this.setState({benches: BenchStore.all()});
  },

  _filtersChanged() {
    const newFilters = FilterParamsStore.params();
    this.setState({ filterParams: newFilters });
    BenchActions.fetchAllBenches(newFilters);
  },

  componentDidMount() {
    this.benchListener = BenchStore.addListener(this._benchesChanged);
    this.filterListener = FilterParamsStore.addListener(this._filtersChanged);
    const filterParams = FilterParamsStore.params();
    BenchActions.fetchAllBenches(filterParams);
  },

  componentWillUnmount() {
    this.benchListener.remove();
    this.filterListener.remove();
  },

  render() {
    return(
      <div className="user-pane">
        <div className="left-half">
          <h5>Click Map to Add Bench!</h5>
          <BenchMap benches={this.state.benches}/>
        </div>
        <div className="right-half">
          <FilterForm filterParams={this.state.filterParams}/>
          <BenchIndex benches={this.state.benches}/>
        </div>
      </div>
    );
  }
});

module.exports = Search;
