# BenchBnB Part 1 - Front-End Auth!

Check out the live demo [here][live-demo]!

[live-demo]: http://aa-benchbnb.herokuapp.com

## Phase 0: Setup

### Setup Checklist

Refer to [the master checklist][checklist] during Bench BnB and your final project.

[checklist]: ../../readings/checklist.md

### Rails Backend

* Create a new rails project using `--database=postgresql` and `--skip-turbolinks`.
* Set up a `StaticPagesController` with a `root` view containing a `<main id="root"></main>`.
* Update your `routes.rb` file to root to `static_pages#root`

### Frontend Structure

* Create a `/frontend` folder at the root directory of your project to hold your
frontend:

  ```
  frontend
    + actions
    + components
    + middleware
    + reducers
    + store
    + util
    bench_bnb.jsx
  ```

* Run `npm init`.
* Run `npm install --save` the following packages:
  * `webpack`
  * `react`
  * `react-dom`
  * `redux`
  * `react-redux`
  * `babel-core`
  * `babel-loader`
  * `babel-preset-react`
  * `babel-preset-es2015`
* Create a `webpack.config.js` file.
* Set up your entry file (`bench_bnb.jsx`) to render your app into the `#root` container.

Your entry file might start off looking like the code below:
```js
// frontend/bench_bnb.jsx

import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    ReactDOM.render(<h1>Welcome to BenchBnB</h1>, root);
});
```

* **Test this rendering setup before moving on.**

## Phase 1: Front-End User Authentication

In this phase, we are going to implement front-end user sign-up and login.
Goodbye Rails views; hello, single-page app! **Read through the instructions for
all of phase 1 before implementing anything.** This will give you the context to
understand each individual step.

**Our authentication pattern must:**
  * sign up new users
  * know who's logged in
  * log users in
  * log them out
  * restrict access to certain routes based on whether someone is logged in

### Auth Backend

+ We want to create a `User` model, `API::UsersController`, and `Api::SessionsController` with the following endpoints:
  * `[POST] api/users: "users#create" (signup)`,
  * `[POST] api/session: "sessions#create" (login)`,
  * `[DELETE] api/session: "sessions#destroy" (logout)`

Follow the basic pattern you used during the [Rails curriculum][rails], with some
key differences:

* Namespace:
  + Your controllers should live under an `Api` namespace.
  * Running `rails g controller api/users` will generate an `Api::UsersController`
* Response Format:
  + Render JSON formatted responses by default.
  * In `routes.rb`, set `defaults: {format: :json}` on your `namespace :api`
* Views:
  + You'll want an **`api/users/show.json.jbuilder`**, which you can use for
  multiple controller actions. + This should delegate to a partial:
  **`api/users/_user.json.jbuilder`**, which we'll use later.
* `Sessions#destroy`:
  + Render an empty `{}` upon successful logout.
  * Render a `404` message if there is no `current_user` to logout.
* Auth Errors:
  + Render auth errors (e.g. `'invalid credentials'` or `'username already
  exists'`) in your response with a corresponding error status (usually either
  `422`, `401`, or `404`).
  * Use `@user.errors` when applicable.
  * **Caution**: Rails will format error responses differently than normal
  responses.

**Test your routes** using `$.ajax` in the console before moving on. You should
be able to create a user, log out, and log in using `$.ajax` commands.

### `SessionApiUtil`

Create a new file, `util/session_api_util.js` with the following functions:
  * `signup`: should make an AJAX request that creates a new user.
  * `login`: should make an AJAX request that creates a new session.
  * `logout`: should make an AJAX request that deletes the current session.

Each function should take `success` and `error` callbacks.

**NB**: Check out `routes.rb` and run `rake routes` to determine the appropriate
URL for each of these requests.

**Test each of your api util functions before moving on!** To do this, you can
import these functions in your entry file and save them to the window (e.g.,
`window.login = login;`).

### State Shape

We want our app state to hold two pieces of information concerning user auth
which we'll nest under `session`:
1. the `current user` and
2. an array of `errors`.

If no user is signed in, `session.currentUser` is `null`. If a user is signed in
`session.currentUser` returns information on the user. App's state might look
something like this:

```js
{
  session: {
    currentUser: null,
    errors: ["Invalid credentials"]
  }
}
```

or this:

```js
{
  session: {
    currentUser: {
      id: 1,
      username: 'breakfast'
    },
    errors: []
  }
}
```

By default, there no user is signed in. Thus `session` should return a `null`
`currentUser`, and an empty array of `errors`.

Hint: Use this default application state as a template for any session
information we might receive.

### Session Actions

+ Before we get to the reducer, let's write and export the following action
creators in a new file `actions/session_actions.js`:
  * `login(user)`
  * `logout()`
  * `signup(user)`
  * `receiveCurrentUser(currentUser)`
  * `receiveErrors(errors)`

+ Don't forget to define and export the corresponding action types as well
(e.g., `export const LOGIN = 'LOGIN'`).  
+ `logout` won't accept an argument. `receiveErrors` will take an array. All
other action creators accept a user object.

### `SessionReducer`

+ Create a new reducer in a new file `reducers/session_reducer.js` to keep track of our
current user and error messages.

The `SessionReducer` should listen for 3 action types and respond to each like so:
  * `RECEIVE_CURRENT_USER` - sets `currentUser` to the action's user and clears `errors`
  * `RECEIVE_ERRORS` - sets `errors` to the action's errors and clears the `currentUser`
  * `LOGOUT` - clears both `errors` and `currentUser`

Your `SessionReducer` should maintain its own default state. To do that pass in
an object as a default argument to SessionReducer with `currentUser` set to `null`
and `errors` set to an empty array.

Remember to use both `Object.freeze()` and `merge` from the `lodash` library
to prevent the state from being accidentally mutated.

### `RootReducer`

Create a new file, `reducers/root_reducer.js`. This file will be responsible for
combining our multiple, domain-specific reducers. It will export a single `RootReducer`.

  * Import `combineReducers` from the `redux` library.
  * Also import the `SessionReducer` function we just created!
  * Create a `RootReducer` using the `combineReducers` function.
    * Remember, the `combineReducers` function accepts a single argument: an object
      whose properties will represent properties of our application state, and values
      that correspond to domain-specific reducing functions.
  * `export default RootReducer`.

Your `RootReducer` should look like this:

```javascript
// frontend/reducers/root_reducer.jsx

import { combineReducers } from 'redux';

import SessionReducer from './session_reducer';

const RootReducer = combineReducers({
  session: SessionReducer
});

export default RootReducer;
```

So far, our default application state should look something like this:

```
{
  session: {
    currentUser: null,
    errors: []
  }
}
```

### The `store`

Set up a `configureStore` method for initializing our Store:

* Create a new file, `/store/store.js`.
* Import `createStore` from the redux library.
* Import our `RootReducer`.
* Define a new function, `configureStore`, that accepts a single argument, `preloadedState`.
* `configureStore` should return a new `store` with the `RootReducer` and `preloadedState` passed in.

```javascript
// frontend/store/store.js

import { createStore } from 'redux';
import RootReducer from '../reducers/root_reducer';

const configureStore = (preloadedState = {}) => (
  createStore(
    RootReducer,
    preloadedState
  );
);

export default configureStore;
```

Before moving on, inside the `DOMContentLoaded` callback in `frontend/bench_bnb.jsx` 
call `configureStore()` and assign the result to the window. 

```javascript
window.store = configureStore(); //just for testing!
```

Run `store.getState()` in the console and inspect the results. Your state 
should look like the default state mentioned above! 

### `SessionMiddleware`

Your `SessionMiddleware` should only listen for and respond to 3 of our action types:
  * `LOGIN`
  * `LOGOUT`
  * `SIGNUP`

Your middleware should be responsible for invoking the appropriate
`SessionApiUtil` function and passing the appropriate callbacks.
+ The success callback for `login` and `signup` requests should `dispatch` a
`receiveCurrentUser` action.  
+ The error callbacks should dispatch `receiveErrors`.
+ The success callback of `logout` should simply be to invoke `next(action)`.

**NB**: It is **very** important that we carefully consider where we invoke our
`next` function. Once our middleware is finished doing whatever it needs to
do, it needs to call the `next` middleware in the chain, passing it the same
`action`. If our `Middleware` doesn't care about this `action`, then it
should, by default, pass the action on to the next middleware in the chain.

Your `SessionMiddleware` should look a lot like this:

```js
// frontend/middleware/session_middleware.js

import { receiveCurrentUser,
         receiveErrors,
         LOGIN,
         LOGOUT,
         SIGNUP
       } from '../actions/session_actions';

import { login, signup, logout } from '../util/session_api_util';

export default ({ getState, dispatch }) => next => action => {
  const successCallback = user => dispatch(receiveCurrentUser(user));
  const errorCallback = xhr => dispatch(receiveErrors(xhr.responseJSON));

  switch(action.type) {
    case LOGIN:
      login(action.user, successCallback, errorCallback);
      return next(action);
    case LOGOUT:
      logout(() => next(action));
      break;
    case SIGNUP:
      signup(action.user, successCallback, errorCallback);
      return next(action);
    default:
      return next(action);
  }
};

```

### Connecting Middleware and the `store`

Let's add our `SessionMiddleware` to the `store`.

#### `RootMiddleware`

Similar to our pattern for creating a `RootReducer`, we'll create a `RootMiddleware`.

* Create a new file, `middleware/root_middleware.js`
* Import `applyMiddleware` from `redux`
* Import your `SessionMiddleware`
* Use the `applyMiddleware` function to create a `RootMiddleware`
* `export default` `RootMiddleware`

Your `RootMiddleware` should look like this:

```javascript
// frontend/middleware/root_middleware.js

import { applyMiddleware } from 'redux';
import SessionMiddleware from './session_middleware';

const RootMiddleware = applyMiddleware(
  SessionMiddleware
);

export default RootMiddleware;
```

#### Add `RootMiddleware` to the `store`

To start, let's re-visit `store.js` and import our `RootMiddleware`.

```javascript
// frontend/store/store.js

import RootMiddleware from '../middleware/root_middleware';
```

Let's add our `RootMiddleware` as the third argument to the `createStore`
function.

```javascript
createStore(
  RootReducer,
  preloadedState,
  RootMiddleware
);
```

**Test that your `SessionMiddleware` is connected to the store** by dispatching
session actions from the console and then checking to see if your application
state updates accordingly in response.

## Phase 2: React Router and Session Components

Add routing to our application by running:

```
npm install --save react-router
```

Before we add the `ReactRouter`, we'll need to refactor our component hierarchy a
bit.

Define 2 new files at the root of your `frontend/components` folder:

* `frontend/components/app.jsx`
* `frontend/components/root.jsx`

### The `App` component

Create and export a new **functional component** that renders an `<h1>` tag with
"Bench BnB" text and underneath renders `props.children`. It should look something like.

```javascript
// frontend/components/App.jsx

import React from 'react';

const App = ({ children }) => (
  <div>
    <h1>Bench BnB</h1>
    {children}
  </div>
);

export default App;
```

### The `Root` component

Create and export a **functional component** called `Root`. It will  accept the
`store` as a prop, and render routes wrapped by the `Provider`.

```javascript
// frontend/components/root.jsx

import React from 'react';
import { Provider } from 'react-redux';

const Root = ({ store }) => (
  <Provider store={store}>
    // Router goes here...
  </Provider>
);
```

### React Router

Import the following to `root.jsx`:
* `Router`, `Route`, `IndexRoute`, and `hashHistory` from `react-router`

Set up the `Router` to use `hashHistory`. Like so,

```javascript
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={hashHistory}>
      // Routes go here...
    </Router>
  </Provider>
);
```

#### Routes

Define a new `Route` that tells the router to render our `App`
component at the root url `'/'`.

```javascript
const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App} />
    </Router>
  </Provider>
);
```

Thus `App` will be rendered for all routes in your app.

### Updating the Entry Point

Let's modify our entry file, `bench_bnb.jsx`, to only import the following:
  * `React` & `ReactDOM`
  * `Root`
  * `configureStore`

In the document-ready callback, you should simply invoke `configureStore` and
then render the `Root` component into the `#root` container. Pass the `store` to
the `Root` component as a prop.

```javascript
// frontend/bench_bnb.jsx

import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

document.addEventListener('DOMContentLoaded', () => {
  store = configureStore();
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store}/>, root);
});
```

### `Greeting` Components

* Create a new react component, `Greeting`, and a container, `GreetingContainer`.

#### `GreetingContainer`
* `GreetingContainer` passes as `props` to the presentational component
`currentUser` from the state and the `logout` action creator. Set up
`mapStateToProps` and `mapDispatchToProps` accordingly.

#### `Greeting`
If the user **is logged in**, then the `Greeting` should contain:
  * A welcome message including the user's username
  * A button to logout

If the user **is not logged in**, then the `Greeting` should contain:
  * A [`<Link to>`][link-docs] `/#/signup`
  * A [`<Link to`>][link-docs] `/#/login`

Update your `App` component so that it renders the `GreetingContainer` above
other content. It should look like this:

```js
import GreetingContainer from './greeting/greeting_container';

const App = ({ children }) => (
  <div>
    <h1>Bench BnB</h1>
    <GreetingContainer />
    {children}
  </div>
);
```

**Test that you can logout from `App.jsx`.** Navigate to the root url. From the
console, log in a user (`window.store.dispatch(login(user))`). Check that
clicking the logout button logs out the current user before moving on.

### `SessionForm` Components

To make our React components modular, we will reuse and render the same form component on login and signup.

* Create a container `SessionFormContainer` and its controlled component `SessionForm`.

#### `SessionFormContainer`

The `SessionFormContainer` should provide `SessionForm` with the following props:
+ From `mapStateToProps(state)`:
  * `loggedIn` (boolean) - representing whether a `currentUser` exists
  * `errors` (array) - list of errors from the state
+ From `mapDispatchToProps(dispatch, ownProps)`:
  * `formType` (string): `'login'` or `'signup'` given the current `location.pathname`
  * `processForm` (function): dispatching action creators `login` or `signup` given `formType`

#### `SessionForm`

The `SessionForm` component should be responsible for a number of tasks:
  * Render a controlled component with `state` governed by user interface. For example,

  ```js
  class SessionForm extends React.Component {
  	constructor(props) {
  		super(props);
  		this.state = {
  			username: "",
  			password: ""
  		};
    }

    //...
  }
  ```
  * Invoke the `processForm` prop when the `'Submit'` button is clicked.
    + Define a helper method `handleSubmit(e)` like so:

    ```js
    class SessionForm extends React.Component {
      //...

      handleSubmit(e) {
        e.preventDefault();
        const user = this.state;
        this.props.processForm({user});
      }

      //...
    }
    ```

    + Pass it as a callback to your form's `onSubmit`.
  * Render a "Log in" or "Sign up" header based on the `formType` prop.
  * Provide a [`<Link to>`][link-docs] to `/#/signup` or `/#/login`, whichever isn't the current address.
  * Render a list of error messages if any are present.
  * Redirect the user to the `/#/` route if they are logged in.

### Session Routes

Now it's time to create routes for logging in and signing up.

* Create two new routes in your `Root` component for `/#/login` and `/#/signup`.
  * The `<Route>`s' paths should be `"login"` and `"signup"`.
  + They should both render the `SessionFormContainer`.

Your `Root` should now look a lot like this:
```js
const Root = ({ store }) => (    
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route path="/login" component={SessionFormContainer} />
        <Route path="/signup" component={SessionFormContainer} />
      </Route>
    </Router>
  </Provider>
)
```

**Call a TA over and show them your `SessionForm` renders for logging and signing up before moving on!**

[link-docs]: https://github.com/ReactTraining/react-router/blob/master/docs/Introduction.md#with-react-router

## Phase 3: Bootstrapping the Current User

When our static `root` page loads, our app mounts without being aware of who the
current user is.

One solution to this problem is to create another API hook that returns the
current user and then fetch that information when the app mounts. However, since
the request would be asynchronous, our app would momentarily have no current
user. This would cause it to briefly render in a 'not-logged-in' state and then
re-render when the current user was received, causing a strange, flickering
effect. To circumvent this, we'll 'bootstrap' the current user alongside our
HTML when the page initially loads.

#### Edit your `root.html.erb`

Add a `<script></script>` element to the top of your `root.html.erb` file.

Inside your `<script>`, we're going to assign `window.currentUser`. In order to
get the proper value, we'll need to ask our controller for the `current_user`
and then `render` that information inside the script tag using `ERB`
interpolation. The result will be a hard-coded assignment in our rendered html
that looks something like this:

```html
// root.html.erb

//...
<script type="text/javascript">
    window.currentUser = {"id":3,"username":"senecy_the_cat"}
</script>

<main id="root"></main>
//...
```

where `{"id": 3, "username": "senecy_the_cat"}` is inserted via `ERB`.

#### Interpolate `current user`

In your script, assign your `window.currentUser` to an ERB expression:

```js
window.currentUser = <%=  %>
```

Make sure to use `<%= %>` so that the result of your ruby code is rendered into
the script (it will eventually return a JSON object).

Inside your erb expression, `render` your jbuilder `_user` partial, passing it
the `current_user`. Specify the whole path, including `.json.jbuilder`, to
prevent rails from automatically looking for a HTML partial. Mark your `render`
result `html_safe` to avoid escaping certain characters. You should get a JS-
compatible object to assign to `window.currentUser`. Add interpolation around
your  `window.currentUser=` assignment so that it only runs if someone is logged
in. You should have something like this:

```html
// root.html.erb

//...
<script type="text/javascript">
  <% if logged_in? %>
    window.currentUser = <%= render("api/users/user.json.jbuilder",
      user: current_user).html_safe %>
  <% end %>
</script>
//...
```

Log in, refresh your page, and check out your `elements` in the Dev Tools.
**Verify that the `script` contains an object literal of the current user** and
properly assigns `window.currentUser`.

### `preloadedState`

Finally, inside the `DOMContentLoaded` callback in your entry file...
* check to see if there is a `window.currentUser`
* If there is, create a `preloadedState` like below:
* Pass this `preloadedState` to `configureStore`.
* If there is no `window.currentUser`, then `configureStore`
without any arguments.

Your entry point should now have the following code:

```js
// frontend/bench_bnb.jsx

//...
let store;
if (window.currentUser) {
  const preloadedState = {session: {currentUser: window.currentUser}};
  store = configureStore(preloadedState);
} else {
  store = configureStore();
}
//...
```

**Test your code** by logging in and refreshing the page. You should stay logged in.

### Protecting your front-end routes with `onEnter` hooks!

Let's make sure users can't visit our `"/#/login"` or `"/#/signup"` routes if
they are already logged in on the front-end.

Refer to the `onEnter` [reading][onEnter] for this part.

* Define a `_redirectIfLoggedIn` helper method in your `Root` component. It should:
  * Check to see if the application state has a `currentUser` property.
  * If true, `replace` the path with `"/"`.
  * Otherwise, do nothing.
* Add an `onEnter` prop to the Routes we want to protect.
  * Remember, we want to redirect users from `"/#/login"` and  `"/#/signup"` if they are already logged in.

**NB**: Remember that `replace` won't add a "fake" entry to the browser's
history, whereas `push` will. We also don't need an `asyncDoneCallback`
because the `_redirectIfLoggedIn` runs synchronously.

[onEnter]: ../../readings/on_enter.md

:confetti_ball: You've finished adding front-end user auth to your app! Now let's add benches! 

---

Continue to [Part 2](./bench_bnb_ii.md).

[rails]: ../../../rails#readings-after-you-finish-all-videos
[onEnter]: ../../readings/on_enter.md
