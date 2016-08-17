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

Here's an example of a *bad* reducer which mutates the previous state.
```js
// bad reducer
const reducer = (state = { count: 0 }, action) => {
	switch (action.type) {
		case "INCREMENT_COUNTER":
			state.count++;
			return state;
		default:
			return state;
	}
};
```

and here's an example of a good one which uses [lodash][lodash-reading]'s merge function to create a deep dup of the previous `state`:
```js
// good reducer
import merge from 'lodash/merge';

const reducer = (state = { count: 0 }, action) => {
	switch (action.type) {
		case "INCREMENT_COUNTER":
			let nextState = merge({}, state);
			nextState.count++;
			return nextState;
		default:
			return state;
	}
};
```

[lodash-reading]:./lodash.md

## Combining Reducers

Now say our fruit stand is extremely successful and it grows so much that we
need multiple farmers helping us. Our app's state will need to grow to store not
only an array of `fruits` but also a `farmers` object.

Here's a sample state tree of our new app:

```js
{
	farmers: {
		"1": {
			id: 1,
			name: "Ol' McDonald",
			paid: false,
		},
		"2": {
			id: 2,
			name: "Rabbit",
			paid: true
		}
	},
	fruits: [
		"orange",
		"orange",
		"apple",
		"lychee",
		"grapefruit"
	]
}
```

Our app will also need to handle new types of actions like `"HIRE_FARMER"` and
`"PAY_FARMER"` and update the `farmers` slice of our state. We could add more
cases to our reducer, but eventually this becomes unwieldy. The solution is to
split our `reducer` into separate `fruits` and `farmers` reducers.

Sometimes state fields depend on one another, other times we can easily split
updating a state field into a separate function. This is called **reducer
composition**, and it is the fundamental pattern of building Redux apps. When we
have state fields that are independent of each other, we split the reducer into
multiple reducers that each handle their own slices of the state. Thus the
`state` param is different for each reducer; it corresponds only to the part of
the state manages. Each reducer is defined in its own file, keeping them
completely independent and managing different slices of the state.

Let's split up our popular fruit stand app's `reducer` into two reducers:
+ `fruits` - A reducing function that handles actions updating the `fruits` slice of our app state.
+ `farmers` - A reduction function that handles actions updating the new `farmers` slice of our app state.

```js
// reducers/fruits_reducer.js
const fruitsReducer = (state = [], action) {
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
			if (idx !== -1) {
				return [
					...state.slice(0, idx),
					...state.slice(idx + 1)
				];
			}
			return state;
		case "SELL_OUT":
			return [];
		default:
			return state;
	}
};

export default fruitsReducer;
```

```js
// reducers/farmers_reducer.js
const farmersReducer = (state = {}, action ) {
	switch(action.type) {
		case "HIRE_FARMER":
			let nextState = merge({}, state); // deeply dup previous state
      const farmer = { // create new farmer object
        id: action.id,
        name: action.name,
        paid: false
      };
			nextState[action.id] = farmer; // add new farmer to state
			return nextState;
		case "PAY_FARMER":
			let nextState = merge({}, state);
			let farmer = nextState[action.id];
			farmer.paid = !farmer.paid;
			return nextState;
		default:
			return state;
	}
};

export default farmersReducer;
```

However, our Redux store constructor `createStore()` only takes one `reducer`
argument. So we must combine our reducers into one reducer that gets passed to
our store. To do this we call `combineReducers()` from the `redux` package and
pass it an object that maps state keys to the reducers that handle those slices
of state. It returns a root `reducer` that you can use to create your app store.

```js
// reducers/root_reducer.js
import { combineReducers } from 'redux';
import fruitsReducer from './fruits_reducer';
import farmersReducer from './farmers_reducer';

const reducer = combineReducers({
	fruits: fruitsReducer,
	farmers: farmersReducer
})

export default reducer;
```

```js
// store.js
import { createStore } from 'redux';
import reducer from './reducers/root_reducer.js';

const store = createStore(reducer);

// initial state
store.getState(); // { fruits: [], farmers: {} }
```

## Delegating to Reducers

A reducer may also call a different reducer to handle slices of its own state:

```js
// reducers/farmers_reducer.js
const farmersReducer = (state = {}, action ) {
	switch(action.type) {
		case "HIRE_FARMER":
			let nextState = merge({}, state);
			nextState[action.id] = farmerReducer(undefined, action);
			return nextState;
		case "PAY_FARMER":
			let nextState = merge({}, state);
			nextState[action.id] = farmerReducer(nextState[action.id], action)
			return nextState;
		default:
			return state;
	}
};

const farmerReducer = (state, action ) { // state is a farmer object
	switch(action.type) {
		case "HIRE_FARMER":
			return ({
        id: action.id,
        name: action.name,
        paid: false
      };
		case "PAY_FARMER":
      state.paid = !state.paid;
      return state;
		default:
			return state;
	}
};

export default farmersReducer;
```

## Official Documentation

You can find more documentation on reducers [here][redux-js].

[redux-js]: http://redux.js.org/docs/basics/Reducers.html
[why-immutable]: https://github.com/reactjs/redux/issues/758
[store]: store.md
