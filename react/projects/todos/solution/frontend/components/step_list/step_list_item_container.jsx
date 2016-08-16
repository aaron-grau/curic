import { connect } from 'react-redux';
import StepListItem from './step_list_item';
// Actions
import { toggleStep, destroyStep } from '../../actions/step_actions';

const mapDispatchToProps = (dispatch, { step }) => ({
  destroyStep: () => dispatch(destroyStep(step)),
  toggleStep: () => dispatch(toggleStep(step))
});

export default connect(
  null, // step prop is already passed in
  mapDispatchToProps
)(StepListItem);
