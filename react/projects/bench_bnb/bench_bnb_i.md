# Bench BnB

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

+ Create a `User` model, `API::UsersController`, and `Api::SessionsController` with the following endpoints:
  * `[POST] api/users: "users#create" (signup)`,
  * `[POST] api/session: "sessions#create" (login)`,
  * `[DELETE] api/session: "sessions#destroy" (logout)`

Follow the basic pattern you used during the [Rails curriculum][rails], with some
key differences:

* Namespace:
  + Your controllers should live under an `Api` namespace.
  * **NB**: `rails g controller api/users` will generate an `Api::UsersController`
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

**Test your routes** using `$.ajax` in the console before moving on. You should be able to create a user, log out, and log in using `$.ajax` commands.

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

### Session Actions

+ Write and export the following action creators in a new file `actions/session_actions.js`:
  * `login(user)`
  * `logout()`
  * `signup(user)`
  * `receiveCurrentUser(currentUser)`
  * `receiveErrors(errors)`

+ Don't forget to define and export the corresponding action types as well
(e.g., `export const LOGIN = 'LOGIN'`).  
+ All of our action creators besides `logout` accept an user object as an argument.

### `SessionReducer`

+ Create a new reducer in a new file `reducers/session_reducer.js` to keep track of our
current user and error messages. The default `session` slice of the app state
should return:

```js
{
  currentUser: null,
  errors: []
}
```

The `SessionReducer` should listen for 3 action types and respond to each like so:
  * `RECEIVE_CURRENT_USER` - sets `currentUser` to the action's user and clears `errors`
  * `RECEIVE_ERRORS` - sets `errors` to the action's errors and clears the `currentUser`
  * `LOGOUT` - clears both `errors` and `currentUser`

Hint: Use the default application state listed above as a template for any
session information we might receive.

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
const RootReducer = combineReducers({
  session: SessionReducer
});
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
const configureStore = (preloadedState = {}) => (
  createStore(
    RootReducer,
    preloadedState
  );
);

export default configureStore;
```

### Recap

So far, we have built our redux store and told it to use our session reducing function.

**Test that everything works**:
* Add a `'DOMContentLoaded'` callback to your entry point if you don't already
have one.
* Inside the callback, call `configureStore()` and assign the result to the `window`:

  ```javascript
  window.store = configureStore(); //just for testing!
  ```

* Run `store.getState()` in the console and inspect the results. Your state
should look like the default state mentioned above!
+ Test that your `SessionReducer` works by dispatching session actions
(from the console) and then checking your application state.

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

  ```javascript
  import { applyMiddleware } from 'redux';
  import SessionMiddleware from './session_middleware';
  ```

* Use the `applyMiddleware` function to create a `RootMiddleware`
* `export default` `RootMiddleware`

  ```javascript
  const RootMiddleware = applyMiddleware(
    SessionMiddleware
  );

  export default RootMiddleware;
  ```

#### Add `RootMiddleware` to the `store`

For starters, let's open `store.js` and import our `RootMiddleware`.

```javascript
import RootMiddleware from '../middleware/root_middleware';
```

Finally, let's add our `RootMiddleware` as the third argument to the `createStore`
function.

```javascript
createStore(
  RootReducer,
  preloadedState,
  RootMiddleware
);
```

**Test that your `SessionMiddleware` is connected to the store** by dispatching
`login`, `logout`, and `signup` actions from the console and then seeing your
application state updates in response.

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
const App = ({ children }) => (
  <div>
    <h1>Bench BnB</h1>
    {children}
  </div>
);
```

### The `Root` component

Create and export a **functional component** called `Root`. The component should
accept the `store` as a prop, and it should render routes wrapped in the
`Provider` and the `Router`

```javascript
const Root = ({ store }) => (
  <Provider store={store}>
    // Router goes here...
  </Provider>
);
```

### The `Routes`

Start by importing the following into `root.jsx`:
* `React` from 'react'
* `Router`, `Route`, `IndexRoute`, and `hashHistory` from `react-router`
* Your `App` component

Set up your `Root` to use `hashHistory`. Like so,

```javascript
const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={hashHistory}>
      // Routes go here...
    </Router>
  </Provider>
);
```
#### Routes

Let's define a new `Route` that tells the `AppRouter` to render our `App`
component when the URL matches the root url `'/'`:

```javascript
const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App} />
    </Router>
  </Provider>
);
```

### The Entry Point

Let's modify our entry file, `bench_bnb.jsx`, to only import the following:
  * `React` & `ReactDOM`
  * `Root`
  * `configureStore`

In the document-ready callback, you should simply invoke `configureStore` and
then render the `Root` component into the `#root` container. Pass the `store` to
the `Root` component as a prop.

```javascript
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
`currentUser` from the state and the `logout` action creator. * Set up
`mapStateToProps` and `mapDispatchToProps` accordingly.

#### `Greeting`
If the user **is logged in**, then the `Greeting` should contain:
  * A welcome message including the user's username
  * A button to logout

If the user **is not logged in**, then the `Greeting` should contain:
  * A [`<Link to>`][link-docs] `/#/signup`
  * A [`<Link to`>][link-docs] `/#/login`

Change your `App` to render the `GreetingContainer` above our other content.

It should look a lot like this:
```js
const App = ({ children }) => (
  <div>
    <h1>Bench BnB</h1>
    <GreetingContainer />
    {children}
  </div>
);
```

**Test that you can logout from `App`.** Navigate to the root url. From the
console, log in a user (`window.store.dispatch(login(user))`). Check that
clicking the logout button logs out the current user before moving on.

### `SessionForm` Components

To make our React components modular, we will reuse and render the same form component on login and signup.

* Create a new controlled component, `SessionForm`, and a corresponding container `SessionFormContainer`
* Create 2 new routes in your `Root` component for `/#/login` and `/#/signup`.
  * The `<Route>`s' paths should be `"login"` and `"signup"`.
  + They should both render the `SessionFormContainer`.
  + For example,

  ```js
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route path="/login" component={SessionFormContainer} />
        //...
      </Route>
    </Router>
  </Provider>
  ```

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
  	handleSubmit(e) {
  		e.preventDefault();
  		const user = this.state;
  		this.props.processForm({user});
  	}
    ```

    + Pass it as a callback to your form's `onSubmit`.
  * Render a "Log in" or "Sign up" header based on the `formType` prop.
  * Provide a [`<Link to>`][link-docs] to `/#/signup` or `/#/login`, whichever isn't the current address.
  * Render a list of error messages if any are present.
  * Redirect the user to the `/#/` route if they are logged in.

**Call a TA over and show them your `SessionForm` before moving on!**

[link-docs]: https://github.com/ReactTraining/react-router/blob/master/docs/Introduction.md#with-react-router

## Phase 3: Bootstrapping the Current User

When our static `root` page loads, our app mounts without being aware of who the
current user is.

One solution to this problem is to create another API hook that returns the
current user and then fetch that information when the app mounts. However, since
the request would be asynchronous, our app would momentarily have no current
user. This would cause it to briefly render in a 'not-logged-in' state and then
re-render when the current user was received, causing a strange, flickering
effect. To circumvent this, we'll 'bootstrap' the current user alongside our HTML
when the page initially loads.

#### Edit your `root.html.erb`

Add a `<script></script>` element to the top of your `root.html.erb` file.

Inside your `<script>`, we're going to assign `window.currentUser`. In order to
get the proper value, we'll need to ask our controller for the `current_user`
and then `render` that information inside the script tag using `ERB`
interpolation. The result will be a hard-coded assignment in our rendered html
that looks something like this:

```html
  ...
  <script type="text/javascript">
      window.currentUser = {"id":3,"username":"senecy_the_cat"}
  </script>

  <main id="root"></main>
  ...
```

where `{"id": 3, "username": "senecy_the_cat"}` is inserted via `ERB`.

#### Interpolate `current user`

In your script, assign your `window.currentUser` to an ERB expression:

```js
window.currentUser = <%=  %>
```

Make sure to use `<%= %>` so that the result of your ruby code is rendered into the
script ( it will eventually return a JSON object).

Inside your erb expression, `render` your jbuilder `_user` partial, passing it
the `current_user`. Specify the whole path, including `.json.jbuilder`, to
prevent rails from automatically looking for a HTML partial. Mark your `render`
result `html_safe` to avoid escaping certain characters. You should get a JS-
compatible object to assign to `window.currentUser`. Add interpolation around
your  `window.currentUser=` assignment so that it only runs if someone is logged
in. You should have something like this:

```html
<script type="text/javascript">
  <% if logged_in? %>
    window.currentUser = <%= render("api/users/user.json.jbuilder",
      user: current_user).html_safe %>
  <% end %>
</script>
```

Log in, refresh your page, and check out your `elements` in the Dev Tools.
**Verify that the `script` contains an object literal of the current user** and
properly assigns `window.currentUser`.

### `preloadedState`

Finally, inside the `DOMContentLoaded` callback in your entry file...
* check to see if there is a `window.currentUser`
* If there is, create a `preloadedState` like below:

```javascript
if (window.currentUser) {
  const preloadedState = {
    session: {
      currentUser: window.currentUser
    }
  };
  //...
}
```

* Pass this `preloadedState` to `configureStore`.
* If there is no `window.currentUser`, then `configureStore`
without any arguments.

You entry point should look a lot like this:
```js
if (window.currentUser) {
  const initialState = {
    session: {
      currentUser: window.currentUser
    }
  };
  store = configureStore(initialState);
} else {
  store = configureStore();
}
```

**Test your code** by logging in and refreshing the page. You should stay logged in.

### Protecting your front-end routes with `onEnter` hooks!

Let's make sure users can't get to our `"/#/login"` or `"/#/signup"` routes on
the front-end if they are already logged in.

Refer to the `onEnter` [reading][onEnter] for this part.

* Define a `_redirectIfLoggedIn` helper method in your `Root` component. It should:
  * Check to see if the application state has a `currentUser` property.
  * If true, `replace` the path with `"/"`.
  * Otherwise, do nothing.
* Add an `onEnter` prop to the Routes we want to protect.
  * Remember, we want to redirect users from `"/#/login"` and  `"/#/signup"` if they are already logged in.

**NB**: Remember that `replace` won't add a "fake" entry to the browser's history, whereas `push` will. We also don't need an `asyncDoneCallback` because the `_redirectIfLoggedIn` runs synchronously.

[onEnter]: ../../readings/on_enter.md

## Phase 4: `Bench` redux cycle

In this phase, you will build the pieces necessary to display a basic index of
benches.

### `BenchesReducer`

In this step, we're going to create a reducer that manages the `benches` section
of our application state. We want to build a state that has the following shape:

```js
benches: {
  1: {
    id: 1,
    description: "...",
    lat: 0.0,
    lng: 0.0
  },
  2: {
    id: 2,
    description: "...",
    lat: 0.0,
    lng: 0.0
  },
  3: {
    id: 3,
    description: "...",
    lat: 0.0,
    lng: 0.0
  }
}
```

Note that our `benches` object will use `bench_id` as the primary key.

* Create a file, `reducers/benches_reducer.js` that exports a `BenchesReducer` function.

Let's start by just setting up our `BenchesReducer` to return its default state:

```javascript
const BenchesReducer = (state = {}, action) => {
  switch(action.type) {
    //...
    default:
      return state
  }
}

export default BenchesReducer;
```

### Action Creators

Before we move on to the fun stuff -- populating a Google map with benches from
our database -- we need to write an `actions` file that helps our other major
pieces function.

We need two `actions`: one that will tell our `Middleware` to go fetch all the
benches from our Rails API, and one that tells our `store` to change our
application state to represent the bench data in our `action`.

* Create an `actions` file: `actions/bench_actions`.
+ Write `requestBenches`. It doesn't need to accept any arguments. It should just
return an `action` with type `"REQUEST_BENCHES"`.
+ Write `receiveBenches`. It should accept a single argument, `benches`, and
produce an `action` with type `"RECEIVE_BENCHES"` and a `benches` property that
represents all of our bench data.
+ Don't forget to defined the corresponding action types.
+ Export everything.

Before continuing, *test that they return the correct objects*. For example,
add `requestBenches` to the `window` for testing later!

```js
window.requestBenches = requestBenches;
requestBenches(); //=> { type: 'REQUEST_BENCHES' }
```

### `BenchesMiddleware`

Our `BenchesMiddleware` will be responsible for a number of things, including
triggering api calls that eventually populate our `store` with benches!

Remember, `Middleware` receives dispatches before the store. It can decide to
intercept the dispatch, trigger another dispatch, or simply pass on it and do
nothing.

* Create a file, `middleware/benches_middleware.js`
* Import the relevant action types. Like so,

  ```javascript
  import { REQUEST_BENCHES, RECEIVE_BENCHES } from '../actions/bench_actions.js';
  ```

Recall that [Redux Middleware][middleware-docs] employs a currying strategy to
link several `Middleware` to each other and ultimately to the store. You'll need
to define 3 functions that wrap one-another like so:

```javascript
const BenchesMiddleware = ({ getState, dispatch }) => next => action => {
  // ...
}
```

+ Let's start by writing some `Middleware` that will just `console.log` whenever it
sees a `REQUEST_BENCHES` action type.

  ```javascript
    const BenchesMiddleware = ({getState, dispatch}) => next => action => {
      switch(action.type){
        case REQUEST_BENCHES:
          console.log('time to fetch!')
          return next(action);
        default:
          return next(action);
      }
    }
  ```

+ Export your `BenchesMiddleware`!

  ```javascript
  export default BenchesMiddleware;
  ```

+ Add it to our list of middlewares in our `RootMiddleware` to connect it to the `store`.

We'll come back to our `BenchesMiddleware` to flesh it out later.

[middleware-docs]: http://redux.js.org/docs/advanced/Middleware.html

#### Recap

Since our last recap, we have created a `bench_actions` file that holds bench-related
action creators and action types. They help ensure that our `Views`,
`Middleware`, and `store` are communicating effectively. We have also create
`BenchesMiddleware` which will be responsible for intercepting and triggering
bench-related dispatches.

**Let's test that our setup works!** Go to the console, and type:

```javascript
store.dispatch(requestBenches())
```

You should see the `console.log` that we imbedded in our `BenchesMiddleware`!
Make sure this works before moving on.

### `BenchApiUtil`

We are getting close to finishing the redux loop! In this step, we'll create an API utility for `BenchesMiddleware` to use that will request data via AJAX from our Rails server.

+ Create a file, `/util/bench_api_util.js`, that exports a function, `fetchBenches`.

This function should accept a single argument: `success`, a callback. It should
then dispatch an `$.ajax` request, passing `success` to the `$.ajax` call.
Define an error callback, to, for debugging.

Your function should look something like this:

```javascript
  export const fetchBenches = function(success){
    $.ajax({
      method: // ,
      url: //,
      success,
      error: () => console.log('error')
    })
  }
```

As before, put this function on the window for testing, and make sure it works
before moving on!

### Connect `BenchesMiddleware` to `BenchAPIUtil`

Let's connect our `BenchesMiddleware` to this new `fetchBenches` function!

Start by importing `fetchBenches`. Let's invoke it in our `BenchesMiddleware` whenever a `REQUEST_BENCHES` action is received. For now, make `success` a function that logs the data from the response.

```javascript
const BenchesMiddleware = ({getState, dispatch}) => next => action => {
  switch(action.type){
    case REQUEST_BENCHES:
      const success = data => console.log(data);
      fetchBenches(success);
      return next(action);
    default:
      return next(action);
  }
}
```

Check now that when we run this code in the console..

```javascript
store.dispatch(requestBenches())
```

We should see a `console.log` of all our bench data!

Finally, we need to re-work our `BenchesMiddleware` so that instead of `console.log`ing the bench data, it dispatches the data as part of an action.

* Import the `receiveBenches` Action Creator.
* Re-write your success callback to dispatch a `RECEIVE_BENCHES` action with the
response `data`.


```javascript
case REQUEST_BENCHES:
  const success = data => dispatch(receiveBenches(data))
  fetchBenches(success);
  return next(action);
```

### Back to the reducer

Update your `BenchesReducer` to update the `benches` in your state when it receives the `RECEIVE_BENCHES` action. Your reducer should look something like:

```javascript
const BenchesReducer = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_BENCHES:
      return action.benches;
    default:
      return state;
  }
};
```

#### Recap

You should now be able to run the following in the console:

```javascript
store.getState(); //: returns default state object
store.dispatch(requestBenches());
store.getState(); //: returns a new state object, fully populated!
```

Congrats! **Call over a TA and explain your benches redux cycle.**

## Phase 5: `BenchIndex`

Let's create a component that shows our benches.

* Let's start by making make two files: `components/bench_index.jsx` and
`components/bench_index_container.js`

### The Container Component

Inside your container component,  `connect` your `BenchIndex` as outlined below.
Don't worry that we haven't constructed `BenchIndex` yet; but we'll fix that in
the next step!

#### `mapStateToProps`

Our `BenchIndex` component needs `state` information about the `benches` in order to render.

#### `mapDispatchToProps`

The `BenchIndex` also needs a way to trigger a request for benches once it has
mounted. Let's give it a `requestBenches` prop that it can use to call a dispatch with
the `requestBenches()` action creator.

#### Export it!

Finally, let's use the `connect` function to export a new component that is
connected to our `store`.

```javascript
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BenchIndex);
```

### The Presentational Component

Let's create the `BenchIndex` presentational component. It should render a list of benches, showing the description of each bench.

```javascript
import React from 'react';

class BenchIndex extends React.Component {
  componentDidMount() {
    // request benches from your API here
  }

  render() {
    // ...
  }
};
```

Create another `BenchIndexItem`, to clean up your `BenchIndex` component's `render()` function.

### Render Time!

In your entry file, let's edit the document-ready callback.

* Import the `Provider` from the `react-redux` library

```javascript
import { Provider } from `react-redux`;
```

Remember, the `Provider`'s sole purpose is to make the `store` globally available in
our component hierarchy. Without the `Provider`, our `connect` functions won't work.

* Create a new functional component called `Root` that accepts a `store` prop
* `Root` should render the `BenchIndexContainer`, wrapped in the `Provider`
* Be sure to pass the `Provider` the `store` prop
* In the callback, invoke `ReactDOM.render`, and render the `Root` into the
`#root` div. Be sure to pass `Root` the configured `store`.
* Your app should now be populated with benches!!

#### Recap

Here's a summary of your redux loop so far:

* The document loads and our doc-ready callback is triggered.
* In the doc-ready callback, we tell `React` to render our `BenchIndex` component.
* The `BenchIndex` component mounts and dispatches an `action` with type `REQUEST_BENCHES`.
* Our `BenchesMiddleware` intercepts this `action` and triggers an `ajax` request to our rails api.
* On success, the `ajax` request dispatches an `action` with type `RECEIVE_BENCHES.`
* When the `BenchesReducer` receives this action, it updates the application state
with the bench data contained in the `action`.
* When the application state changes, it triggers a callback that was provided by
the connect function.
* That callback runs our `mapStateToProps` and `mapDispatchToProps` functions. The
return values of these functions are then merged and the resulting object is passed as new props to `BenchIndex`.
* When `BenchIndex` receives these new props, it re-renders. Phew!

#### `IndexRoute`

Next, let's make sure that our `BenchIndexContainer` is the default component rendered
inside `App`. Use an `IndexRoute` to accomplish this.

```javascript
<Router history={ hashHistory }>
  <Route path="/" component={ App }>
    <IndexRoute component={ BenchIndexContainer } />
    // other routes
  </Route>
</Router>
```

**Test your work. You've completed Day 1!**

[rails]: ../../../rails#readings-after-you-finish-all-videos
[onEnter]: ../../readings/on_enter.md
[context-docs]: https://facebook.github.io/react/docs/context.html
[store-context]: https://egghead.io/lessons/javascript-redux-passing-the-store-down-implicitly-via-context
