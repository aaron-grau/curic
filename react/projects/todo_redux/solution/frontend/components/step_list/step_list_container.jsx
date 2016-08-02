import { connect } from 'react-redux';
import StepList from './step_list';
// Actions
import { stepsById } from '../../reducers/selectors';
import { createStep } from '../../actions/step_actions';

const mapStateToProps = (state, ownProps) => {
  const steps = stepsById(state, ownProps.todo_id) || [];
  return {
    steps, 
    todo_id: ownProps.todo_id
  };
};

const mapDispatchToProps = dispatch => ({
  createStep: step => dispatch(createStep(step))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepList);