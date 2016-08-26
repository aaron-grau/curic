# Bench BnB

Check out the live demo [here][live-demo]!

[live-demo]: http://aa-benchbnb.herokuapp.com

## Setup Checklist

Refer to [the master checklist][checklist] during Bench BnB and your final project.

[checklist]: ../../readings/checklist.md

## Phase 0: Rails Backend

* Create a new rails project using `--database=postgresql` and `--skip-turbolinks`.
* Make a `Bench` model with `description`, `lat` and `lng`.
* `lat` and `lng` should be of type `float`.
* Make a `BenchesController` to handle API requests. It will need `index` and
`create` to start.
* Add routes for your `BenchController` actions. These should be namespaced under `api/benches` and return JSON by default.
* Populate `seeds.rb` with bench seed data using [real coordinates in SF][maps-sf] (click around to get coordinates).
* Setup a `StaticPagesController` with a `root` view containing a `<main
id="root"></main>`.
* Update your `routes.rb` file to root to `static_pages#root`
* Boot up your server and open your app in the browser. Test your API in the Dev Tools console using `$.ajax` calls (Hint: you may want to save these calls for later).

[maps-sf]: https://www.google.com/maps/place/San+Francisco,+CA/

## Phase 1: `Frontend` Structure

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
* Test this rendering setup before moving on.

## Phase 2: `Bench` redux cycle

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

Let's start by just setting up our `BenchesReducer` to return it's default state:

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
    benches: BenchesReducer
  });
```

So far, our default application state should look something like this:

```
  {
    benches: {}
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

So far, we have built our redux store and told it to use our bench reducing function.
Test that everything works:
  0. Add a `'DOMContentLoaded'` callback to your entry point if you don't already
  have one.
  0. Inside the callback, call `configureStore()` and assign the result to the `window`:
    ```javascript
      window.Store = configureStore(); //just for testing!
    ```
  0. Run `Store.getState()` in the console and inspect the results.

Your state should look like the default state mentioned above!

### Actions Creators

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

We'll come back to our `BenchesMiddleware` to flesh it out later.

[middleware-docs]: http://redux.js.org/docs/advanced/Middleware.html

#### Connecting `BenchesMiddleware` and the `Store`

Let's establish the link between our `Middleware` and the `Store`.

#### `RootMiddleware`

Similar to our pattern for creating a `RootReducer`, we'll create a `RootMiddleware`.

  * create a new file, `middleware/root_middleware.js`
  * import `applyMiddleware` from `redux`
  * import your `BenchesMiddleware`

```javascript
  import { applyMiddleware } from 'redux';
  import BenchesMiddleware from './benches_middleware';
```

  * Use the `applyMiddleware` function to create a `RootMiddleware`
  * `export default` `RootMiddleware`

```javascript
  const RootMiddleware = applyMiddleware(
    BenchesMiddleware
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

#### Recap

Since our last recap, we have: created a `bench_actions` file, that holds
action creators and `BenchConstants`. These help ensure that our `Views`,
`Middleware`, and `Store` are communicating effectively. We also created
`BenchesMiddleware`, which will be responsible for intercepting and triggering
bench-related dispatches. We created a `RootMiddleware` using the
`applyMiddleware` function from the `redux` library. Finally, we connected our
`RootMiddleware` to the `Store` using the `createStore` function.

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

### Connect`BenchesMiddleware` to `BenchAPIUtil`

Let's connect our `BenchesMiddleware` to this new `fetchBenches` function!

Start by importing `fetchBenches`. Let's invoke it in our `BenchesMiddleware` whenever a `BenchConstants.REQUEST_BENCHES` action is received. For now, make `success` a function that logs the data from the response.

```javascript
  const BenchesMiddleware = ({getState, dispatch}) => next => action => {
    switch(action.type){
      case BenchConstants.REQUEST_BENCHES:
        const success = data => console.log(data);
        fetchBenches(success);
        break;
      default:
        next(action);
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
    break;
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

## Phase 3: `BenchIndex`

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

## Phase 4: The Map

Now we're going to add a map alongside our index to visually convey our bench
information.

### Create a `BenchMap` component.

* Create a new React component class `BenchMap`.
* Its `render` function should return a `div` with `id='map-container'` and
`ref='map'`.
* In the `application.css` file, make sure to set the `width` and `height` of the
`#map-container` to `500px`.
* We'll return to this component in a bit.

### Create a parent component: `Search`

* Create a new React component, `Search`.
* `Search` should render a `div` containing a `BenchMap` and `BenchIndex`.
* Remove your `BenchIndexContainer` and instead, create a `SearchContainer`.
* `Search` should then pass the appropriate props to `BenchIndex`.
* **You shouldn't have to change `BenchIndex`**.


Since our `Search` component only needs a render method, we can make it a
[functional component][functional-comp-docs] with an implicit return! Make sure to
deconstruct your props for cleaner syntax.

### Render your `SearchContainer`

* In your entry file, render the `SearchContainer` component instead of `BenchIndexContainer`. This should cause both the `BenchMap` and the `BenchIndex` to be rendered on the page.
* Verify your work before moving on.

### Attach a Google Map to `BenchMap`

* Read [the google maps documentation][google-map-doc].
* Get a new API key for a JavaScript Google Map.
* Add a script tag (including your API key) to your `application.html.erb`
  * When including the google script tag, be sure to put it above `yield` and
    remove the `async defer` bit. This way, the script will fully load before the
    rest of your page and be ready to use as soon as your app mounts.

    ```html
      <!-- application.html.erb:
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
  class BenchMap extends React.Component {
  //...
  componentDidMount(){
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
```
This should cause a Google Map to be rendered to the page.

## Phase 5: Markers on the Map

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
class MarkerManager {
  constructor(map){
    this.map = map;
    this.markers = [];
  }
  //...
}
```

Next, we're going to define an instance method `updateMarkers()`. Start with just a simple `console.log`

```javascript
class MarkerManager {
  //...
  updateMarkers(benches){
    console.log('time to update');
  }
  //...
}
```

Let's put `MarkerManager` on the back-burner for now. We'll come back later.

### Connect `BenchMap` to `MarkerManager`

Let's see how the `BenchMap` is going to interact with our `MarkerManager`.

  * Import the `MarkerManager` class.
  * Update the `BenchMap#componentDidMount` method to create a new `MarkerManager`.

```javascript
  componentDidMount(){
    //...
    this.map = new google.maps.Map(mapDOMNode, mapOptions);
    this.MarkerManager = new MarkerManager(this.map);
  }
```

We need to invoke `updateMarkers()` both when the `BenchMap` component
first mounts **and** whenever the benches in the application state change.

Use the appropriate `React` [lifecycle methods][lifecycle-methods].

Confirm that the `MarkerManager` utility works by checking the console for our
`console.log` **both before and after** running the following code.

```javascript
  Store.dispatch(requestBenches());
```

Make sure this works before moving on!

[lifecycle-methods]: https://facebook.github.io/react/docs/component-specs.html

### `updateMarkers()`

Read the documentation on [map markers][map-markers] before continuing.

To accomplish the goal of adding and removing markers appropriately, write the following helper methods.

* `_benchesToAdd()`: returns an array of benches that are in the state, but
not already on the map.
* `_createMarkerFromBench()`: accepts a bench object as an argument; adds a
marker to the `map` and to the `markers` array.

Use your helper methods in `updateMarkers()` to create markers for any new benches that appear in your store. Take care to only add a marker once per bench, as extra markers won't be visible on the map, but will affect your ability to remove benches in the next step.

Make sure you can see markers before moving on!

## Phase 6: Filtering by Map Location

When the map idles, we are going to use its current bounds to request only
benches within the boundaries of the map. First, let's prepare the back end to
search by bounds.

### Back End Prep

* On your `Bench` model, Write a `Bench.in_bounds` method that returns all the
benches that are within the boundaries specified by the argument. See the example below for what arguments to expect.

```ruby
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

### `fetchBenches`

Update our `fetchBenches` function in `bench_api_util.js` to accept two arguments:
  * filters
  * success

Eventually, we want to be able to filter our benches by multiple parameters, but
for now we'll just use the lat/lng `bounds`.

Test your updated `fetchBenches` methods to see that it applies the filters!

#### Filter Actions

  * Create a new file, `actions/filter_actions`
  * Create and export a `FilterConstants` object with property: `UPDATE_BOUNDS`
  * Make and export an action creator, `updateBounds`; this should accept a single
  argument: `bounds`

#### `SearchContainer`

Update your `SearchContainer`'s `mapDispatchToProps` function to use the newly
constructed `updateBounds` action creator.

#### `Search`

Update your `Search` presentational component to pass the `updateBounds` prop to
the `BenchMap` component

### `BenchMap`

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

We want a default state that looks something like:

```
  {
    benches: {},
    filters: {
      bounds: {}
    }
  }
```

  * Create a new file, `reducers/filter_reducer.js`
  * Build and export a `FilterReducer`
    * You're reducer should update the application state when an `UPDATE_BOUNDS`
    action is dispatched
  * Update your `RootReducer`

Test that the application is being successfully updated by moving the map around
and then calling `Store.getState()` in the console.

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
  switch(action.type){
    case BenchConstants.REQUEST_BENCHES:
      const filters = getState().filters
      fetchBenches(filters, benchesSuccess);
      break;
    case FilterConstants.UPDATE_BOUNDS:
      next(action);
      dispatch(requestBenches());
      break;
```

That's it! The markers and bench index should now only display for benches that
are within the bounds of the map. Move the map around to prove this! **Show your
TA!**

## BONUS!
* When you hover over an index item it should highlight the marker on the map in
  a different color. This should require creating a new reducer.

* Look at your app, then look at the real AirBNB. See any differences?
  Give your project a makeover and add a ton of CSS so that it resembles
  the REAL AirBNB.

[google-map-doc]: https://developers.google.com/maps/documentation/javascript/tutorial
[event-doc]: https://developers.google.com/maps/documentation/javascript/events#MarkerEvents
[map-markers]: https://developers.google.com/maps/documentation/javascript/markers
[lat-lng-docs]: https://developers.google.com/maps/documentation/javascript/reference#LatLngBounds
