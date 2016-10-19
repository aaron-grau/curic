# BenchBnB Phase 2 - Benches!

Check out the live demo [here][live-demo]!

[live-demo]: http://aa-benchbnb.herokuapp.com

[maps-sf]: https://www.google.com/maps/place/San+Francisco,+CA/

## Phase 4: `Bench` Redux Cycle

In this phase, you will build the pieces necessary to display a basic index of
benches.

### `BenchApiUtil`

To start, let's create an API utility for `BenchesMiddleware` to use that will request data via AJAX from our Rails server.

+ Create a file, `/util/bench_api_util.js`, that exports a function, `fetchBenches`.

This function should accept a single argument: `success`, a callback. It should
then dispatch an `$.ajax` request, passing `success` to the `$.ajax` call.
Define an error callback, to, for debugging.

Your function should look something like this:

```javascript
// frontend/util/bench_api_util.js

export const fetchBenches = success => {
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

### Bench State Shape

We want to build a bench state that has the following shape.

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

Note that our benches object use each bench's id as a primary key.

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
// frontend/bench_bnb.jsx

window.requestBenches = requestBenches;
requestBenches(); //=> { type: 'REQUEST_BENCHES' }
```

Remember to require `requestBenches` for testing

### Bench Reducer
In this step, we're going to create a reducer that manages the `benches` section
of our application state.

* Create a file, `reducers/benches_reducer.js` that exports a `BenchesReducer` function.

Let's start by just setting up our `BenchesReducer` to return its default state:
Remember to use `Object.freeze` to prevent the state from being mutated.

```javascript
// frontend/reducers/benches_reducer.js

import merge from 'lodash/merge';

const BenchesReducer = (state = {}, action) => {
  Object.freeze(state)
  switch(action.type) {
    //...
    default:
      return state
  }
}

export default BenchesReducer;
```

Then add `BenchesReducer` to your `root_reducer.js`

```javascript
// frontend/reducers/root_reducer.jsx

import { combineReducers } from 'redux';

import BenchesReducer from './benches_reducer';
import SessionReducer from './session_reducer';

const RootReducer = combineReducers({
  benches: BenchesReducer,
  session: SessionReducer
});

export default RootReducer;
```

At this point, our default application state should look like this.

```js
{
  session: {
    currentUser: null,
    errors: []
  },

  benches: {}
}
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

+ Let's start by writing some `Middleware` that will just `console.log` whenever it sees a `REQUEST_BENCHES` action type.

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

### Connect `BenchesMiddleware` to `BenchAPIUtil`

Let's connect our `BenchesMiddleware` to this new `fetchBenches` function!

Start by importing `fetchBenches`. Let's invoke it in our `BenchesMiddleware`
whenever a `REQUEST_BENCHES` action is received. For now, make `success` a
function that logs the data from the response.

```javascript
// frontend/middleware/bench_middleware.js

import { fetchBenches } from '../util/bench_api_util';
import { REQUEST_BENCHES } from '../ actions/bench_actions';

const BenchesMiddleware = ({ getState, dispatch }) => next => action => {
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

Finally, we need to re-work our `BenchesMiddleware` so that instead of `console.log`ing
the bench data, it dispatches the data as part of an action.

* Import the `receiveBenches` Action Creator.
* Re-write your success callback to dispatch a `RECEIVE_BENCHES` action with the
response `data`. To do this you'll need to add another case statement. It
should look something like the following.

```javascript
case REQUEST_BENCHES:
  const success = data => dispatch(receiveBenches(data));
  fetchBenches(success);
  return next(action);
```

### Back to the reducer

Update your `BenchesReducer` to update the `benches` in your state when it receives
the `RECEIVE_BENCHES` action. Your reducer should look something like:

```javascript
// frontend/components/reducers/benches_reducer.js

import { RECEIVE_BENCHES } from '../actions/bench_actions';

const BenchesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_BENCHES:
      return action.benches;
    default:
      return state;
  }
};
```

## Phase 5: `BenchIndex` Components

Let's create a component that shows our benches.

* First we'll start by making make two files: `components/bench_index.jsx` and
`components/bench_index_container.js`

After we've made both of these components, we'll add the container to our
router in `root.jsx` to it's rendered when users visit our site.

### The Container Component

Inside your container component, `connect` your `BenchIndex` as outlined below.
Don't worry that we haven't constructed `BenchIndex` yet; but we'll fix that in
the next step!

#### `mapStateToProps`

Our `BenchIndex` component needs `state` information about the `benches` in order to render.

#### `mapDispatchToProps`

The `BenchIndex` also needs a way to trigger a request for benches once it has
mounted. Let's give it a `requestBenches` prop that it can use to call a
dispatch with the `requestBenches()` action creator.

#### Export it!

Finally, let's use the `connect` function to export a new component that is
connected to our `store`.

```javascript
// frontend/components/bench_index_container.jsx

import BenchIndex from './bench_index.jsx'

//...

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BenchIndex);
```

### The Presentational Component

Let's create the `BenchIndex` presentational component. It should render a list of benches, showing the description of each bench.

```javascript
// frontend/components/bench_index.jsx

class BenchIndex extends React.Component {
  componentDidMount() {
    // request benches from your API here
  }

  render() {
    // ...
  }
};
```

Create another `BenchIndexItem`, to clean up your `BenchIndex` component's
`render()` function.

### Render Time!

Let's make sure that our `BenchIndexContainer` is the default component rendered
inside `App`. Use an `IndexRoute` to accomplish this.

```javascript
const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={BenchIndexContainer} />
        <Route path="/login" component={SessionFormContainer} />
        <Route path="/signup" component={SessionFormContainer} />
      </Route>
    </Router>
  </Provider>
)
```

Your app should now be populated with benches! **Confirm with a TA.**

---

## Phase 6: The Map

Now we're going to add a map alongside our index to visually convey our bench
information. When it's done, we'll replace `BenchIndexContainer` with a new
`SearchContainer` in the `IndexRoute` in the router. This will allow us to
search and display benches.

### Create a `BenchMap` component.

* Create a new React component class `BenchMap`.
* Its `render` function should return a `div` with `id='map-container'` and
`ref='map'`.
* In the `application.css` file, make sure to set the `width` and `height` of the
`#map-container` to `500px`.
* We'll return to this component in a bit.

### Create a arent component: `Search`

* Create a new React component, `Search`.
* `Search` should render a `div` containing a `BenchMap` and `BenchIndex`.
* Remove your `BenchIndexContainer` and instead, create a `SearchContainer`.
* `Search` should then pass the appropriate props to `BenchIndex`.
* **You shouldn't have to change `BenchIndex`**.

Since our `Search` component only needs a render method, we can make it a
[functional component][functional-comp-docs] with an implicit return! Make sure to
deconstruct your props for cleaner syntax.

### Render your `SearchContainer`

* In your `IndexRoute`, render the `SearchContainer` component instead of
`BenchIndexContainer`. This should cause both the `BenchMap` and the `BenchIndex`
to be rendered on the page.
* Verify your work before moving on.

### Attach a Google Map to `BenchMap`

* Read [the google maps documentation][google-map-doc].
* Get a new API key for a JavaScript Google Map.
* Add a script tag (including your API key) to your `application.html.erb`
  * When including the google script tag, be sure to put it above `yield` and
    remove the `async defer` bit. This way, the script will fully load before the
    rest of your page and be ready to use as soon as your app mounts.

```html
<!-- application.html.erb: -->
<!DOCTYPE html>
  <html>
  <head>
    <title>BenchBnb</title>

    <%= javascript_include_tag "https://maps.googleapis.com/maps/api/js?key={YOUR_API_KEY}" %>
    <%= stylesheet_link_tag    'application', media: 'all' %>
    <%= csrf_meta_tags %>
    <%= javascript_include_tag 'application' %>
  </head>
  <body>

  <%= yield %>

  </body>
  </html>
```
* When the `Map` component mounts, instantiate the map as follows:

```javascript
// frontend/components/bench_map/bench_map.jsx

class BenchMap extends React.Component {
  //...

  componentDidMount() {
    // find the `<map>` node on the DOM
    const mapDOMNode = this.refs.map;

    // set the map to show SF
    const mapOptions = {
      center: {lat: 37.7758, lng: -122.435}, // this is SF
      zoom: 13
    };

    // wrap the mapDOMNode in a Google Map
    this.map = new google.maps.Map(mapDOMNode, mapOptions);
  }

  //...
}
```

**Test:** This should cause a Google Map to be rendered to the page.

## Phase 7: Markers on the Map

We're now going to implement map markers for our benches.

  * Update the `Search` component to pass a 'benches' prop to `BenchMap`

Managing the markers is going to require quite a bit of code, so we're going to
create a helper class, `MarkerManager`.

### `MarkerManager`

* Create a new file `marker_manager.js`; it should live in your `util` folder.
* In this file, create and export a new class, `MarkerManager`.
* Define the constructor method to accept a map, and then create `map` and `markers`
instance variables.

```javascript
// frontend/util/marker_manager.js

export default class MarkerManager {
  constructor(map) {
    this.map = map;
    this.markers = [];
  }
  //...
}
```

Next, we're going to define an instance method `updateMarkers()`. Start with just a simple `console.log`

```javascript
// frontend/util/marker_manager.js

export default class MarkerManager {
  //...
  updateMarkers(benches) {
    console.log('time to update');
  }
  //...
}
```

Let's put `MarkerManager` on the back-burner for now. We'll come back later.

### Connect `BenchMap` to `MarkerManager`

Let's see how the `BenchMap` is going to interact with our `MarkerManager`.

  * Import the `MarkerManager` class.
  * Update the `BenchMap#componentDidMount` lifecycle method to create a new `MarkerManager`.

```javascript
//frontend/components/bench_map/bench_map.jsx

//...
componentDidMount() {
  //...
  this.map = new google.maps.Map(mapDOMNode, mapOptions);
  this.MarkerManager = new MarkerManager(this.map);
}
//...
```

We need to invoke `updateMarkers()` both when the `BenchMap` component
first mounts **and** whenever the benches in the application state change.

Use the appropriate `React` [lifecycle methods][lifecycle-methods].

Confirm that the `MarkerManager` utility works by checking the console for our
`console.log` **both before and after** running the following code.

```javascript
store.dispatch(requestBenches());
```

Make sure this works before moving on!

[lifecycle-methods]: https://facebook.github.io/react/docs/component-specs.html

### `updateMarkers()`

Read the documentation on [map markers][map-markers] before continuing.

To accomplish the goal of adding and removing markers appropriately, write the
following helper methods:

* `_benchesToAdd()`: returns an array of benches that are in the state, but
not already on the map.
* `_createMarkerFromBench()`: accepts a bench object as an argument; adds a
marker to the `map` and to the `markers` array.

Use your helper methods in `updateMarkers()` to create markers for any new benches that appear in your store. Take care to only add a marker once per bench, as extra markers won't be visible on the map, but will affect your ability to remove benches in the next step.

Make sure you can see markers before moving on!

## Phase 8: Filtering by Map Location

When the map idles, we are going to use its current bounds to request only
benches within the boundaries of the map. First, let's prepare the back end to
search by bounds.

### Back End Prep

* On your `Bench` model, Write a `Bench.in_bounds` method that returns all the
benches that are within the boundaries specified by the argument. See the example below for what arguments to expect.

```ruby
# /app/models/bench.rb

#...
  def self.in_bounds(bounds)
  # google map bounds will be in the following format:
  # {
  #   "northEast"=> {"lat"=>"37.80971", "lng"=>"-122.39208"},
  #   "southWest"=> {"lat"=>"37.74187", "lng"=>"-122.47791"}
  # }
  #... query logic goes here
  end
#...
```

* In the controller, we can expect that these boundaries will be passed
  in as a query string and therefore available in the `params` hash
* Instead of rendering `Bench.all` in our `index` action,  we can instead use
  `Bench.in_bounds(params[:bounds])`

### Update `BenchApiUtil`

Update our `fetchBenches` function in `bench_api_util.js` to accept two arguments:
  * filters
  * success

Eventually, we want to be able to filter our benches by multiple parameters, but
for now we'll just use the lat/lng `bounds`.

Test your updated `fetchBenches` methods to see that it applies the filters!

### Updated State Shape

We want a default state that looks something like this. In addition to our
benches and session, we'll also add a new slice of state to keep track of our filters.

```
{
  benches: {
    1: {
      id: 1,
      description: "...",
      lat: 0.0,
      lng: 0.0
    }
  },
  filters: {
    bounds: {}
  },
  session: {
    currentUser: {
      id: 1,
      username: 'breakfast'
    },
    errors: []
  }
}
```

### Filter Actions

  * Create a new file, `actions/filter_actions`
  * Create and export an action type `UPDATE_BOUNDS`
  * Make and export an action creator, `updateBounds`; this should accept a single
  argument: `bounds`

#### `SearchContainer`

Update your `SearchContainer`'s `mapDispatchToProps` function to use the newly
constructed `updateBounds` action creator.

#### `Search`

Update your `Search` presentational component to pass the `updateBounds` prop to
the `BenchMap` component

#### `BenchMap`

  * In the `BenchMap` component, add a listener to the map's idle event when
  `componentDidMount` is called.
  * [Read this documentation][event-doc] to learn about Google Map events.
  * Call `getBounds` on the map instance to get a `LatLngBounds` instance. Call
    `getNorthEast` and `getSouthWest` to get these coordinate pairs. Get their
    latitude and longitude and format these coordinates into exactly the format
    your API is expecting. Check [this documentation][lat-lng-docs] for more
    info.
  * Package these coordinates into a `bounds` object.
  * Invoke `this.props.updateBounds()`, and pass your newly constructed bounds object

### `FilterReducer`

We need to build out our application state to reflect the map's `bounds`.

* Create a new file, `reducers/filter_reducer.js`
* Build and export a `FilterReducer`
  * You're reducer should update the application state when an `UPDATE_BOUNDS`
  action is dispatched
* Update your `RootReducer`

**Test** that the application is being successfully updated by moving the map around
and then calling `store.getState()` in the console.

### `MarkerManager`

Now that we've handled our state, we need to beef up `MarkerManager/updateMarkers()` to handle removing markers for benches that have been moved outside our bounds.

Add the following helper methods to your class:

* `_markersToRemove()`: returns an array of markers that are on the map, but
the benches they represent are not in the state.
* `_removeMarker()`: accepts a marker as an argument; removes marker from map
and from `markers`.

Call these methods in `updateMarkers()` to ensure that benches that leave our store have their markers removed from the map. RIP, benches.

### `BenchesMiddleware`

Before moving on, remove the call to `requestBenches()` from the `BenchIndex`
component's `componentDidMount`. **We no longer need to dispatch this action from
our view.** Instead, we'll rely on our `BenchesMiddleware` to `requestBenches` after
it sees an `UPDATE_BOUNDS` action.

Update your `BenchesMiddleware` so that it intercepts the `UPDATE_BOUNDS` action. Here is our goal:

  * Use `next` to pass the action on through to the store.
  * Then, use `dispatch` and `requestBenches` to trigger a new dispatch.
  * When `BenchesMiddleware` sees a `REQUEST_BENCHES` dispatch collect the filters
  from the store using `getState`.
  * Pass the filters and the appropriate callback on to `fetchBenches`.

Your middleware's switch statement should look something like this:

```javascript
// frontend/middleware/bench_middleware.js

//...
  switch(action.type){
    case REQUEST_BENCHES:
      const filters = getState().filters
      fetchBenches(filters, benchesSuccess);
      break;
    case UPDATE_BOUNDS:
      next(action);
      dispatch(requestBenches());
      break;
    //...
  }
```

That's it! The markers and bench index should now only display for benches that
are within the bounds of the map. Move the map around to prove this! **Show your
TA!**

[google-map-doc]: https://developers.google.com/maps/documentation/javascript/tutorial
[event-doc]: https://developers.google.com/maps/documentation/javascript/events#MarkerEvents
[map-markers]: https://developers.google.com/maps/documentation/javascript/markers
[lat-lng-docs]: https://developers.google.com/maps/documentation/javascript/reference#LatLngBounds

## Phase 8: Creating Benches

### Adding a `BenchForm`

* Create a new React component & container, `BenchForm` & `BenchFormContainer`.
  This should render a simple form with 4 fields:
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

### Navigating to the `BenchForm`

Filling in coordinates manually is a major pain; Let's make things a little easier
by bringing up a new bench form when a user clicks on the map and pre-filling it
with latitude and longitude based on where they clicked.

Because `BenchMapContainer` and `BenchFormContainer` live under different routes, We can't simply pass props between them to convey our click information. We will need to encode our parameters in a client-side query string.

#### `withRouter`

Since our `BenchMap` will need access to the `Router`, import the `withRouter`
function from `react-router`. Change the export statement in `bench_map.jsx` so
that we are exporting a wrapped component.

```javascript
export default withRouter(BenchMap);
```

Our `BenchMap` component will now have a `router` prop.

#### Redirecting with coordinates

Add a `"click"` handler to the map. It should:
  * Grab the coordinates from the click event.
  * Use the router to redirect to the `BenchForm` URL, providing the `lat` and
  `lng` as query params.

To pass `lat` and `lng` as query params:

  0.  Use `this.props.router.push` to send data along with the new `pathname`.

```javascript
// frontend/components/bench_map/bench_map.jsx

//...
 _handleClick(coords){
    this.props.router.push({
      pathname: "benches/new",
      query: coords
    });
  }
//...
```

Test this before moving on. You should be able to click the map and make the
browser redirect to a URL that looks something like:

`/#/benches/new?lat=37.79153217974085&lng=-122.40194320678711`

### Pre-filling the form

Inside of the `BenchFormContainer`...
  * Define a `mapStateToProps` function that accepts `state` and `ownProps` as arguments
  * pass `lat` and `lng` props to the `BenchForm` component by deconstructing
  `ownProps.location.query`

```javascript
// frontend/components/bench_form/bench_form_container.jsx

//...
  const mapStateToProps = (state, ownProps) => ({
    lat: ownProps.location.query.lat,
    lng: ownProps.location.query.lng
  });
//...
```

Restructure your `BenchForm` component to accept `lat` and `lng` as props. Use
these values to pre-fill the fields on your form. Make the input tags disabled
so that our users don't try to edit them!

**Call a TA over and show them your form in action!!**

### Api Util and Action Creators

  * Add a `createBench` function to `bench_api_util.js`. It should make a `POST`
    request to your API.
  * Create the following action types:
    * `CREATE_BENCH`
    * `RECEIVE_BENCH`
  * Add the following action creators to `bench_actions.js`:
    * `createBench`
    * `receiveBench`
  * Add a `mapDispatchToProps` function to your `BenchFormContainer`; this should
  pass a `handleSubmit` prop to `BenchForm`

### `BenchMiddleware`

Update your `BenchMiddleware` to invoke `createBench` from the `bench_api_util.js`
when it receives a `CREATE_BENCH` dispatch. Your success callback should dispatch
a `RECEIVE_BENCH` action.

### `BenchReducer`

Now, update your `BenchReducer` to respond to the `RECEIVE_BENCH` action.

#### `BenchMap`

Finally, update your `BenchMap` to redirect to the search page after a new
bench is created.

Create a few benches!

### Protect your front-end bench routes!

Let's make sure users can't get to our `"/#/benches/new"` route on the front-end unless they're logged in.

Refer to the `onEnter` [reading][onEnter] for this part.

* Define an `_ensureLoggedIn` helper method in your `Root` component. It should:
  * Check to see if the application state has a `currentUser` property.
  * If true, do nothing.
  * Otherwise, `replace` the path with `"/login"`.
* Add an `onEnter` prop to the bench `Routes` we want to protect. For example,

 ```html
 <Route path="benches/new" component = { BenchForm } onEnter={ _ensureLoggedIn } />
 ```

 **Test that your routes are protected before moving on!**. You should be re-directed from logging in and signing up to the root if you are
 already logged in. In addition, you should be re-directed to logging in if you
 try to create a bench and aren't logged in.

## Phase 10: Filtering By Seating

In this section, we want to build the functionality that will allow our users to filter benches by both their geographic bounds and their number of seats.

### Update your API

* Update your `BenchesController#index` :
  * Modify `bench_params` to accept `:max_seating` and `:min_seating`.
  * Filter your `@benches` by `params[:max_seating]` and
  `params[:min_seating]`, if present.

### Filter Actions

Next, let's write a new action creator. We're going to define a single action creator, `updateFilter`, that will be invoked whenever we update one of the following:
  * bounds
  * min seating
  * max seating

It should look like this:

```javascript
// frontend/actions/bench_actions.js

//...
export const updateFilter = (filter, value) => ({
  type: UPDATE_FILTER,
  filter,
  value
});
//...
```

The first parameter, `filter`, will tell our `FilterReducer` which property to
update, and the second parameter, `value`, will specify the value of that filter.

Start by refactoring the `FilterReducer` and `SearchContainer` to use this new
action creator instead of `updateBounds`. Your `FilterReducer` should have a default
state that looks like:

```
{
  bounds:{},
  minSeating: 1,
  maxSeating: 10
}
```

Also be sure to refactor your action types if necessary.

### `FilterForm`

Create a new component, `FilterForm`. It should be a sub-component of `Search`.
`FilterForm` should render two inputs, one for `minSeating` and one for
`maxSeating`.

Update your `SearchContainer` to pull `minSeating` and `maxSeating` from the state
to pass as props. `SearchContainer` should also pass an `updateFilter` prop to
`Search`, which should then pass it on to `BenchMap` and `FilterForm`.
`updateFilter` should be the `onChange` handler of the `input` tags.

You should be able to see the markers change on the screen as you toggle the values
in the form!

## Phase 11: Show Page

Create a `BenchShow` component. It should be a full-page component displaying a
single bench's information and a map showing the bench. Your `BenchShow` page should mount whenever someone clicks on an item in your `BenchIndex` or a marker in your `BenchMap`.

* Create a new `Route` for your `BenchShow` that takes a `benchId` param.
* Nest a `BenchMap` in your `BenchShow`, passing the bench as a prop.
* Center the map on the single bench and prevent the map from being dragged.

## Phase 12: Reviews

Show reviews of a bench on `BenchShow`. Reviews for a bench should comprise:
* A rating from 1 to 5.
* A comment field.

Add a `ReviewIndex` and `ReviewForm`. `ReviewIndex` should show the average score
for a bench and also list the reviews for that bench. Modify and add the
appropriate API endpoints, actions, utils, and components.

## Phase 13: Pictures!
* when you create a new bench, allow a user to also add a photo using
  [Cloudinary][cloudinary-js]!
* You will need to create a new column in your benches table.
* Display these pictures on both the show page and the index.

## BONUSES!
* When you hover over an index item it should highlight the marker on the map in
  a different color. This should require creating a new reducer.
* Every bench can have multiple photos!
* Show page should have a carousel!
* Display the score as a list of star images!
* Users can favorite benches!
* Look at your app, then look at the real AirBNB. See any differences?
  Give your project a makeover and add a ton of CSS so that it resembles
  the REAL AirBNB.

[google-map-doc]: https://developers.google.com/maps/documentation/javascript/tutorial
[event-doc]: https://developers.google.com/maps/documentation/javascript/events#MarkerEvents
[map-markers]: https://developers.google.com/maps/documentation/javascript/markers
[lat-lng-docs]: https://developers.google.com/maps/documentation/javascript/reference#LatLngBounds
[react-router-source]: https://cdnjs.cloudflare.com/ajax/libs/react-router/1.0.0-rc1/ReactRouter.min.js
[react-history]: https://github.com/reactjs/react-router/blob/master/docs/guides/Histories.md
[on-enter]: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback
[jquery-ajax]: http://api.jquery.com/jquery.ajax/#jQuery-ajax-settings
[cloudinary-js]: http://cloudinary.com/documentation/upload_widget
