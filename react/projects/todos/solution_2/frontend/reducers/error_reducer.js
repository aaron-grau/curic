import { RECEIVE_ERRORS, CLEAR_ERRORS } from '../actions/error_actions';
import { RECEIVE_TODO } from '../actions/todo_actions';

const stepsReducer = (state = [], action) => {
  const nextState = Object.assign({}, state);
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_ERRORS:
    console.log(action.errors);
      return action.errors;
    case RECEIVE_TODO:
    case CLEAR_ERRORS:
      return [];
    default:
      return state;
  }
};

export default stepsReducer;

// Sample State Shape
// [
//   "Title cannot be blank",
// ]
