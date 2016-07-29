import { createStore } from 'redux';
import MasterReducer from '../reducers/master_reducer';
import MasterMiddleware from '../middleware/master_middleware';

const configureStore = (preloadedState = {}) => (
  createStore(
    MasterReducer,
    preloadedState,
    MasterMiddleware
  )
);

export default configureStore;
