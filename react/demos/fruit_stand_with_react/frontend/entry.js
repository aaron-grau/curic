const React = require('react');
const ReactDOM = require('react-dom');

import store from './store';
import { addOrange, addApple } from './actions';
import FruitStand from './components/fruit_stand';


ReactDOM.render(
	<FruitStand store={store} />,
	document.getElementById('root')
);

// for dispatching actions and testing!
window.store = store;
window.addOrange = addOrange;
window.addApple = addApple;
