import { connect } from 'react-redux';
import BenchShow from './bench_show';
// Actions
import { fetchBench } from '../../actions/bench_actions';


const mapStateToProps = (state, ownProps) => {
  const benchId = ownProps.params.benchId;
  const bench = state.benches[benchId] || {};
  return {
    benchId,
    bench
  };
};

const mapDispatchToProps = dispatch => ({
  fetchBench: id => dispatch(fetchBench(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BenchShow);
