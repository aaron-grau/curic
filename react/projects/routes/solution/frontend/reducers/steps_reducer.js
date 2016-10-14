import { RECEIVE_STEPS,
         RECEIVE_STEP,
         REMOVE_STEP
       } from '../actions/steps_actions';

const StepsReducer = (state = [], action) => {
  switch(action.type) {
    case RECEIVE_STEPS:
      return action.steps.map(step => Object.assign({}, step));
    case RECEIVE_STEP:
      return [
        ...state,
        Object.assign({}, action.step)
      ];
    default:
      return state;
  }
};

export default StepsReducer;
