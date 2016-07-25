import { connect } from 'react-redux';
import BenchShow from './bench_show';

const mapStateToProps = (state, ownProps) => {
  const benchId = ownProps.params.benchId;
  const bench = state.benches[benchId] || {};
  return {
    bench: bench
  };
};

export default connect(
  mapStateToProps
)(BenchShow);
