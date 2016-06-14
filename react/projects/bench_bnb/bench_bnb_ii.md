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

Our authentication pattern must: 
  * sign up new users,
  * know who's logged in, 
  * log users in, 
  * log them out, and 
  * restrict access to certain `Routes` based on whether someone is logged in.

### 1. Build Your Backend.

Create an api with the following endpoints: 
  * [POST] api/user: "users#create" (signup),
  * [POST] api/session: "session#create" (login),
  * [DELETE] api/session: "session#destroy" (logout),
  * [GET] api/session: "session#show" (fetch current user)

You should already know how to do this. Create a `User` model, `UsersController`, 
and `SessionsController`. Follow the pattern you used during the [Rails curriculum][rails], keeping in mind the following:
  * Your controllers should live under an `Api` namespace and return JSON formatted responses.
  * `Sessions#show` should render an object of the `current_user` if they exist.
    * If no one is logged in, 
    * We'll use this to see who's logged in.
  *  You'll probably want an **`api/users/show.json.jbuilder`**, which you can use for multiple controller actions.
  * If any auth errors arise (e.g. 'invalid credentials' or 'username already exists'), render those errors in your response with a corresponding error status.
    * ex `render json: ["error 1", "error 2"], status: 404`
  * Protect any routes that get or post user-specific information with `before_action` filters:
    * `before_action :ensure_correct_user, only: [:this_action, :that_action]`

Test your routes using `$.ajax` in the console before moving on.

### 2. Build Your Frontend

Set up the following flux architecture components.

####SessionApiUtil

Create a `SessionApiUtil` with the following methods: 
  * `signup`
    * POST to 'api/users'
    * On success, call `SessionAction#receiveCurrentUser`.
  * `login`
    * POST to 'api/session'
  * `logout`
   and `#logout` via AJAX!
    * AJAX calls like any other. Remember you might need the credentials in the `Api::SessionController`, so have to send those.
  * `#fetchCurrentUser`
    * AJAX request to `Api::SessionsController#show`
    * `render "api/users/show.json.jbuilder"` of the `current_user`
  * Make sure the response is what you expect in the `success`
    * No need to render anything in `Api::SessionsController#destroy`. `render json: {}` is fine.
  * Attach it to the window to test out in the console. Call `SessionApiUtil#login`. You should see the request in the Network tab in Developer Tools, also in the `rails server`. Make sure the response in the Network tab contains the json for the currentUser.

####SessionStore
  * Keep track of a `_currentUser`, I would set this to `{}` if there isn't a user
  * Keep track of a boolean of whether `_currentUserHasBeenFetched`
  * `#isUserLoggedIn` should return a boolean of whether a user is logged in
    * hint: you can check `_currentUser.id`
  * `#currentUser`

####SessionActions
  * `#signup`, `#login`, `#logout`
    * these should invoke the corresponding `SessionApiUtil` method and pass the appropriate callback
  * `#receiveCurrentUser`
    * should dispatch to `SessionStore`
  * `#removeCurrentUser`
    * Dispatches to `SessionStore` to reset `_currentUser`, logging them out
  * Once you have this, attach the store and `SessionApiUtil` to the window to test it out. Make sure it works before moving forward. You should be able to `#login` from the console and then see `SessionStore#currentUser`.


### 3. Create a LoginForm
Create a `LoginForm` component and make a front-end route for it.

  * Render a form for users to enter their username and password.
  * `onSubmit`, call your `SessionActions#login` and pass in the credentials
  * After they log in, send them back to the root (`/`)
    * hint: In `#componentDidMount`, register a listener with the `SessionStore`. When the store `__emitChange`, check if user is logged in, and if so, send them to the root (`this.context.router.push("/")`).
    * User will then be at the root, but still have no way of telling they're signed in. We'll deal with that later.
  * Now also make a signup form component that calls `SessionActions#signup`

#### Errors
Let's display errors in case users enter bad data into the forms and fail validations/authentication.

  * Make an `ErrorStore`
    * Keep track of `_errors` and `_form`. The store should only ever have the errors for a single form.
    * You have 2 options for what `_errors` should look like. You can keep track of `errors.full_messages`, (ie: `_errors === ["Username has already been taken", "Username is too short (minimum is 4 characters)", "Password is too short (minimum is 6 characters)"]`) or by field, ie:

        ```
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

  * Make `ErrorActions#setErrors` and `#clearErrors`. Call these in the error callback for `SessionApiUtil#login` and `#signup`.
    * hint: the first argument to $.ajax#error is the xhr. Check in there for the error data you sent back from the server
    * Make sure you're rendering relevant errors from your controllers. If you decide to keep track of errors by field, `render json: @user.errors` works great!
  * Make your `LoginForm` listen to your `ErrorStore` on `#componentDidMount`. When the store changes, re-render and include any errors you might need to display on the form. Check the `ErrorStore#form` to make sure the errors in the are for the `LoginForm`.
    * If you choose to store errors by field, you can display them nicely alongside each field.

### 4. Create a greeting in the header
Let's let users know who is currently signed in.

  * In the `App` component, render a `<header>` with information about the `SessionStore#currentUser`
  * If user is logged in, display their username and a logout button.
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
