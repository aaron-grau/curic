# API Interactions in Redux

AJAX requests are handled in a Redux application by middleware. Like everything
else in Redux, AJAX requests and responses are handled by dispatching actions to
the store. Thus we need to write middleware to handle and trigger the
appropriate actions.

## Creating an API Utility

The most basic step to setting up an AJAX framework is to create an API Utility
file that exports methods that make requests to a Rails API. Create
such files in your project's `frontend/utils` directory.

```js
// frontend/utils/cat_api_util.js

export const fetchCats = (success, error) => {
  $.ajax({
    method: 'GET',
    url: 'api/cats',
    success,
		error
  });
};
```

In the example above, we define and export a  `fetchCats()` method that makes
requests to our API. `fetchCats()` arguments are the success and error functions
of the `$.ajax` call. We'll import this file into our middleware where we can
then pass success and error callbacks that trigger appropriate dispatches to our
store. Note that because the callbacks are passed in as arguments, the API
Utility itself is agnostic to your application setup (ie. it would work equally
well in Redux, Flux, or any other architecture).

## Setting up the appropriate actions

We need to create specific actions that correspond with our API steps:

```js
// actions/cat_actions.js

export const REQUEST_CATS = "REQUEST_CATS";
export const RECEIVE_CATS = "RECEIVE_CATS";

export const requestCats = () => ({
	type: REQUEST_CATS
});

export const receiveCats = cats => ({
	type: RECEIVE_CATS,
	cats
});
```

## Creating an API Middleware

We now need to wrap our API Utility in a middleware that uses it to dispatch the
appropriate actions to our store.

```js
// middlewares/cats_middleware.js

import { fetchCats } from '../utils/cat_api_util';
import { receiveCats, REQUEST_CATS } from '../actions/cat_actions';

export default ({ getState, dispatch }) => next => action => {
	const catsSuccess = data => dispatch(receiveCats(data));
	const error = e => console.log(e.responseJSON);

	switch (action.type) {
		case REQUEST_CATS:
			fetchCats(catsSuccess, error);
			return next(action);
		default:
			return next(action);
	}
};
```

In the example above, our app's cats middleware listens for a `REQUEST_CATS`
action. When it receives one, it calls our API Utility method `fetchCats()`,
passing it success and error callbacks. Immediately after the request is sent,
the middleware returns `next(action)`, propagating `REQUEST_CATS` through any
remaining middlewares as well as the app's reducer.

If the request succeeds, the success callback `catsSuccess` passed to
`fetchCats` dispatches another action `RECEIVE_CATS`. When the reducer receives
this action it adds the cats retrieved from the database to the application
state.

```js
// reducers/cats_reducer.js

import { RECEIVE_CATS } from '../actions/cat_actions';
import merge from 'lodash/merge';

export default (state = {}, action) => {
	switch(action.type) {
		case RECEIVE_CATS:
			return merge({}, state, action.cats);
		default:
			return state;
	}
}
```

Although our error function is just a debugging tool right now, we can
easily change it to dispatch a different action if we want our store to handle
errors as well.

# API Utility and Middleware Example

**`frontend/utils/cat_api_util.js`**

```js
export const fetchCats = (success, error) => {
  $.ajax({
    method: 'GET',
    url: 'api/cats',
    success,
		error
  });
};

export const fetchCat = (id, success, error) => {
  $.ajax({
    method: 'GET',
    url: `api/cats/${id}`,
    success,
		error
  });
};

export const createCat = (cat, success, error) => {
  $.ajax({
    method: 'POST',
    url: 'api/cats',
    data: cat,
    success,
    error
  });
};

export const updateCat = (cat, success, error) => {
  $.ajax({
    method: 'PATCH',
    url: `api/cats/${cat.id}`,
    data: cat,
    success,
		error
  });
};

export const destroyCat = (id success, error) => {
  $.ajax({
    method: 'DELETE',
    url: `api/cats/${id}`,
    success,
		error
  });
};
```


**`frontend/middlewares/cat_middleware.js`**

```js
// API Util methods
import {
	fetchCats,
	fetchCat,
	createCat,
	updateCat,
	destroyCat } from '../util/cat_api_util';

// Actions
import {
	receiveCats,
	receiveCat,
	removeCat,
	REQUEST_CATS,
	REQUEST_CAT,
	CREATE_CAT,
	UPDATE_CAT,
	DESTROY_CAT } from '../actions/cat_actions';

export default ({ getState, dispatch }) => next => action => {
	const catsSuccess = data => dispatch(receiveCats(data));
	const catSuccess = data => dispatch(receiveCat(data));
	const catRemoved = data => dispatch(removeCat(data));
	const error = e => console.log(e.responseJSON);

	switch(action.type) {
    case REQUEST_CATS:
      fetchCats(catsSuccess, error);
      return next(action);
    case REQUEST_CAT:
      fetchCat(action.id, catSuccess, error);
      return next(action);
    case CREATE_CAT:
      createCat(action.cat, catSuccess, error);
      return next(action);
    case UPDATE_CAT:
      updateCat(action.cat, catSuccess, error)
      return next(action);
    case DESTROY_CAT:
      destroyCat(action.id, catRemoved, error);
      return next(action);
    default:
      return next(action);
  }
};
```
