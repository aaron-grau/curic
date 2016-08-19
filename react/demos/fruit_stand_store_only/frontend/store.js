import { createStore } from 'redux';
import reducer from './reducer.js';
import { addOrange, addApple } from './actions.js';

const store = createStore(reducer);

// app's initial state
console.log('initial state:', store.getState()); 

// dispatch single action
console.log('dispatching `addOrange`');
store.dispatch(addOrange); 

// app state after single dispatch
console.log('state after dispatch:', store.getState());

// dispatch more actions
console.log('dispatching `addApple` and `addOrange`');
store.dispatch(addApple); 
store.dispatch(addOrange);

// app state after all dispatches
console.log('state after dispatches: ', store.getState());
