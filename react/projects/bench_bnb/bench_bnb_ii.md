# BenchBnB Day 2

## Phase 7: React Router

We'll need to modify our entry file, `bench_bnb.jsx`, to add routes.

* Install `ReactRouter`: `npm install --save --save-exact react-router@2.0.1`.
  * Use that exact version, as other versions might cause compatibility issues.
* In your entry file, require `Router`, `Route`, `IndexRoute`, and `hashHistory` from the `ReactRouter`.
* Create a `<Router>` that gets rendered by `ReactDom` when the page loads. 
* Create an `App` react component that renders `{this.props.children}`. Set this component to your root `<Route>`.
* Inside your `App` `<Route>`, render the `Search` component as the default 
`<IndexRoute>`.

Your entry file should now roughly resemble this:

  ```javascript
    // frontend/bench_bnb.js.jsx
  const React = require('react');
  const ReactDOM = require('react-dom');

  const ReactRouter = require('react-router');
  const Router = ReactRouter.Router;
  const Route = ReactRouter.Route;
  const IndexRoute = ReactRouter.IndexRoute;
  const hashHistory = ReactRouter.hashHistory;

  const Search = require('./components/Search');

  const App = React.createClass({
    render() {
      return (
          <div>
            <header><h1>Bench BnB</h1></header>
            {this.props.children}
          </div>
      );
    }
  });

  const Router = (
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Search}/>
      </Route>
    </Router>
  );

  document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('content');
    ReactDOM.render(Router, root);
  });
  ```

Verify that your app still renders correctly before moving on.

## Phase 8: Creating Benches

### Adding a Bench Form

* Create a new React component, `BenchForm`. This should render a simple form
  with 4 fields:
    * Description
    * Number of seats
    * Latitude
    * Longitude
* Add a new `seating` column to the `benches` table.
  * This new column will store how many people can sit together on the
    bench at the same time.
* Create a new `<Route>`, `/benches/new`, for your `BenchForm` component.
  *  Test the route by navigating to `/#/benches/new`; the map should disappear.
* Write a `create` method on your `BenchesController` and give it a corresponding
  route in `routes.rb`.
* Add a `createBench` function to the `BenchApiUtil`. It should make a `POST`
  request to your API. 
* Test `BenchApiUtil.createBench` from the console.
* Add `BenchActions` to `createBench` and `receiveBench`.
* `BenchForm` should call `BenchActions.createBench` upon submission.


### Navigating to the BenchForm

Filling in coordinates manually is a major pain; Let's make things a little easier 
by bringing up a new bench form when a user clicks on the map and pre-filling it 
with latitude and longitude based on where they clicked.


Because `BenchMap` and `BenchForm` live under different routes, We can't simply pass props between them to convey our click information. We will need to encode our parameters in a client-side query string.


#### Redirecting with coordinates

Let's get down to business. Add a `"click"` handler to the map. It
should:

* Grab the coordinates from the click event.
* Use the router's [hashHistory][react-history] to redirect to the `BenchForm`
  URL, providing the `lat` and lng` as query params.

To pass `lat` and `lng` as query params: 
  0.  Require the `hashHistory` module in the `BenchMap`.

  ```javascript
    const hashHistory = require('react-router').hashHistory;
  ```

  0.  Use `hashHistory#push` to send data along with the new `pathname`.

  ```javascript
    _handleClick(coords){
      hashHistory.push({
        pathname: "benches/new",
        query: coords
      });
    }
  ```

Test this before moving on. You should be able to click the map and make the
browser redirect to a URL that looks something like:

  */#/benches/new?lat=37.79153217974085&lng=-122.40194320678711*

### Pre-filling the form
Inside of the `BenchForm` component, pre-fill the value of the lat/lng input 
fields by accessing `this.props.location.query`. Then make sure the lat/lng input 
fields are disabled so that users can't edit them.

Awesome! Now users can easily create new benches.

## Phase 9: Front-End User Authentication

In this phase, we are going to implement front-end user sign-up and login.
Goodbye Rails views; hello, single-page app! **Read through the instructions for
the entire phase before building anything.** This will give you the context to
understand each individual step.

**Our authentication pattern must:**
  * sign up new users,
  * know who's logged in, 
  * log users in, 
  * log them out, and 
  * restrict access to certain routes based on whether someone is logged in.

### 1. Build Your Backend.

Read the instructions below, and then create an API with the following 
endpoints:
  * [POST] api/users: "users#create" (signup),
  * [POST] api/session: "session#create" (login),
  * [DELETE] api/session: "session#destroy" (logout),
  * [GET] api/session: "session#show" (fetch current user)

 **Create a `User` model, `UsersController`, and `SessionsController`.** Follow
 the basic pattern you used during the [Rails curriculum][rails], with some key
 differences:

* **Namespace**: Your controllers should live under an `Api` namespace.
* **Response Format**: render JSON formatted responses by default.
* **Views**: You'll probably want an **`api/users/show.json.jbuilder`**, which you can use for multiple controller actions.
* **`Sessions#show`**: This action should render the `current_user`, if any.
  * If no one is logged in, return an empty `{}`.
* **`Sessions#destroy`**: render an empty `{}` upon successful logout.
  * Render a `404` message if there is no `current_user` to logout.
* **Auth Errors**: Render auth errors (e.g. 'invalid credentials' or 'username 
already exists') in your response with a corresponding error status.
  * Use `@user.errors` when applicable.
  * Render single errors in the format `{base: ['error message here']}`
  * ex. `render json: {base: ['invalid credentials']}, status: 401`
  * **Caution**: Error responses are formatted differently than normal 
  responses.

Test your routes using `$.ajax` in the console before moving on.

### 2. Build Your Frontend

Once your API is fully built and tested, set up the following flux architecture 
components.

####SessionApiUtil

Create a `SessionApiUtil` with the following methods: 
  * **`signup`:** POST 'api/users'
  * **`login`:** POST 'api/session'
  * **`fetchCurrentUser`:** GET 'api/session'  
  * **`logout`:** DELETE 'api/session'

Each `SessionApiUtil` method should take `success` and `error` callbacks.

Before moving on, put `SessionApiUtil` on the window in your entry file and test 
it out. Make sure all your endpoints behave properly for both successful and 
erroneous requests. Pay attention to: 
* the `Network` tab of Dev Tools
* the Rails server logs

####SessionStore

Create a `SessionStore` that will keep track of the current user.

**Variables:** 
  * `_currentUser`: should be `{}` if no one is logged in.
  * `_currentUserHasBeenFetched`: a boolean of whether the API has been queried
**Closures:** 
  * `_login`: set `_currentUser` and `__emitChange()`
  * `_logout`: set `_currentUser` to `{}` and `__emitChange()`
**Public Methods:** 
  * `currentUserHasBeenFetched`: a reader
  * `currentUser`: a reader
  * `isUserLoggedIn`: should return a boolean of whether a user is logged in
    * hint: you can check `_currentUser.id`
`SessionStore.__onDispatch`
  * Define `SessionConstants` for `LOGIN` and `LOGOUT`
  * Setup `SessionStore.__onDispatch` to call the appropriate methods 

####SessionActions

0. Create **`signup`, `login`, and `logout`** methods for client-generated actions:
Each method should:
  * Invoke the appropriate `SessionApiUtil` action.
  * Pass `receiveCurrentUser` as a `success` callback.

0. Write 'receiveCurrentUser'
  * dispatch to the `SessionStore`

Attach your `SessionActions` to the window and test them out before moving on.

### 3. Create `LoginForm` and `SignupForm`

Create a `LoginForm` component and a React `Route` for it.

  * `render` a form for users to enter their username and password.
  * `onSubmit`, call your `SessionActions#login` and pass in the credentials.
  * After a successful login, redirect to your root Route (`/`)
    * In `#componentDidMount`, register a listener with the `SessionStore`. 
    * When the `SessionStore` emits change, check if a user is logged in.
    * If so, redirect them (`this.context.router.push("/")`).

Once your `LoginForm` works, make a similar `SignupForm` component and route that calls `SessionActions#signup`.

### 4. Errors

Your forms should display errors if user submissions cause validation/authentication errors.

####  Create an `ErrorStore`.

Variables: 
* `_errors`: This `{}` should store key-value pairs where: 
  * each key is an error field, and 
  * each value is an array of error messages for that field.
    ```js
    _errors === {
      username: [
        "has already been taken",
        "is too short (minimum is 4 character)"
      ],
      password: [
        "is too short (minimum is 6 characters)"
      ]
    }
    ```
*`_form`: The store should only ever have the errors for a single form. This
variable should store the name of the form currently being tracked as a string.

Public Methods:
* `formErrors`: takes a `form` argument and returns a copy of `_errors` if and only
if `form === _form`.
* `form`: returns the current `_form`.

Closures: 
* `setErrors`: takes a `form` name and an `errors` object and saves them in `_form`
and `_errors`; emits change.
* `clearErrors`: sets `_form` and `_errors` to `""` and `{}` respectively; emits
change.

`__onDispatch`: 
Create `ErrorConstants` and handle the following `actionTypes`: 
* `ErrorConstants.SET_ERRORS`
* `ErrorConstants.CLEAR_ERRORS`
* Wait until 

####  Define `ErrorActions`.

Define the following actions: 
* `setErrors`
* `clearErrors`

Both methods should take the raw API error response generated by your `$.ajax` call and dispatch the proper error information to your `ErrorStore`. Keep in mind that `$.ajax` error responses return XHR objects, not raw response data, which live in the `.responseJSON` attribute of the XHR object returned.

Once you've written these methods, return to your `SessionActions` and `SessionApiUtil`: 
* Modify `SessionApiUtil` so that your methods take an `error` callback to invoke in  the `error` response of your `$.ajax` call.
* Modify `SessionActions` to pass `ErrorActions.setErrors` as the `error` argument to your `SessionApiUtil`.

####  Update your `LoginForm` and `SignupForm`

Your components should listen to your `ErrorStore` on `componentDidMount`. Make
sure they track `this.state.errors`. When the store changes, `setState` to 
the new errors on the form. Make sure to check `ErrorStore.form` to ensure that
your `LoginForm` doesn't render `SignupForm` errors and vice versa.

Update both forms to `render` their errors if any are present.

### 4. Create a greeting in the header.
Modify your app to provide a greeting to users when they are signed in.
  * In the `App` component, render a `<header>` with information about the 
  `SessionStore#currentUser`.
  * If a user is logged in, display their username and a logout button.
    * `onClick` of logout button, `preventDefault` and `SessionActions#logout`
  * If user IS NOT logged in, give them links to "#/login" and "#/signup"

### 5. Fetch the current user before the app mounts
We want to make sure that we don't render the app without first trying to fetch the current user. We're going to use the react-router's [onEnter][on-enter-hook] hook to accomplish this.

  * Add on `onEnter` prop to the root route
    ```javascript
      <Route path="/" component={ App } onEnter={ _ensureUserFetched }>
    ```
  * Next, let's define an `_ensureUserFetched` function. It can be right in bench_bnb.jsx. It won't be big.
  * At this point, just put a `debugger` in there and make sure that you hit it when you try to refresh the page. Your onEnter hook will be called whenever you navigate to that route. Check out the `arguments` it gets:
    * 1st argument: next state. We won't use this one today.
    * 2nd: `replace` function. This function replaces the current path with another one you give it. We can use this to redirect them to another route (ie: `replace("/login")`)
      * The reason it's called "replace" and not "redirect" or "push" is because it replaces the current entry in the browser's history. The browser keeps track of all the paths the user visits in it's history, for the "forward" and "back" buttons to work. By replacing the current history entry, we're saying "hey browser, the user didn't actually go to /benches/new. They're going to /login."
    * 3rd: `asyncCompletionCallback`: By default, the Router is going to instantiate the component for the route and render it right away after the `onEnter` hook is done. The problem in this case, is that we might have to do an async AJAX request to `#fetchCurrentUser` to see if anybody is logged in before proceeding. In the meantime, we don't want to render the component. The Router gives us this third argument. If our onEnter hook takes 3 arguments in it's signature, then the Router will wait until we either invoke the `asyncCompletionCallback` function or `replace` the route before continuing.
* In your `_ensureUserFetched`, check wether `SessionStore#currentUserHasBeenFetched`. If it has, immediately invoke `asyncCompletionCallback`. Otherwise, invoke SessionActions#fetchCurrentUser. Pass the `asyncCompletionCallback` function to the action creator, which should in turn pass it to the `SessionApiUtil`. Inside of `SessionApiUtil#fetchCurrentUser` use the `jQuery#ajax` [complete][jquery-ajax] property to invoke `asyncCompletionCallback` once the request has completed.

Your `_ensureUserFetched` function should look something like this:

  ```javascript
    function _ensureUserFetched(nextState, replace, asyncDoneCallback){
      if ( SessionStore.currentUserHasBeenFetched() ) {
        //If the current user has already been fetched, we're done!
        asyncDoneCallback();
      } else {
        //If not, let's initiate the fetch, and pass the asyncDoneCallback to be invoked upon completion
        SessionActions.fetchCurrentUser(asyncDoneCallback);
      }
    }
  ```

### 6. Protect your front-end routes
Let's make sure users can't get to our "/benches/new" or "benches/:id/review" routes on the frontend if they're not logged in.

  * Add an `onEnter` prop to the Routes we want to protect (ie: `<Route path="something" onEnter={ _ensureLoggedIn } />`).
  * In your `_ensureLoggedIn` function, check `SessionStore#isUserLoggedIn`
    * If they are logged in, we don't have to do anything! If they are _not_ logged in, let's `replace` the path with "/login"
    * We don't need to define this method to accept the 3rd parameter, since `_ensureLoggedIn` runs synchronously


## Phase 10: Filtering By Seating
### FilterParams store ###
* create a new store for the filter params. This will contain the data about the bounds and the min and max seating params.
* it should store this information as a POJO with keys of the param name and values of the param's value.
* make a new `filter_actions.js` file to contain the actions relevant to the filter store.
* your filter store should register a callback with the dispatcher and update it's data according to the action that was dispatched
* your search component should hold the params as part of it's state and register a change listener on the filter params store so that it re-fetches the benches when the params in the FilterParams store changes.
* refactor your map component to use a FilterParams action to change the FilterParams store when the map idles
*  the search component should listen to the filter params store for a change event and update it's state to always contain the current parameters.
* the search component should also re-fetch the benches when the filter params store emits a change event
* your ApiUtil function should get the current params from the FilterParams store when it is called and make a get request using the params as a query string
* once you can properly change the benches in the index by moving the map, move on to the FilterParams component.

### FilterParams component ###

* create a new React Component that will be used to filter benches by
  seating
* this should be a child component of the Search view (not a child route, but a child component) and have a field for minSeats and a field for maxSeats
* when the user changes the values of the fields in the component, call one of the filter actions you wrote to update the FilterParams store with the new values
* when the FilterParams store is update and emits a change event, this should cause the Search component to update its state and fetch the benches with the current params
* when the response from the server comes back with the new benches, this should cause the index to re-render displaying the filtered benches
* move on when you can filter by number of seats

## Phase 11: Show Page
* when the bench is clicked on in the index, you will now show the Show
  page which is a page dedicated to a single bench
* clicking a marker on the map search view should also navigate to the
  show page
* create a new component for your show page
* create a new route that will render your new component into the App component's `{this.props.children}`
* this component should have the information about the bench as well as a map with a marker for the single bench
* you will want to nest a map component inside of the showPage component's render function, and make sure this bench ends up in the map's `props`
* center the map on the single bench and prevent the map from being dragged

## Phase 12: Reviews
* on the show page, a user should be able to add reviews
* create a new component for the review form
* create a new route that is nested under the show page route to render this component
* update your show page to either render the new review component or a link to the new route
* change the showPage component to either render the nested route component for the form or a link to the route for the form
* you will also have to add reviews to your backend. They have a text body and a score from 1 to 5
* in the index, show the average score for each bench

## Phase 13: Pictures!
* when you create a new bench, allow a user to also add a photo using
  [Cloudinary][cloudinary-js]!
* you will need to create a new column in your benches table
* display these pictures on both the show page and the index

## Bonus
* every bench can have multiple photos
* show page should have a carousel
* display the score as a list of star images!
* users can favorite benches

[rails]: ../../../rails#readings-after-you-finish-all-videos
[google-map-doc]: https://developers.google.com/maps/documentation/javascript/tutorial
[event-doc]: https://developers.google.com/maps/documentation/javascript/events#MarkerEvents
[map-markers]: https://developers.google.com/maps/documentation/javascript/markers
[lat-lng-docs]: https://developers.google.com/maps/documentation/javascript/reference#LatLngBounds
[react-router-source]: https://cdnjs.cloudflare.com/ajax/libs/react-router/1.0.0-rc1/ReactRouter.min.js
[react-history]: https://github.com/reactjs/react-router/blob/master/docs/guides/Histories.md
[on-enter-hook]: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback
[jquery-ajax]: http://api.jquery.com/jquery.ajax/#jQuery-ajax-settings
[cloudinary-js]: http://cloudinary.com/documentation/upload_widget
