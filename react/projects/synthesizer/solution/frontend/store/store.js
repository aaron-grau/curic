import { createStore } from 'redux';
import reducer from '../reducers';

const configureStore = (preloadedState = {}) => (
  createStore(
    reducer,
    preloadedState
  )
);

export default configureStore;
