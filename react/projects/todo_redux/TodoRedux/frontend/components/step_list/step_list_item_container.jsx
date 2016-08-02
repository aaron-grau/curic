import { connect } from 'react-redux';
import StepListItem from './step_list_item';
// Actions
import { toggleStep, destroyStep } from '../../actions/step_actions';

const mapDispatchToProps = dispatch => ({
  destroyStep: (step) => dispatch(destroyStep(step)),
  toggleStep: (todo) => dispatch(toggleStep(todo))
});

export default connect(
  null, // important props are already passed in
  mapDispatchToProps
)(StepListItem);
