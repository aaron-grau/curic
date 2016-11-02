import { createStore } from 'redux';
import RootReducer from '../reducers/root_reducer';
import thunkMiddleware from '../middleware/thunk_middleware';

const configureStore = (preloadedState = {}) => (
  createStore(
    RootReducer,
    preloadedState,
    thunkMiddleware
  )
);

export default configureStore;
