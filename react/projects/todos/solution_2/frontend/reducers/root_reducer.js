import { combineReducers } from 'redux';

import todos from './todos_reducer';
import steps from './steps_reducer';
import errors from './error_reducer';

const rootReducer = combineReducers({ todos, steps, errors });

export default rootReducer;
