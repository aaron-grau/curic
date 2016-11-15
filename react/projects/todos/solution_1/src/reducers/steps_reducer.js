import { RECEIVE_STEPS,
         RECEIVE_STEP,
         REMOVE_STEP } from '../actions/step_actions';

const StepsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_STEPS:
      const newState = {}
      action.steps.forEach((step) => newState[step.id] = step);
      return Object.assign({}, state, newState);
    case RECEIVE_STEP:
      return Object.assign({}, state, { [action.step.id]: action.step });
    case REMOVE_STEP:
      const newState = Object.assign({}, state);
      delete newState[action.step.id]
      return newState
    default:
      return state;
  }
};

export default StepsReducer;

// Sample State Shape
// {
//   "1": {
//     1: {
//       title: "walk to store",
//       done: false
//     },
//     2: {
//       title: "buy soap",
//       done: false
//     }
//   },
//   "2": {
//     3: {
//       title: "walk to park",
//       done: false
//     },
//     4: {
//       title: "play with dog",
//       done: false
//     }
//   }
// };
