# Front End Auth

The phrase `front end auth` can be misleading, so let's first clarify what this reading
will cover. We want to build sleek single-page applications that don't have distinct
routes for sign up or login forms. Instead of http requests, we want to make
all of our login, sign up, logout, etc. requests via AJAX.

**Your backend will look essentially the same!**

Let's make sure we reinforce some key properties of authentication:
  * A *session* is maintained by assigning a token to the user's cookie
  * Cookies are sent by the browser to the server with every request: http and ajax!

We'll need the following pieces:

  * SessionReducer
  * Session Actions / Constants
  * Session API Util
  * LoginForm / SignupForm Components

---

### `SessionReducer`

Our `SessionReducer` might look something like this:

```js
  const _defaultState = {
    currentUser: null,
    errors: []
  };

  const SessionReducer = function(state = _defaultState, action){
    switch(action.type){
      case SessionConstants.RECEIVE_CURRENT_USER:
        const currentUser = action.currentUser;
        return merge({}, _defaultState, {currentUser});
      case SessionConstants.LOGOUT:
        return _defaultState;
      case SessionConstants.RECEIVE_ERRORS:
        const errors = action.errors;
        return merge({}, _defaultState, {errors});
      default:
        return state;
    }
  };
```

The `currentUser` property will be used to show things like a custom welcome message
and the profile picture. The `errors` property will be used to tell our users that
they have filled out a form incorrectly. (Think 'Password is too short').

---

### Action-Creators & API

We'll need some actions to handle our session-related requests. The following should do:

  * signup
  * login
  * logout
  * receiveCurrentUser
  * receiveErrors

We'll also need some api utility functions that will actually make the ajax requests:

  * signup
  * login
  * logout

---

### Middleware

The `SessionMiddleware` should be responsible for invoking our session api utility functions
whenever it sees a relevant dispatch.

```
  Actions                               Api Util      Success Dispatch

  signup ---->                     ----> signup ----> receiveCurrentUser
  login ----->  SessionMiddleware  ----> login -----> receiveCurrentUser
  logout ---->                     ----> logout ----> logout
```

---

### Front End Routes

It is common to protect front end routes from being accessed by users based on their
session status. Check out this `Router`:

```js
  <Router history={ hashHistory }>
    <Route path="/" component={ App }>
      <Route path="/login" component={ Login } onEnter={ _redirectIfLoggedIn }/>
      <Route path="/signup" component={ Signup } onEnter={ _redirectIfLoggedIn }/>
      <Route path="/profile" component={ Profile } onEnter={ _ensureLoggedIn }/>
    </Route>
  </Router>
```

Here we have 3 routes that are all protected by [onEnter hooks][onenter]

[onenter]: on_enter.md

---

### Bootstrapping

One of the biggest challenges of front-end auth is telling our application to render
in an initial state that reflects the status of our session. If we skip this step, it
may be possible for a user to log in or sign up, refresh the page, and then the app
will render in a non-logged in manor even though they have the right session token!

There are **several** ways we can meet this challenge.

  * Triggering a `fetchCurrentUser` ajax request from the `app's` `componentDidMount`
  * Using [local storage][local-storage]
  * Using the [gon gem][gon-video]

We are going to suggest the following implementation:

  0. In `application.html.erb`, add a script tag -- this is javascript code that
  we can tell the browser to run, and we can generate it dynamically using ruby!
  0. Inside the script tag, assign a jsonified `current_user` to the property of
  `window.currentUser`
  0. Use a jbuilder template to make this process simple!

```html
  <script type="text/javascript">
    <% if logged_in? %>
    	window.currentUser = <%= render("api/users/user.json.jbuilder",
    		user: current_user).html_safe %>
    <% end %>
  </script>
```

  0. Inside of the doc-ready callback that we generally establish in our entry point,
  check for the presence of a `window.currentUser`.
  0. If `window.currentUser` exists, generate a `preloadedState` and pass it
  to `configureStore`

```js
  document.addEventListener('DOMContentLoaded', function() {
    let store;
    if (window.currentUser) {
      const initialState = {session: {currentUser: window.currentUser}};
      store = configureStore(initialState);
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
