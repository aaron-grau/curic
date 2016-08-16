# `react-redux`: `Provider` and `connect()`

So far we have dealt with the `redux` package, which, via `createStore()`,
allows us to create `Store` instances with `dispatch()`, `getState()`, and
`subscribe()` methods. Using these methods alone, we could create a fully-
functional React-Redux application. However, the creators of `redux` also give
us `react-redux`, which is a set of [**bindings**][bindings] simplifying the most common React-Redux interactions.

## Threading Props: An Anti-Pattern

Oftentimes, a deeply nested component will need access to the store, while its parents do not. With vanilla React, those parents nonetheless have to receive the `store` prop, just to pass it down to the child. 

```js

const store = createStore();

const Content = ({store}) => <div>{store.getState().username}/></div> ;
const Header = ({store}) => <div><Content store={store}/></div> ;
const App = ({store}) => <div><Header store={store}/></div> ;

ReactDOM.render(<App store={store}/>, root);

``` 

This is called prop-threading, a tedious and error-prone pattern. We can avoid
it by using the `Provider`/`connect()` API provided by `react-redux`.

## `Provider`: setting `context`

Using `Provider` lets us 'invisibly' pass the store to deeply nested components
without explicit threading.

```js
import { Provider, connect } from 'react-redux';
const store = createStore();

const withProvider = (
	<Provider store={store}>
		<App/>
	</Provider>
);

ReactDOM.render(withProvider, root);
```

Note that the `Provider` is simply a React component in which we wrap the rest
of the application. It receives the `store` as a `prop`. The Provider then sets
a `store` [context][context] (basically, an invisible prop), which is passed down to all of its children. Any children who want to access the `store` context are then able to do so, even without an explicit `store` prop. We'll go into more detail about how this is done in the section below on `connect()`.

If you're confused about context, read through the link above. However, you
don't really need to know exactly how context works to use the `react-redux`
API, so feel free to skip it.

## `connect()`: setting `props`

`react-redux` allows us to access the `store` context in a powerful and convenient way via `connect()`. Using `connect()`, we can pass specific parts of the `store`, as well as specific action-dispatches, to a component's props. Check out its signature: 

```
const connectedComponent = connect(mapStateToProps, mapDispatchToProps, mergeProps, options)(component);

```

### `mapStateToProps`

This argument should be a function that accepts the store's `state` (via the `context.store.getState()` from the `Provider`) and the component's explicitly specified `ownProps` and returns an object to be merged into the component's props: 

```
const mapStateToProps = (state, ownProps) => ({
	fullName: `${state.firstName} ${ownProps.lastName}`
});

```

In the example above, the connected component will receive a `fullName` `prop`, set to the `store.getState().firstName` and `this.props.lastName` combined, in addition to its explicit props. 

### `mapDispatchToProps`

This argument should be a function that accepts the store's `dispatch` method and returns an object containing functions that can be called to dispatch certain actions to the store:

```js
// action creator
const deleteTodo = (todoId) => ({type: "DELETE_TODO", id: todoId})

const mapDispatchToProps = (dispatch, ownProps) => ({
	handleDelete: () => dispatch(deleteTodo(ownProps.id));
})
```

`mapDispatchToProps` can also be written as an object if all the values are set to action creators: 

```js
// action creator
const toggleFilter = () => ({ type: "TOGGLE_FILTER" });

const mapDispatchToProps = { onClick: toggleFilter };
```

The connected component can then call `this.props.onClick()` to `dispatch(toggleFilter())`.

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

Note that `connect()` is a curried function: the component to be connected isn't actually passed into the initial `connect()` call, but instead to the returned result. 

```
const connectedComponent = connect(mapDispatchToProps, mapDispathToProps)(vanillaComponent)

```

## Containers

As you've seen above, there is quite a bit of boilerplate code involved in connecting a component to the store. Putting all this code into the component with heavy rendering logic tends to violate the principle of separation of concerns. Therefore, it's a common pattern in Redux code to create **containers**, components whose sole purpose is to connect **presentational components** to the store.

```js

const List = ({ items }) => {
	const displayItems = items.map((item, idx) => {
		return (
			<Item 
				key={item.name + idx}
				body={item.body}/>
		);
	});
	
}

```



Components that aren't containers are called **presentational components**.  These components rely solely on their props for interacting with store data. 


## Setup

```
npm install --save react-redux
```

```js
import { Provider, connect } from 'react-redux';
```

That's it!


[context]: https://facebook.github.io/react/docs/context.html
[bindings]: https://en.wikipedia.org/wiki/Language_binding
[docs]: https://github.com/reactjs/react-redux/blob/master/docs/api.md#arguments