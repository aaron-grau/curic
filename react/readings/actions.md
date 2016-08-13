# Actions

As you've already learned from the [Store reading][store], actions are the
primary drivers of the Redux loop. Though at their core they are simple objects,
actions require some additional infrastructure that is worth discussing.

## Action Creators

When an action is created, the new state data must be passed along inside of it.

```js
const addOrange = {
	type: "ADD_FRUIT",
	fruit: "orange"
};

dispatch(addOrange);

```

When the data to be inserted is going to be generated dynamically, it becomes useful to extrapolate the creation of the action object into a function: 

```js
const addFruit = (fruit) => ({
	type: "ADD_FRUIT",
	fruit
});

dispatch(addFruit('strawberry'));

``` 

Such functions are called Action Creators. Now we can add any `fruit` using
`addFruit()`, instead of having to define an action object for each `fruit`.

## Official Documentation

View the official documentation [here][redux-js]

[redux-js]: http://redux.js.org/docs/basics/Actions.html

[store]: store.md