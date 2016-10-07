This reading should explain the usage of react-router-redux and include an example of how to use it. 
Note: we are planning on only using the routerMiddleware and the dispatching of push actions to change route paths.

# `react-router-redux`

## Overview

`react-router-redux` is a library that brings the React Router into the Redux world. You can use it to:

+ Dispatch actions that change the state, using a `react-router-redux` middleware.
+ Store your location information in your application state, using a `react-router-redux` reducer.

We will be using it only for the first of these two tasks, and thus we'll only need the `react-router-redux` middleware.

## Details

The `routerMiddleware` that we import from `react-router-redux` calls `history[method](...args)`, where `method` is the action to take (usually `push`) and `...args` is any additional arguments that are passed along (usually `location`).

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