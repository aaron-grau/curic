# Store

## Introduction 

The store is the central element of Redux's architecture. It represents the
global **state** of an application's data (apart from the router), and is
responsible for updating that information (via its **reducer**) as well as
broadcasting it to the application's view layer (via **subscription**). The
store listens for **actions** that tell it how and when to change the
application state.

## Store API

A `Store` is basically just an object that holds the application state, wrapped
in a minimalist API:

-`getState()`: Returns an object representing the store's current state. 
-`dispatch(action)`: Passes an `action` into the store's reducer, telling it what 
information to update.
-`subscribe(listener)`: Registers callbacks to be triggered whenever the store updates. 

## Creating the Store

The `redux` library provides us with a `Store` constructor method: `createStore()`,
which accepts three arguments: 

-	`reducer` (required): a `function` that receives incoming actions and determines 
how to update the store's state.
- `preLoadedState` (optional): an `object` representing any application state that 
existed before the store was created.
- `enhancer` (optional): a `function` that adds extra functionality to the store.

```js
	import { createStore() } from `redux`;
	import reducer from './reducer.js'; // we'll write this in a moment

	const store = createStore(reducer, preLoadedState, enhancer);

```

## Updating the Store

Store updates are triggered via **Actions**. An action is represented in Redux
by a POJO with a `type` key, indicating the nature of the action, and optional
**payload** keys that contain the new information, if any. Say we want to add an orange to our `store`; we'd represent it thusly:

```js
	const addOrange = {
		type: "ADD_FRUIT",
		fruit: "orange"
	}
```

Every time a `dispatch()` is made, the store runs the `action` received through
its `reducer` function, which basically acts as a traffic cop, routing the new
information to its rightful place. Remember that, because [the state is immutable][why-immutable], the reducer must return a **new object** if the state will change. Let's write our reducer now:

```js

import merge from 'lodash';

const reducer = (state = {}, action) {

	let nextState = merge({}, state); // deeply duplicates the state

	switch(action.type){
		case "ADD_FRUIT":
			if (!nextState[action.fruit]) nextState[action.fruit] = 0;
			return nextState[action.fruit]++;
		default: 
			return state;
	}

}

export default reducer;

```

Note that the reducer's `state` parameter provides a default value; this will be
the initial state of our store, prior to any actions. In this case, it's an
empty object.

With our reducer in place, we can now dispatch the `addOrange` action to our 
`store`: 

```js
store.getState(); // {}
store.dispatch(addOrange);
store.getState(); // { orange: 1 }
```

## Connecting to the Store


[why-immutable]: https://github.com/reactjs/redux/issues/758
