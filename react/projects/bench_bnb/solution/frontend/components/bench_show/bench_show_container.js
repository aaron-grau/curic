import { connect } from 'react-redux';
import BenchShow from './bench_show';
// Actions
import { requestBench } from '../../actions/bench_actions';
// Selectors
import { selectBench } from '../../reducers/selectors';


const mapStateToProps = (state, ownProps) => {
  const benchId = parseInt(ownProps.params.benchId);
  const bench = selectBench(state.benches, benchId);
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
