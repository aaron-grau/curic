import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import ReviewForm from './review_form';
import { createReview } from '../../actions/bench_actions';

const mapDispatchToProps = dispatch => ({
  createReview: review => dispatch(createReview(review)),
  push: (location) => dispatch(push(location))
});

export default connect(
  null,
  mapDispatchToProps
)(ReviewForm);
