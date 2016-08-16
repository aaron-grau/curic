import { combineReducers } from 'redux';

import TodosReducer from './todos_reducer';
import StepsReducer from './steps_reducer';

const RootReducer = combineReducers({
  todos: TodosReducer,
  steps: StepsReducer
});

export default RootReducer;
