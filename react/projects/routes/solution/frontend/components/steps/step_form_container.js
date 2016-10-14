import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { createStep } from '../../actions/steps_actions';
// import { allSteps } from '../../reducers/selectors';

import StepForm from './step_form';

const mapDispatchToProps = dispatch => ({
  createStep: step => dispatch(createStep(step))
});

export default withRouter(connect(
  null,
  mapDispatchToProps
)(StepList));
