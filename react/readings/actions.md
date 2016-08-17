# Actions

As you've already learned from the [Redux store reading][store], **actions** are
the only source of information from your application for the store. Remember,
actions are simply POJO the must have a `type` property to indicate the type of
action being performed. They get sent using `store.dispatch()` and are the
primary drivers of the Redux loop.

## Action Creators

When an action is dispatched, any necessary new state data must be passed along as *payloads*. Like so:

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
store.dispatch(addApple("Apple"));
store.dispatch(addFruit("Strawberry"));
store.dispatch(addFruit("Lychee"));
store.getState(); // [ 'orange', 'apple', 'strawberry', 'lychee' ]
```

## Official Documentation

View the official documentation [here][redux-js]

[redux-js]: http://redux.js.org/docs/basics/Actions.html

[store]: store.md
