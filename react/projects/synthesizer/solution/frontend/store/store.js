import { createStore } from 'redux';
import rootReducer from '../root_reducer';

const configureStore = (preloadedState = {}) => (
  createStore(
    rootReducer,
    preloadedState
  )
);

export default configureStore;
