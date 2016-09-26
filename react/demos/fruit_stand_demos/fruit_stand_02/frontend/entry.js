import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import { addOrange, addApple, clearFruit } from './actions';

// TODO just for testing!
window.store = store;
window.addOrange = addOrange;
window.addApple = addApple;
window.clearFruit = clearFruit;


import FruitStandContainer from './components/fruit_stand_container';

const App = () => (
	<Provider store={store}>
		<FruitStandContainer/>
	</Provider>
);

document.addEventListener("DOMContentLoaded", () => {
	ReactDOM.render(
		<App />,
		document.getElementById('root')
	);
});
