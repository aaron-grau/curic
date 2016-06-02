import React from 'react';
import BenchStore from '../stores/bench';
import FilterParamsStore from '../stores/filter_params';
import { Link } from 'react-router';
import Bench from './Bench';
import Map from './Map';
import ClientActions from '../actions/client_actions';

const BenchShow = React.createClass({
  getInitialState() {
    const benchId = this.props.params.benchId;
    const bench = BenchStore.find(benchId) || {} ;
    return { bench };
  },

  componentDidMount() {
    this.benchListener = BenchStore.addListener(this._benchChanged);
    const params = FilterParamsStore.params();
    ClientActions.fetchBenches(params);
  },

  componentWillUnmount() {
    this.benchListener.remove();
  },

  _benchChanged() {
    const benchId = this.props.params.benchId;
    const bench = BenchStore.find(benchId);
    this.setState({ bench });
  },

  render() {
    const reviewURL = "/benches/" + this.state.bench.id + "/review";
    const benches = {};
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

export default BenchShow;
