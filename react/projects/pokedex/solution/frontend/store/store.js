import { createStore, applyMiddleware } from 'redux';
import IndexReducer from '../reducers/index_reducer';
import IndexMiddleware from '../middleware/index_middleware';

const configureStore = () => (
  createStore(
    IndexReducer,
    applyMiddleware(IndexMiddleware)
  )
);

export default configureStore;
