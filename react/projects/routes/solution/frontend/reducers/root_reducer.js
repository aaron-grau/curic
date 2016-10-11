import { combineReducers } from 'redux';

import TodosReducer from './todos_reducer';
import StepsReducer from './steps_reducer';
import SessionReducer from './session_reducer';

const RootReducer = combineReducers({
  todos: TodosReducer,
  steps: StepsReducer,
  session: SessionReducer
});

export default RootReducer;
