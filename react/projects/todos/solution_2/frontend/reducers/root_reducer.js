import { combineReducers } from 'redux';

import todosReducer from './todos_reducer';
import stepsReducer from './steps_reducer';
import errorsReducer from './error_reducer';

const rootReducer = combineReducers({
  todosReducer,
  stepsReducer,
  errorsReducer
 });

export default rootReducer;
