# Front-End Authentication

Remember how much time we spent on authentication in weeks 4 and 5? Good news!
We will continue to use that same pattern as we move toward front-end auth.

The main difference is that we will use React components instead of Rails views,
and all of our HTTP requests (for logging in, signing up, logging out) will be
AJAX requests.

**Your backend will look essentially the same!**

As always:
  * A *session* is maintained by assigning a token to the user's cookie
  * Cookies are sent by the browser to the server with every request (that includes AJAX requests!)

The new parts:
  * Session Reducer
  * Session Actions / Constants
  * Session API Util
  * LoginForm / SignupForm Components

---

## `Session Reducer`

```js
const _nullUser = {
  currentUser: null,
  errors: []
};

const SessionReducer = (state = _nullUser, action) => {
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      const currentUser = action.currentUser;
      return merge({}, _nullUser, {currentUser});
    case LOGOUT:
      return _nullUser;
    case RECEIVE_ERRORS:
      const errors = action.errors;
      return merge({}, _nullUser, {errors});
    default:
      return state;
  }
};
```

The `currentUser` property will be used to show things like a custom welcome
message and the profile picture. The `errors` property will be used to tell our
users that they have filled out a form incorrectly. (e.g. 'Password is too
short').

## Action-Creators & API

We'll need the following action-creators:

* Asynchronous:
  * signup
  * login
  * logout
* Synchronous:
  * receiveCurrentUser
  * receiveErrors

We'll also need some API utility functions that will actually make the AJAX
requests:
  * signup
  * login
  * logout

## Middleware

We will continue to use thunk middleware to handle asynchronous actions.
```
Asyn Actions   Middleware   Api Util      Sync Actions

signup ----->  Thunk -----> signup -----> receiveCurrentUser(currentUser)
login ------>  Thunk -----> login ------> receiveCurrentUser(currentUser)
logout ----->  Thunk -----> logout -----> receiveCurrentUser(null)
```

## Front End Routes

It is common to restrict certain front end routes from being accessed by users
who are not logged in or who do not have proper credentials. Check out this `Router`:

```js
<Router history={ hashHistory }>
  <Route path="/" component={ App }>
    <Route path="/login" component={ Login } onEnter={ _redirectIfLoggedIn }/>
    <Route path="/signup" component={ Signup } onEnter={ _redirectIfLoggedIn }/>
    <Route path="/profile" component={ Profile } onEnter={ _ensureLoggedIn }/>
  </Route>
</Router>
```

Here we have 3 routes that are all protected by React Router [onEnter
hooks][onenter].

[onenter]: on_enter.md

## Bootstrapping

One of the biggest challenges of front end auth is telling our application to
render in an initial state that reflects the status of our session. If we skip
this step, it may be possible for a user to log in or sign up, refresh the page,
and then the app will render in a non-logged in manner even though they have the
right session token! This happens because our App will always render with the
default application state unless we configure the `Store` to use a
`preloadedState`.

There are **several** ways we can meet this challenge:

* *Issuing a separate request* -- Triggering a `fetchCurrentUser` AJAX request
from the root route's `onEnter` hook
* *Persisting client-side data* -- using [local storage][local-storage]
* *Bootstrapping* -- using the [gon gem][gon-video]

We are going to suggest the following implementation:

* In `application.html.erb`, add a script tag -- this is javascript code that
we can tell the browser to run, and we can generate it dynamically using ruby!
* Inside the script tag, assign a jsonified `current_user` to the property of
`window.currentUser`
* Use a jbuilder template!

```html
<script type="text/javascript">
  <% if logged_in? %>
  	window.currentUser =
      <%= render("api/users/user.json.jbuilder", user: current_user).html_safe %>
  <% end %>
</script>
```

* Inside our entry point, within the doc-ready callback,
check for the presence of `window.currentUser`
* If `window.currentUser` exists, generate a `preloadedState` and pass it
to `configureStore`

```js
document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser } };
    store = configureStore(preloadedState);
  } else {
    store = configureStore();
  }

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store}/>, root);
});
```

Now we should be able to log in, refresh, and not lose our session status!

[local-storage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[gon-video]: https://vimeo.com/168132088
