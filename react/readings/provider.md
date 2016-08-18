# `react-redux`: `<Provider/>`

So far we have dealt with the `redux` package, which, via `createStore()`,
allows us to create `store` objects with `dispatch()`, `getState()`, and
`subscribe()` methods. Using these methods alone, we could create a fully-
functional React-Redux application. However, the creators of `redux` also give
us `react-redux`, a node package with [**bindings**][bindings] simplifying the most common React-Redux interactions.

## Setup

```
npm install --save react-redux
```

```js
import { Provider } from 'react-redux';

```

## Threading Props: An Anti-Pattern

Oftentimes, a deeply nested component will need access to the store, while its
parents do not. With vanilla React, those parents nonetheless have to receive
the `store` prop in order to pass it down to the child. Consider the example below:

```js

// entry.jsx

const store = createStore();

const Content = ({store}) => <div>{store.getState().username}/></div> ;
const Header = ({store}) => <div><Content store={store}/></div> ;
const App = ({store}) => <div><Header store={store}/></div> ;

ReactDOM.render(<App store={store}/>, root);

```

The store is created in the entry file, but the `Content` component that needs
to access it is deeply nested. As a result, the store must be passed as a prop
down the entire component tree, even through components such as the `Header`
that do not use it themselves.

This pattern, called prop-threading, is tedious and error-prone. We can avoid
it by using the `Provider`/`connect()` API provided by `react-redux`.

## `Provider`: setting `context`

Using the `Provider` component given to us by `react-redux` lets us 'invisibly'
pass the store to deeply nested components without explicit threading.

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
a `store` `context` (basically, an invisible prop), which is passed down to all
of its children. Because we typically wrap the entire `App` in the Provider, all
our components will receive the store context. 

Components that need to access the store context will have to `connect()`, which converts the `store` context to into a `store` prop. We'll discuss how `connect()` works in the next reading.

Note: If you're confused about `context`, you can check out the
[official documentation][context]. However, you don't really need to know exactly how it works to use the `react-redux` API, so feel free to skip it.

[context]: https://facebook.github.io/react/docs/context.html
[bindings]: https://en.wikipedia.org/wiki/Language_binding
