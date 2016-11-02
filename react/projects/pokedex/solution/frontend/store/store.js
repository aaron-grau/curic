import { createStore } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from '../reducers/root_reducer';

const configureStore = () => createStore(RootReducer, thunk);

export default configureStore;
