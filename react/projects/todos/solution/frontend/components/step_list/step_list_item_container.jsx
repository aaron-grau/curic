import { connect } from 'react-redux';
import StepListItem from './step_list_item';
// Actions
import { updateStep, destroyStep } from '../../actions/step_actions';

const mapDispatchToProps = (dispatch, { step }) => ({
  destroyStep: () => dispatch(destroyStep(step)),
  toggleStep: () => {
    const toggledStep = Object.assign({}, step, {
      done: !step.done
    });
    dispatch(updateStep(toggledStep))
  }
});

export default connect(
  null, // step prop is already passed in
  mapDispatchToProps
)(StepListItem);
