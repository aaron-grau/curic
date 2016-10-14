import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { createStep } from '../../actions/steps_actions';
import { allSteps } from '../../reducers/selectors';

import StepList from './step_list';

const mapStateToProps = ({ steps }, ownProps ) => {
  debugger
  return {
    todoId: params.todoId,
    steps
  };
};

const mapDispatchToProps = dispatch => ({
  createStep: step => dispatch(createStep(step))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(StepList));
