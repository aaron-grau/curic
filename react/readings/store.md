# Store

## Introduction 

The store is the central element of Redux's architecture. It represents the
global **state** of an application's data (apart from the router), and is
responsible for updating that information (via its **reducer**) as well as
broadcasting it to the application's view layer (via **subscription**). The
store listens for **actions** that tell it how and when to change the
application state.

## Store API

A `Store` is basically just a POJO that holds the application state, wrapped in a minimalist API:

-`getState()`: Returns an object representing the store's current state. 
-`dispatch()`: Passes an `action` into the store's reducer, telling it what 
information to update.
-`subscribe()`: Registers callbacks to be triggered whenever the store updates. 

## Creating the Store

The `redux` library provides us with a `Store` constructor method: `createStore()`,
which accepts three arguments: 

-	`reducer` (required): a `function` that receives incoming actions and determines how 
and to update the store's state.
- `preLoadedState` (optional): an `object` representing any application state that existed before the store was created.
- `enhancer` (optional): a `function` that adds extra functionality to the store.

Let's make a store that will keep track of a bakery's inventory.

```js
	import { createStore() } from `redux`;

	const bakery = createStore(reducer, preLoadedState, enhancer);
```

## Updating the Store

Store updates are triggered via **Actions**. An action is represented by a POJO with a `type` key, indicating the nature of the action, and optional **payload** keys that contain the new information, if any.

```
	const addGreenSweater = {
		type: "ADD_CLOTHING_ITEM",
		garmentType: "shirt",
		color: "green"
		id: 1
	}
```

Every time a `dispatch()` is made, the store runs the `action` received through its `reducer` function, which basically acts as a traffic cop, routing the new information to its rightful place.



## Connecting to the Store





`createStore()` has three parameters: 

- `reducer` (mandatory): This is a function that governs how the store will update its the various `slices` of its state. A store for handling a To-Do list, might, for example, have a 


## A Simple Example

