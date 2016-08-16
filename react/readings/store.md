# Store

## Introduction

The **store** is the central element of Redux's architecture. It holds the
global *state* of an application.

It is responsible for:
+ updating an app's state via its *reducer*;
+ broadcasting the state to an application's view layer via *subscription*;
+ listening for *actions* that tell it how and when to change the global state
 of an application.

## Store API

A Redux `store` is not a class. It is just an object that holds the application
state, wrapped in a minimalist API.

#### Store Methods
-`getState()` - Returns the store's current state.
-`dispatch(action)` - Passes an `action` into the store's `reducer` telling it
 what information to update.
-`subscribe(listener)` - Registers callbacks to be triggered whenever the store updates.

## Creating the Store

The `redux` library provides us with a `createStore()` method, which takes up three arguments and returns a Redux `store`:

```js
createStore(reducer, [preloadedState], [enhancer])
```

+	`reducer` (required) - A reducing function that receives the app's current state and incoming actions, determines how to update the store's state, and returns the next state (more on this in a moment).
+ `preLoadedState` (optional) - An `object` representing any application state
 that existed before the store was created.
+ `enhancer` (optional) - A `function` that adds extra functionality to the store.


Here is an example of how to create a store:

```js
// store.js
import { createStore } from `redux`;
import reducer from './reducer.js';

const store = createStore(reducer);
```

## Updating the Store

Store updates are triggered only via dispatched **actions**. An action in Redux
is a POJO with a `type` key that indicate the type of the action being
performed, and optional payload keys that contain new information for the state,
if any.

For example, let's create an fruit stand app that keeps track of an inventory of
fruits. The action below tells our store to add an `'orange'` to the app state's
array of fruits. It has the `action.type` of `'ADD_FRUIT'` and an `action.fruit`
payload of `'orange'`.

```js
// actions.js
const addOrange = {
	type: 'ADD_FRUIT',
	fruit: 'orange'
};

export { addOrange };
```

The only way to trigger a state change is to call `store.dispatch(action)`,
which dispatches an action. Every time `dispatch()` is called, the store calls
its `reducer` giving it the given `action` argument and the current state. Much
more on the `reducer` next, but right now try to understand it as a Redux app's
traffic cop, routing the new information to its rightful place in the state and
defines the store's next state. The `reducer` or *reducing function* is simply a
JavaScript function that takes two arguments the previous `state` and a Redux
`action`, and returns the next `state`.

Let's write a `reducer` for our fruit stand app that responds to actions of type
`'ADD-FRUIT'`:

```js
// reducer.js
const reducer = (state = [], action) {
	switch(action.type) {
		case 'ADD_FRUIT':
			return [
				...state,
				action.fruit
			];
		default:
			return state;
	}
};

export default reducer;
```

**NB**:
-	The reducer's `state` parameter provides a default value; this is
the **initial state** of our store prior to any actions. In this case, it's an
empty array.
-	In Redux, [**the state is immutable**][why-immutable], so the reducer
must return a **new array or object** whenever the state changes.

Now that we've defined our app's reducing function we can now `dispatch` the
`addOrange` action to our `store`:

```js
// store.js
import { createStore } from 'redux';
import reducer from './reducer.js';
import { addOrange } from './actions.js'

const store = createStore(reducer);

store.getState(); // []
store.dispatch(addOrange);
store.getState(); // ['orange']
```

See our *Redux* fruit stand app in action [here][fruit_stand_demo]!

[fruit_stand_demo]:../demos/fruit_stand_demo

## Subscribing to the Store

Once the store has processed a `dispatch()`, it triggers all its subscribers. Subscribers are callbacks that can be added to the store via `subscribe()`.

Let's define a callback `display` and subscribe it to our example's store.

```js
const display = () => {
	console.log(store.getState());
};

store.subscribe(display);
store.dispatch(addOrange); // ['orange', 'orange']
```

In the example above, the store processed the dispatched action and then called
all of its subscribers in response. The only subscriber is our `display`
callback which logs the current state when called.

#### React Components

React components can be kept up-to-date with changes in the application state by
subscribing their `render()` methods to the app's store.

Let's define a React component `FruitStand` that takes the app's store as a prop and subscribes its render method to the store.
```js
// components/fruit_stand.jsx
class FruitStand extends React.Component {
	constructor({ store }) {
		super(store);
		this.store.subscribe(this.render);
	}

	render() {
		const state = this.store.getState();

		return (
			<ul>
				{state.map((fruit, idx) => <li key={idx}>{fruit}</li>)}
			</ul>
		);
	}
};

export default FruitStand;
```

By subscribing our component's `render` method to the store, the store becomes
responsible for re-rendering our component with the updated state whenever
actions are dispatched to it and trigger a change in the app's state. In other
words, `FruitStand` re-renders whenever the store changes.

See our *Redux/React* fruit stand app in action [here][fruit_stand_demo]!

```js
// entry.js
const React = require('react');
const ReactDOM = require('react-dom');
import { createStore } from `redux`;

import FruitStand from './components/fruit_stand';
import reducer from './reducer.js';

const store = createStore(reducer);
ReactDOM.render(
	<FruitStand store={store} />,
	document.getElementById('root')
);
```

## Official Documentation

View the official documentation on the Redux store [here][redux-js].

[redux-js]: http://redux.js.org/docs/basics/Store.html

[why-immutable]: https://github.com/reactjs/redux/issues/758
