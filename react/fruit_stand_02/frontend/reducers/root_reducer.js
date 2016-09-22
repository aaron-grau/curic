import { combineReducers } from 'redux';
import fruitsReducer from './fruits_reducer';

const reducer = combineReducers({
  fruits: fruitsReducer,
});

export default reducer;
