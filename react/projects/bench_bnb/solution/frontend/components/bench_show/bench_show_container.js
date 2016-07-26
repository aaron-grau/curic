import { connect } from 'react-redux';
import BenchShow from './bench_show';
// Actions
import { requestBench } from '../../actions/bench_actions';


const mapStateToProps = (state, ownProps) => {
  const benchId = ownProps.params.benchId;
  const bench = state.benches[benchId] || {};
  return {
    benchId,
    bench
  };
};

const mapDispatchToProps = dispatch => ({
  requestBench: id => dispatch(requestBench(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BenchShow);
