import React from 'react';
import BenchStore from '../stores/bench';
import FilterParamsStore from '../stores/filter_params';
import ReactRouter from 'react-router';
import Bench from './Bench';
import Map from './Map';
import ClientActions from '../actions/client_actions';

var BenchShow = React.createClass({
  getInitialState: function () {
    var benchId = this.props.params.benchId;
    var bench = BenchStore.find(benchId) || {} ;
    return { bench: bench };
  },
  componentDidMount: function () {
    this.benchListener = BenchStore.addListener(this._benchChanged);
    var params = FilterParamsStore.params();
    ClientActions.fetchBenches(params);
  },
  componentWillUnmount: function () {
    this.benchListener.remove();
  },
  _benchChanged: function () {
    var benchId = this.props.params.benchId;
    var bench = BenchStore.find(benchId);
    this.setState({ bench: bench });
  },
  render: function () {
    var Link = ReactRouter.Link;
    var reviewURL = "/benches/" + this.state.bench.id + "/review";
    var benches = {};
    benches[this.state.bench.id] = this.state.bench;
    return (
        <div>
          <Link to="/" >Back to Benches Index</Link>
          <Map className="half"
            singleBench={true}
            benches={benches}
            onMapClick={this.handleMapClick}
            onMarkerClick={this.handleMarkerClick} />
          <Bench bench={this.state.bench} className="half" />
          {
            this.props.children ||
              <Link to={reviewURL}>Leave a Review</Link>
          }
        </div>
      );
  }
});

module.exports = BenchShow;
