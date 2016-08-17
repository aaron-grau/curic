# Reducers

## Overview

As you saw in the [Redux store][store] reading, the store has a reducing
function called the **reducer** that:
+ receives the current `state` and an `action`;
+ updates the state appropriately given the `action.type`;
+ and returns the next state.

Recall the reducer from that our fruit stand app:
```js
// reducer.js
const reducer = (state = [], action) => {
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

Remember, the store calls its reducer with an `undefined` state the first time,
which is why we use ES6 default arguments to define the state's initial state.
The previous `state` is returned if no `switch` cases match the `action.type`,
else the reducing function returns the updated state.

In the above example, our initial state is defined as an empty array. The
`reducer` returns the updated state as a new array with `action.fruit` appended
to the end of the previous `state` if `action.type` is `ADD_FRUIT`, else it
returns the previous `state`.

Let's update our fruit stand app's `reducer` to handle a few more actions:
+ `ADD_FRUITS` - Add an array of fruits to our inventory of fruits.
+ `SELL_FRUIT` - Remove the first instance of a fruit if available.
+ `SELL_OUT` - Someone bought your whole inventory of fruit! Return an empty array.

```js
// reducer.js
const reducer = (state = [], action) {
	switch(action.type){
		case "ADD_FRUIT":
			return [
				...state,
				action.fruit
			];
		case "ADD_FRUITS":
			return [
				...state,
				...action.fruits
			];
		case "SELL_FRUIT":
			const idx = state.indexOf(action.fruit);
			if (idx !== -1) { // remove first instance of action.fruit
				return [
					...state.slice(0, idx),
					...state.slice(idx + 1)
				];
			}
			return state; // if action.fruit is not in state, return previous state
		case "SELL_OUT":
			return [];
		default:
			return state;
	}
};
```

## Immutable State

Inside a Redux reducer, you must never mutate its arguments (i.e. `state` and `action`). **Your reducer must return a new object if the state changes**. [Here's why][why-immutable].

Here's an example of a good reducer which uses [lodash][lodash-reading]'s merge function to deeply dup an object:
```js
import merge from 'lodash/merge';

const goodReducer (state, action) => {
	nextState = merge({}, state);
	nextState.property++;
	return nextState;
};
```

and a bad one:
```js
const badReducer (state, action) => {
	state.property++;
	return state;
};
```

[lodash-reading]:./lodash.md

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
