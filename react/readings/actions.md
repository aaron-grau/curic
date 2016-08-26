# Actions

As you've already learned from the [Redux store reading][store], **actions** are
the only way for view components to trigger changes to the store. Remember,
actions are simple POJOs with a mandatory `type` key and optional payload keys containing new information. They get sent using `store.dispatch()` and are the
primary drivers of the Redux loop.

## Action Creators

When an action is dispatched, any new state data must be passed along as the
**payload**:

```js
const addOrange = {
	type: "ADD_FRUIT",
	fruit: "orange"
};

store.dispatch(addOrange);
store.getState(); // [ 'orange' ]
```

However, when these action payloads are generated dynamically, it becomes
necessary to extrapolate the creation of the action object into a function.
These functions are called **action creators**. To initiate a dispatch, you
pass the result of calling an action creator to `store.dispatch()`.

For example:
```js
// actions.js
const addFruit = (fruit) => ({
	type: "ADD_FRUIT",
	fruit
});
```

Now we can add any `fruit` to the store using our action creator
`addFruit(fruit)`, instead of having to define an action object for each fruit.

```js
store.dispatch(addFruit("Apple"));
store.dispatch(addFruit("Strawberry"));
store.dispatch(addFruit("Lychee"));
store.getState(); // [ 'orange', 'apple', 'strawberry', 'lychee' ]
```

## Official Documentation

View the official documentation [here][redux-js]

[redux-js]: http://redux.js.org/docs/basics/Actions.html

[store]: store.md
