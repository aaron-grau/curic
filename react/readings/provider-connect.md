# `react-redux`: `Provider` and `connect()`

So far we have dealt with the `redux` package, which, via `createStore()`,
allows us to create `Store` instances with `dispatch()`, `getState()`, and
`subscribe()` methods. Using these methods alone, we could create a fully-
functional React-Redux application. However, the creators of `redux` also give
us `react-redux`, which is a set of [**bindings**][bindings] simplifying the most common React-Redux interactions.

## Setup

```
npm install --save react-redux
```

```js
import { Provider, connect } from 'react-redux';
```

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

That's it!

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
a `store` [context][context] (basically, an invisible prop), which is passed
down to all of its children. Any children who want to access the `store` context
are then able to do so, even without an explicit `store` prop. We'll go into
more detail about how this is done in the section below on `connect()`.

If you're confused about `context`, read through the link above. However, you
don't really need to know exactly how it works to use the `react-redux`
API, so feel free to skip it.

## `connect()`: setting component `props`

`react-redux` allows us to access the `store` context in a powerful and convenient way via `connect()`. Using `connect()`, we can pass specific slices of the store's state, as well as specific action-dispatches, to a component's props. The component's props then serve as its API to the store, making it more modular less burdened by Redux boilerplate. 

## Using `connect()`

Connect is a curried function that ultimately returns a React component. Check out its signature: 

```
const connectedComponent = connect(mapStateToProps, mapDispatchToProps, mergeProps, options)(component);

```

Let's examine the arguments in detail.

### `mapStateToProps`


#### Slicing state

This argument should be a function that accepts the store's `state` (via the `context.store.getState()` from the `Provider`) and can set the connected component's props to specific slices of the state: 

```
const mapStateToProps = (state) => ({
	name: state.name;
});
```

In the example above, the component returned by `connect(mapStateToProps)` will
receive a `name` prop in addition to its regular props.

#### Merging Props

A component with regular props (ex. `<Component lastName="Props"/>`),
`mapStateToProps` can also merge the state with the component's `ownProps` to produce new props via `mapStateToProps`:

```
const mapStateToProps = (state, ownProps) => ({
	fullName: `${state.name} ${ownProps.lastName}`
});

```

In the example above, the connected component will receive a `fullName` prop in
addition to its explicit props.

### `mapDispatchToProps`

This argument should be a function that accepts the store's `dispatch` method and returns an object containing functions that can be called to dispatch  actions to the store:

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
// components/list.js

const List = ({ items, resetItems }) => {
	const displayItems = items.map((item, idx) => {
		return (
			<Item 
				key={item.name + idx}
				body={item.body}
				/>
		);
	});

	return (
		<div>
		<h1 onClick={resetItems}>Click to Reset</h1>
		{displayItems}
		</div>
		)
};

export default List;
```

```js
// components/containers/list_container.js

import List from '../list';
import { connect } from 'react-redux';
import { resetItems } from '../../actions/items'
const mapStateToProps = (state) => {
	items: state.items
}

const mapDispatchToProps = (dispatch) => {
	resetItems: dispatch(resetItems);
}

const ListContainer = connect(mapStateToProps, mapDispatchToProps)(List);
export default ListContainer;
```

```js
// entry.jsx
import { Provider } from 'react-redux';
import reducer from 'reducers/index';
import ListContainer from 'components/containers/list_container';

const store = createStore(reducer);

ReactDOM.render(<Provider store={store}><ListContainer/></Provider>, root);

```

## Choosing Containers

Not every component needs to be connected to the store. Generally, you will only want to create containers for the 'big' components in your app that represent sections of a page and contain many small, purely presentational components. Container components are responsible for mapping state and dispatch props for all their presentational children. Use your best judgement, but in general, aim to have fewer containers rather than more. 

## Official Documentation

Learn more about the `react-redux` API [here][docs].

[context]: https://facebook.github.io/react/docs/context.html
[bindings]: https://en.wikipedia.org/wiki/Language_binding
[docs]: https://github.com/reactjs/react-redux/blob/master/docs/api.md#arguments