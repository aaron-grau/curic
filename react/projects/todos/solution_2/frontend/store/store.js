import { createStore, applyMiddleware } from 'redux';
import RootReducer from '../reducers/root_reducer';
import thunkMiddleware from '../middleware/thunk_middleware';

const logger = ({ getState, dispatch }) => (next) => (action) => {
  console.log(getState());
  console.log(action);
  const result = next(action)
  console.log(getState());
  return result
}

const configureStore = (preloadedState = {}) => {
  return createStore(
    RootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware, logger)
  );
}

export default configureStore;
