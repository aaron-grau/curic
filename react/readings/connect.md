# `react-redux`: `connect()`

The `react-redux` package allows us to access the store `context` set by the
[`Provider`][provider] in a powerful and convenient way via the `connect()`
method.  Using `connect()`, we can pass specific slices of the store's state
and specific action-dispatches to a React component as `props`. A component's
`props`  then serve as its API to the store, making it more modular and less
burdened by Redux boilerplate.

## A Model for Understanding

`connect()` is a higher-order function that takes some `args` and returns a function that accepts a React `Component` and returns `Component` wrapped in a new React component. This new component serves as the interface between the store `context` set by the `Provider` and the wrapped component's `props`.

Review the following snippet as a mental model (it's not technically correct):

```js
// NB: This pseudo-code is for illustration purposes only.
const ConnectedComponent = connect(...args)(Component);

// Think of `ConnectedComponent` as being equivalent to the following:
ConnectedComponent = (props, context) => (
	<Component store={context.store} />
)
```

## Signature

Because `connect()` is a *higher-order function* (i.e. it returns a function), it accepts two sets of arguments. Let's see how it's called:

```js
const ConnectedComponent = connect(
	mapStateToProps,
	mapDispatchToProps,
	[mergeProps],
	[options]
)(Component);
```

Let's examine the arguments in detail.

## `mapStateToProps(state, [ownProps])`

This first argument is a function `mapStateToProps` that tells the wrapping
component how to map the `state` into the connected `Component`'s `props`
object.

It must take as an argument the store's `state` (via the `Provider`'s store
`context`) and return an object containing the props specified by the
`Component`.

```js
const Component = ({ name }) => ( // destructure props
	<div>{name}</div>
);

const mapStateToProps = (state) => ({ // maps slice of state to props object
	name: state.name;
});

const ConnectedComponent = connect(mapStateToProps)(Component);
```
In the example above, the `ConnectedComponent` passes `name` as props to the
`Component`. When `ConnectedComponent` is rendered, all we see is the
`Component`, with the slice of state taken from the store.

### `ownProps` (optional)

A component with explicit props passed down from its parent (e.g. `<Component lastName={'Wozniak'}/>`) can also merge those props with the `state ` via a second optional argument `ownProps` to `mapStateToProps`:

```js
const mapStateToProps = (state, ownProps) => ({
	firstName: state.name,
	initials: `${state.name[0]}. ${ownProps.lastName[0]}.`
});

ConnectedComponent = connect(mapStateToProps)(Component);
```

In the example above, the `Component` will receive two addition props (`firstName` and `initials`) via `connect()`, in addition to its explicit `lastName` prop.

## `mapDispatchToProps`

`mapDispatchToProps` is the second parameter of `connect()`. It is a function
that accepts the store's `dispatch` method and returns an object containing
functions that can be called to dispatch actions to the store. These action
dispatchers are then passed as props to the connected `Component`.

```js
const deleteTodo = (id) => ({ type: "DELETE_TODO", id }); // action creators
const addTodo = (msg) => ({ type: "ADD_TODO", msg });

const mapDispatchToProps = (dispatch) => ({
	handleDelete: (id) => dispatch(deleteTodo(id)),
	handleAdd: (msg) => dispatch(addTodo(msg))
});
```

### `mergeProps` (optional)

This rarely-used optional argument is a function used to merge the result of `mapStateToProps` and `mapDispatchToProps` into a single set of props to be given to the object.

```js
const mergeProps = (stateProps, dispatchProps) => {
	// defining mergedProps...
	return mergedProps;
}
```

### `options` (optional)

This even more rarely used argument allows you to configure how `connect()` works.

Read [here][docs] for more information.

### `Component`

The `Component` to be connected is passed to the function returned from calling
`connect()`.

```js
const ConnectedComponent = connect(
	mapStateToProps,
	mapDispatchToProps
)(component);
```

`ConnectedComponent` serves as the interface between the store `context` set by the `Provider` and the wrapped component's `props`.

[docs]: https://github.com/reactjs/react-redux/blob/master/docs/api.md#arguments
[provider]: provider.md
