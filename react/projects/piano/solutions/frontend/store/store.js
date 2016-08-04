import { createStore } from 'redux';
import reducer from '../reducers';

const configureStore = (preloadedState = {}) => (
  createStore(
    reducer,
    preloadedState
  )
);
console.log(configureStore);
export default configureStore;
