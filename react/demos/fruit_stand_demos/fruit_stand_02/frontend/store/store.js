import { createStore } from 'redux';
import reducer from '../reducers/root_reducer';

const store = createStore(reducer);

export default store;
