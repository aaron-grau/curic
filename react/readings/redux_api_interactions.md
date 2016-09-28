# API Interactions in Redux

AJAX requests are handled in a Redux application by middleware. Like everything
else in Redux, AJAX requests and responses are signified by dispatching
actions to the store. We'll write middleware to handle and trigger the appropriate actions.

## Creating an API Utility

The most basic step to setting up an AJAX framework is to create a utility file
that exports methods that we can call to make requests to the API.

```js
// utils/cat_api_util.js

export const fetchCats = (success, error) => {
	$.ajax({
		url: 'http://api.cats.com/all',
		method: 'get',
		success,
		error
	});
}

```

In the example above, we define and export a  `fetchCats()` method that hits our
API. `fetchCats()` arguments are the success and error functions of the `$.ajax`
call. We'll import this file into our middleware where we can then pass success
and error callbacks that trigger appropriate dispatches to our store. Note that
because the callbacks are passed in as arguments, the API Utility itself is
agnostic to your application setup, i.e. it would work equally well in Redux,
Flux, or any other architecture.

## Setting up the Actions

We need to create specific actions that correspond with our API steps:

```js
// actions/cat_actions.js

export const REQUEST_CATS = "REQUEST_CATS";
export const RECEIVE_CATS = "RECEIVE_CATS";

export const requestCats = () => ({ type: REQUEST_CATS });
export const receiveCats = (cats) => ({ type: RECEIVE_CATS, cats: cats})

```

## Creating an API Middleware

We now need to wrap our API Utility in a middleware that uses it to dispatch the
appropriate actions to our store.

```js
// middlewares/cats_middleware.js

import { fetchCats } from '../utils/cat_api_util';

import { REQUEST_CATS, RECEIVE_CATS, requestCats, receiveCats } from '../actions/cat_actions';

export default ({ getState, dispatch }) => next => action => {
	switch (action.type) {
		case REQUEST_CATS:
			const success = cats => dispatch(receiveCats(cats));
			const error = e => console.log(e.responseJSON);
			fetchCats(success, error);
			return next(action);
		default:
			return next(action);
	}
};
```

In the example above, our middleware listens for a `REQUEST_CATS` action. When
it receives one, it sets off our API Util method `fetchCats()`, passing it
`success` and `error` callbacks. Immediately after the request is sent, the
middleware returns the `next(action)`, allowing `REQUEST_CATS` to propagate
through the rest of the middlewares as well as the reducers.

If the response succeeds, the middleware dispatches another action,
`RECEIVE_CATS`, which will eventually hit our store and cause it to add the new
cats to our application state. Although our error function is just a debugging
tool right now, we can easily change it to dispatch a different action if we
want our store to handle errors as well.
