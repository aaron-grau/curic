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

const App = ({store}) => (
	<div>
		<Parent store={store}/>
	</div>
);

const Parent = ({store}) => (
	<div>
		<Child store={store}/>
	</div>
);

const Child = ({store}) => (
	<div>
	{store.getState().text}
	</div>
);

ReactDOM.render(<App/>, root);


```




Each part of

## React Context, briefly



## Setup

```
npm install --save react-redux
```

```js
import { Provider, connect } from 'react-redux';
```

That's it!


[bindings]: https://en.wikipedia.org/wiki/Language_binding