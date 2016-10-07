# `react-router-redux`

## Overview

`react-router-redux` is a library that brings the React Router into the Redux cycle. You can use it to:

+ Issue navigation events via Redux actions, using a `react-router-redux` middleware.
+ Store the current location in your application state, using a `react-router-redux` reducer.

We will be using it only for the first of these two tasks, and thus we'll only need the `react-router-redux` middleware.

## Details

The `routerMiddleware` that we import from `react-router-redux` calls `history[method](...args)`. Typically, that looks like `history.push(location)`, because `method` (the action to take) is usually `push` and `...args` (any additional arguments that are passed along) are usually just `location`.

We are using this library simply to allow us to issue navigation events via Redux actions. The same functionality could be accomplished several other ways, including `hashHistory.push(location)`, `this.props.router.push(location)`, and `this.context.router.push(location)`.

## Usage

We'll need to add the `react-router-redux` middleware to our RootMiddleware:

```js
// middlewares/root_middleware.js

import { routerMiddleware } from 'react-router-redux';
import { hashHistory } from 'react-router';

const RootMiddleware = applyMiddleware(
  // ...
  routerMiddleware(hashHistory)
);

export default RootMiddleware;
```

Once we've done that, whenever we want to change the page's URL, we can use the `push` action creator from `react-router-redux`:

```js
// components/todo_container.js

import { push } from 'react-router-redux';

// ...

const mapDispatchToProps = (dispatch) => ({
  // ...
  push: location => dispatch(push(location))
});
```