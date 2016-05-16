# BenchBnB Day 2

## Phase 7: React Router
* install the react router using `npm install --save react-router`
* instead of using `ReactDOM.render` to directly place your `Search`
  component directly into `#content`, set up the router to render
  `Search` as the default route
* create an `App` react component that renders `{this.props.children}`, mine looked
  like this:

```javascript
  // frontend/bench_bnb.js.jsx
var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;

var Search = require('./components/Search');

var App = React.createClass({
  render: function(){
    return (
        <div>
          <header><h1>Bench BnB</h1></header>
          {this.props.children}
        </div>
    );
  }
});

var Router = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Search}/>
    </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', function(){
  var root = document.getElementById('content');
  ReactDOM.render(Router, root);
});
```
* `this.props.children` will contain all components from nested routes.

* when your app works exactly as before we introduced the router, you
  may move on

## Phase 8: Creating Benches
### Adding a Bench Form ###
* create a new React component, `BenchForm`. This should render a simple form
  with 4 fields:
    * Description
    * Number of seats
    * Latitude
    * Longitude
* add a new column to the `benches` table, `seating`
  * this new column will store how many people can sit together on the
    bench at the same time
* create a new route, `/benches/new`, for this new `BenchForm` component
* test the route by navigating to `#/benches/new`, the map should disappear
* add a `createBench` function to the `ApiUtil`. It should make a `POST`
  request and then add the newly created bench using a new action that
  you must create
* submission of the form should run `ClientActions.createBench`
* test that this works by creating a new bench through the form before moving on

#### Navigating to the BenchForm ###

Filling in coordinates manually is a major pain. Users probably won't
even bother. Then we'll have no business and our marketing team will
hate us.

Let's make things a little easier by bringing up a new bench form when a
user clicks on the map and pre-fill it with latitude and longitude based
on where they clicked.

But how can we accomplish this? How are we going to get that data from
the map page to the new bench form? Well, the React Router has a really
useful feature here. Notably, you can encode parameters in a client-side
query string.

##### Redirecting with coordinates

Let's get down to business. Add a `"click"` handler to the map. It
should:

* Grab the coordinates from the click event.
* Use the router's [hashHistory][react-history] to redirect to the `BenchForm`
  URL...
* In order to pass the lat / lng data from the `Map` to the `BenchForm` component,
  we need to include that data in the query string.
  * First, make sure the `Map` requires the hashHistory module.

  ```javascript
    var hashHistory = require('react-router').hashHistory;
  ```

  * Then, we can use the `hashHistory#push` method to send some data in the query
    string when we click on the map.

  ```javascript
    _handleClick: function(coords){
      hashHistory.push({
        pathname: "benches/new",
        query: coords
      });
    }
  ```

Make sure that this works before moving on. You should be able to click the map and
the browser should redirect to a URL that looks something like:

  */#/benches/new?lat=37.79153217974085&lng=-122.40194320678711*

##### Pre-filling the form

  * Inside of the `BenchForm` component, pre-fill the value of the lat/lng
    input fields by accessing `this.props.location.query`
  * Also make sure the lat/lng input fields are disabled so that users can't edit them

Awesome! Now users can easily create new benches to their hearts'
content. Hopefully that will keep the marketing team off our backs.

## Phase 9: Front End User Authentication
In this phase, we are going to implement front-end user sign-up and login. Goodbye Rails views; hello, single-page app!

### 1. Build Your Backend.

You should already know how to do this. Create a User Model, Users Controller, and Sessions Controller.

Follow the pattern you used during the [Rails curriculum](#), keeping in mind the following: 
  * Your controllers should live under an `Api` namespace and return JSON formatted responses.
  * We only care about one user (the current user), so adjust your routes and controllers accordingly (i.e. you have a single user `resource`, not `resources`).
  * `Sessions#show` should return the `current_user` if she or he exists.
  * If any auth errors arise (e.g. 'invalid credentials' or 'username already exists'), return those errors in your response with a corresponding error status. 

### 2. Build Your Frontend.
Set up the following flux architecture components.
####UserStore
  * Keep track of the `_currentUser`, if any. 
  * Keep track of any `_authErrors`, if they arise.

####UserActions 
  * `fetchCurrentUser`
  * `login` a user
  * `logout` a user if one is logged in
  * `create` a user
  * `destroy` a user account

These actions should all rely on the UserApiUtil to make the actual request.

####UserApiUtil
  * `fetchCurrentUser`
  * `login` a user
  * `logout` a user if one is logged in
  * `create` a user
  * `destroy` a user account

Make sure to provide `success` and `error` callbacks to your queries. What do the error callbacks do?

#### CurrentUserStateMixin
Say you have multiple components that will want to update themselves based on who is logged in. Those components have a *cross-cutting concern*, i.e. a shared need for certain functionality. 

React deals with cross-cutting concerns by allowing [**Mixins**](https://facebook.github.io/react/docs/reusable-components.html#mixins). A mixin is simply an object full of functions that can be added to a component. It is analogous to a Ruby `module`; generically, we could call it a *namespace*. 

We are going to create a `CurrentUserStateMixin` that can be added to any component that wants to keep track of the current user.

So let's start by creating a new file `frontend/mixins/current_user_state.js`. This file is going to export an object called `CurrentUserStateMixin`, which will have three functions:
  * `getInitialState`: get the currentUser and authErrors from the UserStore and add them to `this.state`.
  * `componentDidMount`: 
    * Add a UserStore listener that will `updateUser`
    * `fetchCurrentUser` if the `UserStore.currentUser` is undefined.
  * `updateUser`: update the state of currentUser and authErrors.

We can add this mixin to any component by requiring it and adding it under the property `mixins` like so: 

```
var Component = React.createClass({
    mixins: [CurrentUserStateMixin],
    //other methods go here
})
```

Now our `Component` has all the methods we wrote in `CurrentUserStateMixin` and we can easily sprinkle that functionality wherever else it's needed.

Don't worry if you want to do other things at those life-cycle events (e.g., have more initial state). Write your component hooks as normal, and React will run both the mixin hook and your hook when the event triggers.

### 3. Create a LoginForm
Use your sprinkly-shiny mixin to create a `LoginForm` component in your App that shows a login/signup form if nobody is logged in, and greets the user and gives them a logout button if they are logged in. Make sure to show errors if they screw up the forms!


## Phase 10: Filtering By Seating
### FilterParams store ###
* create a new store for the filter params. This will contain the data about the bounds and the min and max seating params.
* it should store this information as a POJO with keys of the param name and values of the param's value.
* make a new `filter_actions.js` file to contain the actions relevant to the filter store.
* your filter store should register a callback with the dispatcher and update it's data according to the action that was dispatched
* your search component should hold the params as part of it's state and register a change listener on the filter params store so that it re-fetches the benches when the params in the FilterParams store changes.
* refactor your map component to use a FilterParams action to change the FilterParams store when the map idles
*  the search component should listen to the filter params store for a change event and update it's state to always contain the current paramters.
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

[google-map-doc]: https://developers.google.com/maps/documentation/javascript/tutorial
[event-doc]: https://developers.google.com/maps/documentation/javascript/events#MarkerEvents
[map-markers]: https://developers.google.com/maps/documentation/javascript/markers
[lat-lng-docs]: https://developers.google.com/maps/documentation/javascript/reference#LatLngBounds
[react-router-source]: https://cdnjs.cloudflare.com/ajax/libs/react-router/1.0.0-rc1/ReactRouter.min.js
[react-history]: https://github.com/reactjs/react-router/blob/master/docs/guides/Histories.md
[cloudinary-js]: http://cloudinary.com/documentation/upload_widget
