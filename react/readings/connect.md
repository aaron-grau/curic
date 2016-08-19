## `react-redux`: `connect()`

`react-redux` allows us to access the store `context` set up by the
[`Provider`][provider] in a powerful and convenient way via `connect()`. Using
`connect()`, we can pass specific slices of the store's state, as well as
specific action-dispatches, to a component as props. The component's props then
serve as its API to the store, making it more modular and less burdened
by Redux boilerplate.

## A Model for Understanding

`connect()` is a higher-order function that ultimately accepts a React component and then returns a new component that wraps around the component passed in. The new component serves as the interface between the store `context` given by the `Provider` and the wrapped component's props. Review the following snippet as a mental model (it's not technically correct):

```js

// Note: This pseudo-code is for illustration purposes only.

const connectedComponent = connect(...args)(Component);

// Think of `connectedComponent` as doing the following: 

ConnectedComponent = (props, context) => (
	<Component store={context.store}/>
)

```

## Signature

Because `connect()` is a higher-order function (it returns a function), it accepts two sets of arguments. Check out its signature:

```js
const connectedComponent = connect(mapStateToProps, mapDispatchToProps, mergeProps, options)(component);

// 
```

Let's examine the arguments in detail.

## `mapStateToProps`

This argument is a function that tells the connected component how to transform the `state` into the basic (presentational) component's props. 

It must accept the store's `state` (via the `Provider's store `context`) and
return an object containing the props to be given to the presentational
component. 

```
const Component = ({name}) => <div>{name}</div>;

const mapStateToProps = (state) => ({
	name: state.name;
});

const connectedComponent = connect(mapStateToProps)(Component);

```
In the example above, the `connectedComponent` passes `name` as a prop to the
`Component`. When `connectedComponent` is rendered, all we see is the
`Component`, with the proper props automatically taken from the store.

### `ownProps`

A component with explicit props passed down from its parent `<Component lastName={'Wozniak'}/>` can also merge those props with the `state ` via the second, `ownProps`, argument to `mapStateToProps`:

```
const mapStateToProps = (state, ownProps) => ({
	fullName: `${state.name} ${ownProps.lastName}`
});

connectedComponent = connect(mapStateToProps)(Component);

```

In the example above, the `Component` will receive a `fullName` prop via `connect()`, in addition to its explicit `lastName` prop.

## `mapDispatchToProps`

`mapDispatchToProps` is the second parameter of `connect()`. It is a function
that accepts the store's `dispatch` method and returns an object containing
functions that can be called to dispatch actions to the store. Those functions
are then passed as props to the connected Component.

```js
// action creator
const deleteTodo = (id) => ({ type: "DELETE_TODO", id });

const mapDispatchToProps = (dispatch, ownProps) => ({
	handleDelete: () => dispatch(deleteTodo(ownProps.id));
})
```

### `mergeProps` (optional)

This rarely-used optional argument is a function used to merge the result of `mapStateToProps` and `mapDispatchToProps` into a single set of props to be given to the object.

```
const mergeProps = (stateProps, dispatchProps) => {
// define mergedProps
return mergedProps;
}

```

### `options` (optional)

This even more rarely used argument allows you to configure how `connect()` works.

Read [here][docs] for more information.

### `component`

The `component` to be connected is passed to the function returned by `connect()`.

```
const connectedComponent = connect(mapDispatchToProps, mapDispatchToProps)(component)

```

[docs]: https://github.com/reactjs/react-redux/blob/master/docs/api.md#arguments
[provider]: provider.md
