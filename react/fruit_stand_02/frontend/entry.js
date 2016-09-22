const React = require('react');
const ReactDOM = require('react-dom');

import store from './store/store';
import Root from './components/root';

ReactDOM.render(
	<Root store={store} />,
	document.getElementById('root')
);

/* for dispatching actions that trigger re-renders! */
import { addFruit, addFruits, sellFruit, sellOut } from './actions/fruits_actions';

window.store = store;
window.addFruit = addFruit;
window.addFruits = addFruits;
window.sellFruit = sellFruit;
window.sellOut = sellOut;
