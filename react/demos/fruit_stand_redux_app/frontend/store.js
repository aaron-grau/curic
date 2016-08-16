import { createStore } from 'redux';
import reducer from './reducer.js';
import { addOrange, addApple } from './actions.js';

const store = createStore(reducer);

console.log(store.getState()); // app's initial state

store.dispatch(addOrange); // dispatch action

console.log(store.getState());

store.dispatch(addApple); // dispatch more actions
store.dispatch(addOrange);

console.log(store.getState());
