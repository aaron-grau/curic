# Thunks

One of the most common problems we need middleware to solve is asynchronicity. When building web applications that interact with a server, we need to request resources and then dispatch the response to our store when it eventually gets back. While it would be possible to make these API calls from our components and dispatch synchronously on success, we would prefer to have the source of every change to our app state be an action creators for consistency and reusability. Thunks are a new kind of action creator that will allow us to do just that.

Rather than returning a plain object, a thunk action creator returns a function. This function, when called with an argument of `dispatch`, can then dispatch one or more actions, immediately, or later. Here's an example.

```js
function thunkActionCreator() {
  return function (dispatch) {
    dispatch({
      type: "RECEIVE_MESSSAGE",
      message: "This will be dispatched immediately."
    });

    setTimeout(() => dispatch({
      type: "RECEIVE_MESSSAGE",
      message: "This will be dispatched 1 second later."
    }, 1000));
  };
}
```

This is great, but without custom middleware it will break as soon as the function action hits our reducer. We need middleware to intercept all actions of type `function` and rather then passing them to the reducer, call them passing in `dispatch` as an argument.

```js
// middleware/thunk_middleware.js

const thunk = ({ getState, dispatch }) => (next) => (action) => {
  if (typeof action === 'function') return action(dispatch, getState);
  return next(action);
};

export default thunk;
```

That's it! Notice we also passed in the getState function in case our async action creators need access to our application state. Now that we have all the pieces, let's see a more real life example.

Say that we are building a web application that stores a user's contacts. On logging in we will need to fetch all of that user's contacts from our database. We would use middleware to trigger the AJAX request responsible for this action. Our AJAX request might look something like the following:

```js
// utils/contacts_api_util.js

export function fetchContacts() {
  return $.ajax({ method: 'GET', url: 'api/contacts' });
}
```

An action creator that fetches contacts might look like this.

```js
import * as APIUtil from '../utils/contacts_api_util'

// async action creator which returns a function
export function fetchContacts() {
  return (dispatch) => {
    dispatch(requestContacts()); // allow reducer to set state to `fetching: true`
    return APIUtil.fetchContacts().then(contacts => {
      dispatch(receiveContacts(contacts));
    });
  }
}

//sync action creator which returns an object
export const requestContacts = (contacts) => {
  return { type: REQUEST_CONTACTS };
}
export const receiveContacts = (contacts) => {
  return { type: RECEIVE_CONTACTS, contacts };
}
```

Much like the logger from the previous reading, thunk middleware is available as a library `redux-thunk`. The middleware we just wrote is almost the entire original library! ([check out the source code][thunk-source]). For more on thunks and handling asynchronicity and redux, you can check out [this interesting SO post from the creator][thunks-so].
[thunk-source]: https://github.com/gaearon/redux-thunk/blob/master/src/index.js
[thunks-so]: http://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559#35415559
