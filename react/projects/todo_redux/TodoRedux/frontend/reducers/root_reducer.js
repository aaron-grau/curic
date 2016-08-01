import { combineReducers } from 'redux';

import TodoReducer from '../reducers/todo_reducer';
import StepReducer from '../reducers/step_reducer';

const rootReducer = combineReducers({
  todos: TodoReducer,
  step: StepReducer
});

export default rootReducer;
