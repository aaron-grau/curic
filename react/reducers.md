# Reducers

## Overview

As you saw in the [Store][store] reading, the store has a reducer that **receives actions**, and **updates the state appropriately** (by returning a new object if changes are made).

Recall the reducer from that reading:

```
// reducer.js

import merge from 'lodash';

const reducer = (state = {}, action) {

	switch(action.type){
		case "ADD_FRUIT":
			let nextState = merge({}, state); // deeply duplicates the state
			if (!nextState[action.fruit]) nextState[action.fruit] = 0;
			return ++nextState[action.fruit];
		default: 
			return state;
	}
};

```

As we create new actions for our reducer, we can update our reducer to handle them:

```
const reducer = (state = {}, action) {

	switch(action.type){
		case "ADD_FRUIT":
			let nextState = merge({}, state); // deeply duplicates the state
			if (!nextState[action.fruit]) nextState[action.fruit] = 0;
			return ++nextState[action.fruit];
		case "REMOVE_FRUIT":
			if (!state[action.fruit] || state[action.fruit] <= 0 ) {
				throw "cannot remove non-existent fruit";
			}
			let nextState = merge({}, state);
			return --nextState[action.fruit];
		default: 
			return state;
	}

};

```

## Immutable State

One tricky thing about reducers is taking care not to alter the state in place but to instead emit a new object if anything changes. [Here's why][why-immutable].

```
	// Good
	const goodReducer = (state, action){
		nextState = merge({}, state);
		nextState.property++;
		return nextState;
	};
	// Bad
	const badReducer = (state, action){
		state.property++;
		return state;
	};

```

## Combining Reducers

Now say we now want to handle some completely different types of actions like
`"HIRE_FARMER"` and `"FIRE_FARMER"` which receive `farmer` objects instead of
`fruit`. We could add more cases to our reducer, but eventually this becomes
unwieldy. The solution is to split our `reducer` into separate `fruits` and
`farmers` reducers.

```js

const fruits = (state = {}, action) {

	switch(action.type) {
		case "ADD_FRUIT":
			let nextState = merge({}, state); // deeply duplicates the state
			if (!nextState[action.fruit]) nextState[action.fruit] = 0;
			return ++nextState[action.fruit];
		case "REMOVE_FRUIT":
			if (!state[action.fruit] || state[action.fruit] <= 0 ) {
				throw "cannot remove non-existent fruit";
			}
			let nextState = merge({}, state);
			return --nextState[action.fruit];
		default: 
			return state;
	}

};

const farmers = (state = {}, action ) {
	switch(action.type) {
		case "HIRE_FARMER": 
			nextState = merge({}, state);
			return nextState[action.farmer.id] = action.farmer;
		case "FIRE_FARMER":
			nextState = merge({}, state);
			delete nextState[action.farmer.id];
			return nextState;
		default:
			return state;
	}
};

```

To add these reducers back into our store, we need to combine them into a single
reducer using `combineReducers()` from the `redux` package, passing it an object
that maps state keys (pointing to 'slices' of state) to the reducers that
should handle them.

```js
const reducer = combineReducers({
	fruits: fruitsReducer,
	farmers: farmersReducer
})

const store = createStore(reducer);
store.getState(); // {fruits: {}, farmers: {}};
```

## Delegating to Reducers

A reducer may also call a different reducer to handle slices of its own state:

```js
const farmers = (state = {}, action ) {
	switch(action.type) {
		case "HIRE_FARMER": 
			nextState = merge({}, state);
			return nextState[action.farmer.id] = farmer(action.farmer, action);
		case "FIRE_FARMER":
			nextState = merge({}, state);
			delete nextState[action.farmer.id];
			return nextState;
			break;
		case "UPDATE_FARMER_NAME": 
		case "INCREMENT_FARMER_AGE":
			nextState = merge({}, state);

			// calls the 'lesser' reducer to handle individual farmer updates
			nextState[action.farmer.id] = farmer(action.farmer, action); 

			return nextState;
			break;
		default:
			return state;
	}
};

const farmer = (state = {}, action) {
	switch(action.type){
		case "UPDATE_FARMER_NAME": 
			nextState = merge({}, state);
			return nextState;
			break;		
		case "INCREMENT_FARMER_AGE": 
			nextState = merge({}, state);
			nextState.age++;
			break;
		default;
			return state;
	}
};

```

## Official Documentation

You can find more documentation on reducers [here][redux-js].

[redux-js]: http://redux.js.org/docs/basics/Reducers.html
[why-immutable]: https://github.com/reactjs/redux/issues/758
[store]: store.md