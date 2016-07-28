import { createStore } from 'redux';
import masterReducer from '../reducers/master_reducer';
import masterMiddleware from '../middleware/master_middleware';

const configureStore = (preloadedState = {}) => (
  createStore(
    masterReducer,
    preloadedState,
    masterMiddleware
  )
);

export default configureStore;
