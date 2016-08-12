# Reducers

As you saw in the [Store][store] reading, the store has a reducer that receives actions and then updates the state appropriately. Recall the reducer from that reading:

```
// reducer.js

import merge from 'lodash';

const reducer = (state = {}, action) {

	switch(action.type){
		case "ADD_FRUIT":
			let nextState = merge({}, state); // deeply duplicates the state
			if (!nextState[action.fruit]) nextState[action.fruit] = 0;
			return nextState[action.fruit]++;
		default: 
			return state;
	}

};

```

As an app grows more complex, the reducer quickly gets bloated:

```
	const reducer = (state = {}, action) {

	switch(action.type){
		case "ADD_FRUIT":
			let nextState = merge({}, state); // deeply duplicates the state
			if (!nextState[action.fruit]) nextState[action.fruit] = 0;
			return nextState[action.fruit]++;
		default: 
			return state;
	}

};

```

[store]: store.md