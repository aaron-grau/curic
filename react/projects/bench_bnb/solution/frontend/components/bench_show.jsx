"use strict";

const React = require('react');
const BenchStore = require('../stores/bench_store');
const FilterParamsStore = require('../stores/filter_params_store');
const Link = require('react-router').Link;
const BenchDetail = require('./bench_detail');
const BenchMap = require('./bench_map');
const BenchActions = require('../actions/bench_actions');
const hashHistory = require('react-router').hashHistory;

const BenchShow = React.createClass({
  getInitialState() {
    const benchId = this.props.params.benchId;
    const bench = BenchStore.find(benchId) || {} ;
    return { bench };
  },

  componentDidMount() {
    this.benchListener = BenchStore.addListener(this._benchChanged);
    const params = FilterParamsStore.params();
    BenchActions.fetchAllBenches(params);
  },

  componentWillUnmount() {
    this.benchListener.remove();
  },

  _benchChanged() {
    const benchId = this.props.params.benchId;
    const bench = BenchStore.find(benchId);
    this.setState({ bench });
  },

  showReviewForm() {
    hashHistory.push(`/benches/${this.state.bench.id}/review`);
  },

  render() {
    const reviewURL = "/benches/" + this.state.bench.id + "/review";
    const benches = {};
    benches[this.state.bench.id] = this.state.bench;

    return (
        <div className="single-bench-show">
          <div className="single-bench-map">
            <Link to="/" >Back to Benches Index</Link>
            <BenchMap
              singleBench={true}
              benches={benches}
              onMapClick={this.handleMapClick}
              onMarkerClick={this.handleMarkerClick} />
          </div>
          <div className="right-half bench-details">
            <BenchDetail bench={this.state.bench} />
            {
              this.props.children ||
                <button className="review-button" onClick={this.showReviewForm}>
                  Leave a Review
                </button>
            }
          </div>
        </div>
      );
  }
});

module.exports = BenchShow;
