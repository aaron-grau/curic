# `react-redux`: `Provider` and `connect()`

So far we have dealt with the `redux` package, which, via `createStore()`,
allows us to create `Store` instances with `dispatch()`, `getState()`, and
`subscribe()` methods. Using these methods alone, we could create a fully-
functional React-Redux application. However, the creators of `redux` also give
us `react-redux`, which is a set of [**bindings**][bindings] simplifying the most common React-Redux interactions.

## Threading Props: An Anti-Pattern

Because the store represents the universal app state, almost all of your major components will need to have access to it: 

```js

store = createStore();

const App = ({store}) => (
);

const Parent = ({store}) => (
);

const Child = ({store}) => (
);

<App store={store}>
	<Parent store={store}>
		<Child store={store}/>
	</Parent>
</App>

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