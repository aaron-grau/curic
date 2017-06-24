# Front-End Authentication

Remember how much time we spent on authentication in weeks 4 and 5? Good
news! We will continue to use that same pattern as we move toward
front-end auth.

The main difference is that we will use React components instead of
Rails views, and all of our HTTP requests (for logging in, signing up,
logging out) will be AJAX requests.

**Your backend will look essentially the same!**

As always:
  * A *session* is maintained by assigning a token to the user's cookie
  * Cookies are sent by the browser to the server with every request
(that includes AJAX requests!)

The new parts:
  * Session Reducer
  * Session Actions / Constants
  * Session API Util
  * LoginForm / SignupForm Components
  * Protected and Auth Routes

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

The `currentUser` property will be used to show things like a custom
welcome message and the profile picture. The `errors` property will be
used to tell our users that they have filled out a form incorrectly.
(e.g. 'Password is too short').

## Action-Creators & API

We'll need the following action-creators:

* Asynchronous:
  * signup
  * login
  * logout
* Synchronous:
  * receiveCurrentUser
  * receiveErrors

We'll also need some API utility functions that will actually make the
AJAX requests:
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

## Protected and Auth Routes

When we were creating apps with Rails views we had certain routes the
user could only visit if they were logged in or if they were logged out.
We still want to do the same thing, but we can no longer control this
from the back end. Instead we will create special route components that
trigger a redirect if the user shouldn't be allowed to see their
component. We do this by placing a conditional in the `render` prop.
Here is the code. Take a minute look it over and make sure you
understand it.  

```jsx
// /frontend/util/route_util.jsx

// renders component if logged out, otherwise redirects to the root url
const Auth = ({component: Component, path, loggedIn}) => (
  <Route path={path} render={(props) => (
    !loggedIn ? (
      <Component {...props}/>
    ) : (
      <Redirect to="/" />
    )
  )}/>
);

// renders component if logged in, otherwise redirects to the login page
const Protected = ({component: Component, path, loggedIn}) => (
  <Route path={path} render={(props) => (
     loggedIn ? (
      <Component {...props}/>
    ) : (
      <Redirect to="/login"/>
    )
  )}/>
);

// access the Redux state to check if the user is logged in
const mapStateToProps = state => {
  return {loggedIn: Boolean(state.session.currentUser)};
}

// connect Auth to the redux state
export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));

// connect Protected to the redux state
export const ProtectedRoute = withRouter(connect(mapStateToProps, null)(Protected));
```

In all your projects that use frontend auth you will want this code in a
file `/frontend/util/route_util.jsx`. Then you can simply import these
components and use them anywhere you want to need a protected route. For
example, suppose we only want users to be able to write reviews if they
are logged in.

```jsx
// Do this!
import { ProtectedRoute } from '/file/path/to/rout_util';

<ProtectedRoute component={ ReviewForm } path="/reviews/new" />

// Instead of this
<Route component={ ReviewForm } path="/reviews/new" />
```

See how easy that is? We have to do a little work to set up our auth
and protected routes, but once we have them in place turning an ordinary
route into a protected route is as simple as replacing `Route` with
`ProtectedRoute`.

## Bootstrapping

One of the biggest challenges of front end auth is telling our
application to render in an initial state that reflects the status of
our session. If we skip this step, it may be possible for a user to log
in or sign up, refresh the page, and then the app will render in a
non-logged in manner even though they have the right session token! This
happens because our App will always render with the default application
state unless we configure the `Store` to use a `preloadedState`.

There are **several** ways we can meet this challenge:

* *Issuing a separate request* -- Triggering a `fetchCurrentUser` AJAX
request from the root route's `onEnter` hook
* *Persisting client-side data* -- using [local storage][local-storage]
* *Bootstrapping* -- using the [gon gem][gon-video]

We are going to suggest the following implementation:

* In `application.html.erb`, add a script tag -- this is javascript code
that we can tell the browser to run, and we can generate it dynamically
using ruby!
* Inside the script tag, assign a jsonified `current_user` to the
property of `window.currentUser`
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
* If `window.currentUser` exists, generate a `preloadedState` and pass
it to `configureStore`

```jsx
document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser } };
    store = configureStore(preloadedState);

    // Clean up after ourselves so we don't accidentally use the
    // global currentUser instead of the one in the store
    delete window.currentUser;

  } else {
    store = configureStore();
  }

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store}/>, root);
});
```

Now we should be able to log in, refresh, and not lose our session
status!

[local-storage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[gon-video]: https://vimeo.com/168132088
