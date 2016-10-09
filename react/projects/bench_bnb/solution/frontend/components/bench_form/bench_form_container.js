import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import BenchForm from './bench_form';
import { createBench } from '../../actions/bench_actions';

const mapStateToProps = (state, ownProps) => ({
  lat: ownProps.location.query.lat,
  lng: ownProps.location.query.lng
});

const mapDispatchToProps = dispatch => ({
  createBench: bench => dispatch(createBench(bench)),
  push: (location) => dispatch(push(location))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BenchForm);
