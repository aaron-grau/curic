# Bench BnB

Check out the live demo [here][live-demo]!

[live-demo]: http://aa-benchbnb.herokuapp.com

## Setup Checklist

Refer to [the master checklist][checklist] during Bench BnB and your final project.

[checklist]: ../../readings/checklist.md

## Phase 0: Rails Backend

* Create a new rails project using `--database=postgresql` and `--skip-turbolinks`.
* Set up a `StaticPagesController` with a `root` view containing a `<main id="root"></main>`.
* Update your `routes.rb` file to root to `static_pages#root`

## Phase 0.5: `Frontend` Structure

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
* `npm init`
* `npm install --save` the following packages:
  * `webpack`
  * `react`
  * `react-dom`
  * `redux`
  * `react-redux`
  * `babel-core`
  * `babel-loader`
  * `babel-preset-react`
  * `babel-preset-es2015`
* Create a `webpack.config.js` file
* Setup your entry file (`bench_bnb.jsx`) to render your app into the `#root` container.
* **Test this rendering setup before moving on.**

## Phase 1: Front-End User Authentication

In this phase, we are going to implement front-end user sign-up and login.
Goodbye Rails views; hello, single-page app! **Read through the instructions for
the entire phase before building anything.** This will give you the context to
understand each individual step.

**Our authentication pattern must:**
  * sign up new users
  * know who's logged in
  * log users in
  * log them out
  * restrict access to certain routes based on whether someone is logged in

### Auth Backend

Read the instructions below, and then create an API with the following
endpoints:

  * [POST] api/users: "users#create" (signup),
  * [POST] api/session: "session#create" (login),
  * [DELETE] api/session: "session#destroy" (logout)

**Create a `User` model, `API::UsersController`, and `Api::SessionsController`.**
Follow the basic pattern you used during the [Rails curriculum][rails], with some
key differences:

* **Namespace**: Your controllers should live under an `Api` namespace.
* **Response Format**: render JSON formatted responses by default.
* **Views**: You'll want an **`api/users/show.json.jbuilder`**, which you can use for multiple controller actions. This should delegate to a partial: **`api/users/_user.json.jbuilder`**, which we'll use later.
* **`Sessions#destroy`**: render an empty `{}` upon successful logout.
  * Render a `404` message if there is no `current_user` to logout.
* **Auth Errors**: Render auth errors (e.g. 'invalid credentials' or 'username
already exists') in your response with a corresponding error status.
  * Use `@user.errors` when applicable.
  * **Caution**: Rails will format error responses differently than normal
  responses.

Test your routes using `$.ajax` in the console before moving on.

### `SessionApiUtil`

Create a new file, `util/session_api_util.js` with the following functions:
  * **`signup`:** POST 'api/users'
  * **`login`:** POST 'api/session'
  * **`logout`:** DELETE 'api/session'

Each function should take `success` and `error` callbacks.

Test each of your api util functions before moving on!

### Session Actions

We need the following Action Creators (in `actions/session_actions.js`):
  * `login`
  * `logout`
  * `signup`
  * `receiveCurrentUser`
  * `receiveErrors`

Build the corresponding action types as well (e.g., `export const LOGIN = 'LOGIN'`). All of our action creators (
other than `logout`) should accept an argument.

### `SessionReducer`

Create a new reducer (at `reducers/session_reducer.js`) to keep track of our current user and error messages.
The default application shape should look like:

```
{
  currentUser: null,
  errors: []
}
```

The `SessionReducer` should listen for 3 action types:
  * `RECEIVE_CURRENT_USER`
  * `RECEIVE_ERRORS`
  * `LOGOUT`


### `RootReducer`

Create a new file, `reducers/root_reducer.js`. This file will be responsible for
combining our multiple, domain-specific reducers. It will export a single `RootReducer`.

  * Import `combineReducers` from the `redux` library.
  * Also import the `BenchesReducer` function we just created!
  * Create a `RootReducer` using the `combineReducers` function.
  * Remember, the `combineReducers` function accepts a single argument: an object
    whose properties will represent properties of our application state, and values
    that correspond to domain-specific reducing functions.
  * `export default RootReducer`.

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

### The `Store`

Setup a `configureStore` method for initializing our Store:

  * Create a new file, `/store/store.js`.
  * Import `createStore` from the redux library.
  * Import our `RootReducer`.
  * Define a new function, `configureStore`, that accepts a single argument, `preloadedState`.
  * `configureStore` should return a new `Store` with the `RootReducer` and `preloadedState` passed in.

```javascript
  const configureStore = (preloadedState = {}) => (
    createStore(
      RootReducer,
      preloadedState
    );
  );

  export default configureStore;
```

#### Recap

So far, we have built our redux store and told it to use our session reducing function.
Test that everything works:
  * Add a `'DOMContentLoaded'` callback to your entry point if you don't already
  have one.
  * Inside the callback, call `configureStore()` and assign the result to the `window`:
    ```javascript
      window.Store = configureStore(); //just for testing!
    ```
  * Run `Store.getState()` in the console and inspect the results.

Your state should look like the default state mentioned above!

**Test that your `SessionReducer` works** by dispatching session actions and then
checking your application state.

### `SessionMiddleware`

Your `SessionMiddleware` should only listen for 3 of our action types:
  * `LOGIN`
  * `LOGOUT`
  * `SIGNUP`

Your middleware should be responsible for invoking the appropriate `SessionApiUtil`
function and passing the appropriate callbacks. The success callback for `login` and
`signup` requests should `dispatch` a `receiveCurrentUser` action. The error callbacks should dispatch `receiveErrors`.

The success callback of `logout` should simply be to invoke `next(action)`.

#### Connecting `SessionMiddleware` and the `Store`

Let's establish the link between our `Middleware` and the `Store`.

#### `RootMiddleware`

Similar to our pattern for creating a `RootReducer`, we'll create a `RootMiddleware`.

  * create a new file, `middleware/root_middleware.js`
  * import `applyMiddleware` from `redux`
  * import your `SessionMiddleware`

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

#### Add `RootMiddleware` to the `Store`

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

**Test that your `SessionMiddleware` works** by dispatching `login`, `logout`, and
`signup` actions from the console and then checking your application state.

## Phase 2: Session Components and the Router

We're going to add routing to our application.

```
  npm install --save react-router
```

Before we add the `ReactRouter`, we'll need to refactor our component hierarchy a
bit. 

Define 2 new files: these can all live at the root of the `components` folder:

* `app.jsx`
* `root.jsx`

### The `App` component

Create and export a new **functional component** that renders an `<h1>` tag with
"Bench BnB" text and underneath renders `props.children`. It might look something like..

```javascript
const App = ({children}) => (
  <div>
    <h1>Bench BnB</h1>
    {children}
  </div>
);
```

### The `Root` component

Create and export a **functional component** called `Root`. The component should accept
the `Store` as a prop, and it should render the `Router` wrapped in the `Provider`

```javascript
const Root = ({store}) => (
  <Provider store={store}>
    // Router goes here...
  </Provider>
);
```

### The `Router`

Start by importing the following into `root.jsx`:

    * `React`
    * `Router`, `Route`, `IndexRoute`, `hashHistory`
    * `App`
    * `SearchContainer`

Next, we want to define and export a **functional component** that renders a
`Router`. Set up your `Router` to use `hashHistory`.

```javascript
const Root = ({store}) => (
  <Provider store={store}>
    <Router history={ hashHistory }>
      // Routes go here...
    </Router>
  </Provider>
);
```
#### Routes

Let's define a new `Route` that tells the `Router` to render our `App` component
when the URL matches '/':

```javascript
<Router history={ hashHistory }>
  <Route path="/" component={ App } />
</Router>
```

### The Entry Point

Let's modify our entry file, `bench_bnb.jsx`, to only import the following:
  * `React` & `ReactDOM`
  * `Root`
  * `configureStore`

In the document-ready callback, you should simply invoke `configureStore` and then
render the `Root` component into the `#root` container. Pass the `Store` to the
`Root` component as a prop.

```javascript
  document.addEventListener('DOMContentLoaded', () => {
    store = configureStore();
    const root = document.getElementById('root');
    ReactDOM.render(<Root store={store}/>, root);
  });
```

### `Greeting` Component

* Create a new react component, `Greeting`, and a container, `GreetingContainer`

If the user **is logged in**, then the `Greeting` should contain:
  * A welcome message including the user's username
  * A button to logout

If the user **is not logged in**, then the `Greeting` should contain:
  * A link to `/#/signup`
  * A link to `/#/login`

Change your `App` to render the `GreetingContainer` above our other content.

### `SessionForm` Component

  * Create a new component, `SessionForm`, and a container, `SessionFormContainer`
  * Create new routes for these components in your `router.jsx` file
    * The routes' paths should be `"login"` and `"signup`"

The `SessionFormContainer` should provide `SessionForm` with the following props:
  * `loggedIn` (boolean):  represents whether a `currentUser` exists.
  * `errors` (array):  list of errors from the state.
  * `formType` (string): 'login' or 'signup'.
  * `processForm` (function): dispatch `login` or `signup` based on `formType`.

The `SessionForm` component should be responsible for a number of tasks:
  * Render a controlled component with `state` governed by user interface.
  * Invoke the `processForm` prop when the 'submit' button is clicked.
  * Render a "Log in" or "Sign up" header based on the formType prop.
  * Provide a link to `/#/signup` or `/#/login` (whichever isn't the current address!)
  * Render a list of error messages if any are present.
  * Redirect the user to the `/#/` route if they are logged in.

**Call a TA over and show them your `SessionForm` before moving on!**

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
      window.currentUser = {"id":3,"username":"bobross"}
  </script>

  <main id="root"></main>
  ...
```

where `{"id":3,"username":"bobross"}` is inserted via `ERB`.

#### Interpolate the current user information

In your script, assign your `window.currentUser` to an ERB expression:

```js
  window.currentUser = <%=  %>
```

Make sure to use `<%= %>` so that the result of your ruby code is rendered into the
script ( it will eventually return a JSON object).

Inside your erb expression, `render` your jbuilder `_user` partial, passing it
the `current_user`. Specify the whole path, including `.json.jbuilder`, to prevent rails from automatically looking for a HTML partial. Mark your `render`
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
    const preloadedState = {session: {currentUser: window.currentUser}};
    ...
```

  * Pass this `preloadedState` to `configureStore`.
  * If there is no `window.currentUser`, then `configureStore`
  without any arguments.

**Test your code** by logging in and refreshing the page. You should stay logged in.

[maps-sf]: https://www.google.com/maps/place/San+Francisco,+CA/

## Phase 4: `Bench` redux cycle

In this phase, you will build the pieces necessary to display a basic index of
benches.

### `BenchesReducer`

In this step, we're going to create a reducer that manages the `benches` section
of our application state. We want to build a state that has the following shape:

```
  benches: {
    1: {id: 1, description: "...", lat: 0.0, lng: 0.0},
    2: {id: 2, description: "...", lat: 0.0, lng: 0.0},
    3: {id: 3, description: "...", lat: 0.0, lng: 0.0}
  }
```

Note that our `benches` object will use `bench_id` as the primary key.

* Create a file, `reducers/benches_reducer.js` that exports a `BenchesReducer` function.

Let's start by just setting up our `BenchesReducer` to return its default state:

```javascript
  const BenchesReducer = (state = {}, action) => {
    switch(action.type){
      //...
      default:
        return state
    }
  }

  export default BenchesReducer;
```

### Action Creators

#### Constants

Before we move on to the fun stuff -- populating our store with benches from rails -- we need to write an `actions` file that helps our other major pieces function.

  * Create an `actions` file: `actions/bench_actions`.
  * Create and export a new object, `BenchConstants`.

```javascript
  export const BenchConstants = {
    RECEIVE_BENCHES: "RECEIVE_BENCHES",
    REQUEST_BENCHES: "REQUEST_BENCHES"
  };
```

#### Action Creators

We need two `actions`: one that will tell our `Middleware` to go fetch all the benches from our Rails API, and one that tells our `Store` to change our application state to represent the bench data in our `action`.

The first action creator doesn't need to accept any arguments. It should just
return an `action` with type `REQUEST_BENCHES`. Call this function `requestBenches`.

The second action creator should accept a single argument, `benches`, and produce
an `action` with type `RECEIVE_BENCHES` and a `benches` property that represents
all of our bench data. Call this function `receiveBenches`.

Export these two functions. Before continuing, test that they return the correct objects.

Add `requestBenches` to the `window` (for testing later)!

```js
  window.requestBenches = requestBenches;
```

### `BenchesMiddleware`

Our `BenchesMiddleware` will be responsible for a number of things, including triggering api calls that eventually populate our `Store` with benches!

Remember, `Middleware` receives dispatches before the store. It can decide to intercept the dispatch, trigger another dispatch, or simply pass on it and do nothing.

  * Create a file, `middleware/benches_middleware.js`
  * Import the relevant `constants`.

```javascript
  import { BenchConstants } from '../actions/bench_actions.js';
```

Recall that [Redux Middleware][middleware-docs] employs a currying strategy to link
several `Middleware` to each other and ultimately to the store. You'll need to define 3 functions that wrap one-another like so:

```javascript
  const BenchesMiddleware = ({getState, dispatch}) => next => action => {
    // ...
  }
```
Let's start by writing some `Middleware` that will just `console.log` whenever it
sees a `REQUEST_BENCHES` action type.

```javascript
  const BenchesMiddleware = ({getState, dispatch}) => next => action => {
    switch(action.type){
      case BenchConstants.REQUEST_BENCHES:
        console.log('time to fetch!')
        return next(action);
      default:
        return next(action);
    }
  }
```

It is **very** important that we carefully consider where we invoke our `next` function. Once our middleware is finished doing whatever it needs to do, it needs to call the `next` middleware in the chain, passing it the same `action`. If our `Middleware` doesn't care about this `action`, then it should, by default, pass the action on to the next middleware in the chain.

Export your `BenchesMiddleware`!

```javascript
  export default BenchesMiddleware;
```

We'll come back to our `BenchesMiddleware` to flesh it out later. For now, remember to add it to our list of middleware in our `RootMiddleware`.

[middleware-docs]: http://redux.js.org/docs/advanced/Middleware.html

#### Recap

Since our last recap, we have: created a `bench_actions` file, that holds
action creators and `BenchConstants`. These help ensure that our `Views`,
`Middleware`, and `Store` are communicating effectively. We also created
`BenchesMiddleware`, which will be responsible for intercepting and triggering
bench-related dispatches.

Let's check that our setup works! Go to the console, and type:

```javascript
  Store.dispatch(requestBenches())
```

You should see the `console.log` that we imbedded in our `BenchesMiddleware`!
Make sure this works before moving on.

### `BenchApiUtil`

We are getting close to finishing the redux loop! In this step, we'll create an API utility for `BenchesMiddleware` to use that will request data via AJAX from our Rails server.

Create a file, `/util/bench_api_util.js`, that exports a function, `fetchBenches`.

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

Start by importing `fetchBenches`. Let's invoke it in our `BenchesMiddleware` whenever a `BenchConstants.REQUEST_BENCHES` action is received. For now, make `success` a function that logs the data from the response.

```javascript
  const BenchesMiddleware = ({getState, dispatch}) => next => action => {
    switch(action.type){
      case BenchConstants.REQUEST_BENCHES:
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
  Store.dispatch(requestBenches())
```

We should see a `console.log` of all our bench data!

Finally, we need to re-work our `BenchesMiddleware` so that instead of `console.log`ing the bench data, it dispatches the data as part of an action.

  * Import the `receiveBenches` Action Creator.
  * Re-write your success callback to dispatch a `RECEIVE_BENCHES` action with the
  response `data`.


```javascript
  case BenchConstants.REQUEST_BENCHES:
    const success = data => dispatch(receiveBenches(data))
    fetchBenches(success);
    return next(action);
```

### Back to the reducer

Update your `BenchesReducer` to update the `benches` in your state when it receives the `RECEIVE_BENCHES` action. Your reducer should look something like:

```javascript
  const BenchesReducer = function(state = {}, action){
    switch(action.type){
      case BenchConstants.RECEIVE_BENCHES:
        return action.benches;
      default:
        return state;
    }
  };
```

#### Recap

You should now be able to run the following in the console:

```javascript
  Store.getState(); //: returns default state object
  Store.dispatch(requestBenches());
  Store.getState(); //: returns a new state object, fully populated!
```

Congrats! **Call over a TA and explain your benches redux cycle.**

## Phase 5: `BenchIndex`

Let's create a component that shows our benches.

  * Let's start by making make two files: `components/bench_index.jsx` and
  `components/bench_index_container.js`

### The Container Component

We'll write our container component first. If we do a good job here, then our
presentational component should be fairly trivial! Inside your container component,  `connect` your `BenchIndex` as outlined below. Don't worry that we haven't constructed `BenchIndex` yet; but we'll fix that in the next step!

#### `mapStateToProps`

Our `BenchIndex` component needs `state` information about the `benches` in order to render.
Let's add the following function to `BenchIndexContainer`.

```javascript
  const mapStateToProps = state => ({
    benches: state.benches
  });
```

#### `mapDispatchToProps`

The `BenchIndex` also needs a way to trigger a request for benches once it has
mounted. Let's give it a `requestBenches` prop that it can use to call a dispatch with
the `requestBenches()` action creator.

```javascript
  const mapDispatchToProps = dispatch => ({
    requestBenches: () => dispatch(requestBenches())
  });
```

#### Export it!

Finally, let's use the `connect` function to export a new component that is
connected to our `Store`.

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

  class BenchIndex extends React.Component{
    componentDidMount(){
      // request benches from your API here
    }
    render(){
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

Remember, the Provider's sole purpose is to make the `Store` globally available in
our component hierarchy. Without the `Provider`, our `connect` functions won't work.

  * Create a new functional component called `Root` that accepts a `store` prop
  * `Root` should render the `BenchIndexContainer`, wrapped in the `Provider`
  * Be sure to pass the `Provider` the `store` prop
  * In the callback, invoke `ReactDOM.render`, and render the `Root` into the
  `#root` div. Be sure to pass `Root` the configured `Store`.
  * Your app should now be populated with benches!!

**Call over a TA** and walk them through your `BenchIndex` container and presentational components.

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

Next, let's make sure that our `SearchContainer` is the default component rendered
inside `App`. Use an `IndexRoute` to accomplish this.

```javascript
<Router history={ hashHistory }>
  <Route path="/" component={ App }>
    <IndexRoute component={ SearchContainer } />
    // other routes
  </Route>
</Router>
```

**Test your work. You've completed Day 1!**

[rails]: ../../../rails#readings-after-you-finish-all-videos
[onEnter]: ../../readings/on_enter.md
[context-docs]: https://facebook.github.io/react/docs/context.html
[store-context]: https://egghead.io/lessons/javascript-redux-passing-the-store-down-implicitly-via-context
