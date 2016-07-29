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
* Boot up your server and open your app in the browser. Test your API in the Dev Tools console using `$.ajax` calls (Hint: you may want to save these calls for later).

[maps-sf]: https://www.google.com/maps/place/San+Francisco,+CA/

---

## Phase 1: `Frontend` Structure

* Make a `StaticPagesController`, have it serve a `root` view with a `<main
id="root"></main>`.

* Update `routes.rb` to `root` to `"Staticpages#root"`.
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

* setup your entry file (`bench_bnb.jsx`) to render your app into the `#root` container..
* Test this rendering setup before moving on.

---

## Phase 2: `Bench` redux cycle

In this phase, you will build the pieces necessary to display a basic index of benches.

---

### `BenchReducer`

In this step, we're going to create a reducer that manages the `benches` section of our application state.
We want to build a state that has the following shape:

```
  benches: {
    1: {..bench 1 details..},
    2: {..bench 2 details..},
    3: {..bench 3 details..}
  }
```

Note, that we want to use the bench_id as the primary identifier.

* Create a file, `reducers/bench_reducer.js` that exports a `reducing` function.
The function should accept two arguments:
  * `oldState` --> the previous application state.
  * `action` --> the action object being dispatched.


* Remember that reducing functions should:
  * Never modify the `oldState` object
  * Return the default state if no arguments are passed
  * Return the `oldState` if the reducer doesn't care about the `action`

Let's start by just setting up our `BenchReducer` to return it's default state:

```javascript
  const BenchReducer = function(oldState = {}, action){
    switch(action.type){
      //...
      default:
        return oldState
    }
  }

  export default BenchReducer;
```

---

### MasterReducer

Create a new file, `reducers/master_reducer.js`. This file will be responsible for
combining our multiple, domain-specific reducers. It will export a single `MasterReducer`.

  * import `combineReducers` from the redux library
  * also import the `BenchReducer` function we just created!

  ```javascript
    import { createStore, combineReducers } from 'redux';
    import BenchReducer from '../reducers/bench_reducer';
  ```

  * Create a `MasterReducer` using the `combineReducers` function
  * Remember, the `combineReducers` function accepts a single argument: an object
    whose properties will represent properties of our application state, and values
    that correspond to domain-specific reducing functions.

```javascript
  const MasterReducer = combineReducers({
    benches: BenchReducer
  });
```

  *Note: I'm leaving extra vertical space here, because later we'll add several more
  domain-specific reducers!*

  So far, our default application state looks like this:

  ```
    {
      benches: {}
    }
  ```

  * `export default` the `MasterReducer`

---

### The `Store`

The redux `Store` will hold a reference to our application state. The `Store` will also handle updating our state when `actions` are dispatched and it will tell the necessary components to re-render.

  * create a new file, `/store/store.js`
  * import `createStore` from the redux library
  * import our `MasterReducer`

We want to use a `configureStore` function that will allow us to instantiate our
`Store` with different initial states.

  * Define a new function, `configureStore`, that accepts a single argument, `preloadedState`
  * `configureStore` should return a new `Store` with the `MasterReducer` and `preloadedState`

```javascript
  const configureStore = (preloadedState = {}) => (
    createStore(
      MasterReducer,
      preloadedState
    );
  )

  export default configureStore
```

---

#### Recap

So far, we have built our redux store and told it to use our bench reducing function.
Test that everything works:
  0. Add a doc-ready callback to your entry point
  0. Inside the callback, `configureStore()` and assign the store to the window
  0. Visit localhost:3000
  0. Open the console and type Store.getState()

Your state should look like the default state mentioned above!

---

### Constants and Actions Creators

#### Constants

Before we move on to the fun stuff -- populating our store with benches from rails --
we need to write an `actions` file that helps our other major pieces function.

  * Create an `actions` file: `actions/bench_actions`
  * Create and export a new object, `BenchConstants`

```javascript
  export const BenchConstants = {
    RECEIVE_BENCHES: "RECEIVE_BENCHES",
    REQUEST_BENCHES: "REQUEST_BENCHES"
  };
```

These `constants` will represent `actionTypes`. We will use them in our `ActionCreators`,
as well as in the `switch` statements in our `Store` and `Middleware`. They simply
help ensure that all of our redux pieces are talking about the same thing and
that nothing fails silently from typos.

[See this Stack Overflow question.][so-constants]

[so-constants]: http://stackoverflow.com/questions/27109652/why-do-flux-architecture-examples-use-constants-for-action-types-instead-of-stri

---

#### Action Creators

Next, we want to create a couple functions that create `action` objects in a
reliable, tidy manner. Remember that `action` objects are just plain-old javascript
objects that also have a `type` property. **The value of the `type` property should
always be a constant.**

Note that `constants` and `ActionCreators` live in the same file!

We need two `actions`: one that will tell our `Middleware` to go fetch all the benches
from rails, and one that tells our `Store` to change our application state to represent
the bench data in our `action`.

Note that the `ActionCreators` don't directly interact with `Middleware` or the `Store`,
they just produce objects. We then send those objects through our `Middleware` and
to the `Store` by invoking `Store#dispatch`.

The first `ActionCreator` doesn't need to accept any arguments. It should just
produce an `action` with type `REQUEST_BENCHES`. Call this function `requestBenches`.

```javascript
  const requestBenches = () => ({
    type: BenchConstants.REQUEST_BENCHES
  });
```

The second `ActionCreator` should accept a single argument, `benches`, and produce
an `action` with type `RECEIVE_BENCHES` and a `benches` property that represents
all of our bench data. Call this function `receiveBenches`.

```javascript
  export const receiveBenches = benches => ({
    type: BenchConstants.RECEIVE_BENCHES,
    benches
  });
```

Finally, export these two functions and add `#requestBenches` to the window for testing

```javascript
  window.requestBenches = requestBenches; //Just for testing
  export requestBenches;
  export receiveBenches;
```

Confirm that you get the appropriate object back by testing `#requestBenches` in the console.

---

### `BenchMiddleware`

Our `BenchMiddleware` will be responsible for a number of things, including triggering
api calls that eventually populate our `Store` with benches!

Remember, `Middleware` receives dispatches before the store. It can decide to intercept
the dispatch, trigger another dispatch, or simply pass on it and do nothing.

  * Create a file, `middleware/bench_middleware.js`
  * Import the relevant `constants`.

```javascript
  import { BenchConstants } from '../actions/bench_actions';
```

[Redux Middleware][middleware-docs] employs a currying strategy to link several
`Middleware` to each other and ultimately to the store. You need to define 3
functions that wrap one-another like so:

```javascript
  const BenchMiddleware = ({getState, dispatch}) => next => action => {
    // ...
  }
```

Here's what all the arguments do:
  * `getState` --> function that returns the current state from the `Store`
  * `dispatch` --> function that allows you to dispatch new actions
  * `next` --> function that passes an action on to the next middleware
  * `action` --> the original action object passed to `Store#dispatch`

Let's start by writing some `Middleware` that will just `console.log` whenever it
sees a `REQUEST_BENCHES` action type.

```javascript
  const BenchMiddleware = ({getState, dispatch}) => next => action => {
    switch(action.type){
      case BenchConstants.REQUEST_BENCHES:
        console.log('time to fetch!')
        next(action);
      default:
        next(action);
    }
  }
```

It is **very** important that we carefully consider where we invoke our `next` function.
If our `Middleware` doesn't care about this `action`, then it should, by default,
pass the action on to the next middleware in the chain.

Export your `BenchMiddleware`!

```javascript
  export default BenchMiddleware;
```

[middleware-docs]: http://redux.js.org/docs/advanced/Middleware.html

---

#### `BenchMiddleware` and the `Store`

Let's establish the link between our `Middleware` and the `Store`.

---

#### `MasterMiddleware`

Similar to our pattern for creating a `MasterReducer`, we'll create a `MasterMiddleware`.

  * create a new file, `middleware/master_middleware.js`
  * import `applyMiddleware` from `redux`
  * import your `BenchMiddleware`

```javascript
  import { applyMiddleware } from 'redux';
  import BenchMiddleware from '../middleware/bench_middleware';
```

  * Use the `applyMiddleware` function to create a `MasterMiddleware`
  * `export default` `MasterMiddleware`

```javascript
  const MasterMiddleware = applyMiddleware(
    BenchMiddleware
  );

  export default MasterMiddleware;
```

---

#### Add `MasterMiddleware` to the `Store`

For starters, let's navigate to `store.js`, and let's import our MasterMiddleware.

```javascript
  import MasterMiddleware from '../middleware/master_middleware';
```

Finally, let's add our `MasterMiddleware` as the third argument to the `createStore`
function.

```javascript
  createStore(
    MasterReducer,
    preloadedState,
    MasterMiddleware
  );
```

---

#### Recap

  Since our last recap, we have: created a `bench_actions` file, that holds `ActionCreators`
  and `BenchConstants`. These help ensure that our `Views`, `Middleware`, and `Store`
  are communicating effectively.

  We also created `BenchMiddleware`, witch will be responsible for intercepting and
  triggering bench-related dispatches.

  We created a `MasterMiddleware` using the `applyMiddleware` function from the `redux` library.

  Finally, we connected our `MasterMiddleware` to the `Store` using the `createStore` function.

  Let's check that our setup works! Go to the console, and type:

  ```javascript
    Store.dispatch(requestBenches())
  ```

  You should see the `console.log` that we imbedded in our `BenchMiddleware`! Make
  sure this works before moving on.

---

### Bench Api Util

We are getting close to finishing the redux loop! In this step, we need to tell
our `BenchMiddleware` to use an api utility to make an `$.ajax` request, which should
hit our rails server and get all of our bench data.

  * Create a file, `/util/bench_api_util.js`, that exports a function, `fetchBenches`

This function should accept a single argument: `success` - this is the callback to
be invoked if the request is successful.

Your function should look something like this:

```javascript
  export const fetchBenches(success){
    $.ajax({
      method: // ,
      url: //,
      success,
      error: () => console.log('error')
    })
  }
```

As before, put this function on the window for testing, and make sure it works before
moving on!

---

### Bench Api Util <--> BenchMiddleware

Let's connect our `BenchMiddleware` to this new `fetchBenches` function!

Start by importing `fetchBenches`. Then.. let's invoke it in our `BenchMiddleware`'s `switch`
statement.

```javascript
  const BenchMiddleware = ({getState, dispatch}) => next => action => {
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

Finally, we need to re-work our `BenchMiddleware` so that instead of a`console.log`ing
the bench data, it dispatches the data as part of an action!

  * Import the `receiveBenches` `ActionCreator`
  * Re-write your success callback to dispatch a `RECEIVE_BENCHES` action


```javascript
  case BenchConstants.REQUEST_BENCHES:
    const success = data => dispatch(receiveBenches(data))
    fetchBenches(success);
    break;
```

---

### Back to the reducer

We've come full circle, and now it's time to tell the `BenchReducer` how to update
our application state when it receives the `RECEIVE_BENCHES` action. Make sure you
import the appropriate `constants`. Your reducer should look something like:

```javascript
  const BenchReducer = function(oldState = {}, action){
    switch(action.type){
      case BenchConstants.RECEIVE_BENCHES:
        return action.benches;
      default:
        return oldState;
    }
  };
```

---

#### Recap

We've done it! You should now be able to run the following in the console:

```javascript
  Store.getState(); // --> returns default state object
  Store.dispatch(requestBenches());
  Store.getState(); // --> returns a new state object, fully populated!
```

Congrats! **Call over a TA and explain the entire redux cycle.**

---

## Phase 3: `BenchIndex`: Our First React Component

Let's create a component that shows our benches.

  * Let's start by making make two files: `components/bench_index.jsx` and
  `components/bench_index_container.js`

We're going to follow the react/redux design principle of **separating
presentational and container components** [Read more here][pres-cont-components].

[pres-cont-components]: http://redux.js.org/docs/basics/UsageWithReact.html

---

### The Container Component

We'll write our container component first. If we do a good job here, then our
presentational component should be fairly trivial!

  * Inside your container component, import the `connect` function from the
  `react-redux` library. Also import your presentational component: `BenchIndex`.
  (We haven't constructed `BenchIndex` yet.. but we'll need it here!)

```javascript
  import { connect } from 'react-redux';
  import BenchIndex from './bench_index';
```

Let's recap how the `connect` function works. [See the docs][connect-docs]. Note
that `connect` has 4 parameters, but we only need the first two here!

`mapStateToProps` is a function, whose goal is to create an object that contains
information from the application state that the presentational component cares about.

`mapDispatchToProps` is a function, whose goal is to create an object with methods
that trigger dispatches. These methods will then be used in the presentational
component as event listeners.

Note that **we never explicitly invoke this function**. Instead, we pass `mapStateToProps`
and `mapDispatchToProps` to `connect`, and `connect` invokes both functions whenever
our application state changes.

---

#### `mapStateToProps`

What information does our `BenchIndex` component need from the state? Well.. it
needs the collection of benches!

```javascript
  const mapStateToProps = state => ({
    benches: state.benches
  });
```

---

#### `mapDispatchToProps`

What dispatches should the `BenchIndex` component trigger? Well! We should `requestBenches`
whenever the component mounts!

```javascript
  const mapDispatchToProps = dispatch => ({
    requestBenches: () => dispatch(requestBenches())
  });
```

---

#### Export it!

Finally, let's use the `connect` function to export a new component that is connected
to our `Store`.

```javascript
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(BenchIndex);
```

[connect-docs]: https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options

---

### The Presentational Component

Let's create the `BenchIndex` presentational component.

```javascript
  import React from 'react';

  class BenchIndex extends React.Component{
    componentDidMount(){
      // requestBenches() here!
    }
    render(){
      // ...
    }
  };
```

You may want to consider creating another component, `BenchIndexItem`, to clean up
your `BenchIndex` component. You make the call!

---

### Render Time!

  * In your entry file, create a document ready callback.
  * In that callback, invoke `ReactDOM.render`, and render the `BenchIndexContainer`
  into the `#content` div
  * Your app should now be populated with benches!!

**Call over a TA** and show them your container and presentational components.
**Explain when you should use container components.**

---

#### Recap

Here's a summary of your redux loop so far:
  * The document loads and our doc-ready callback is triggered.
  * In the doc-ready callback, we tell `React` to render our `BenchIndex` component
  * The `BenchIndex` component mounts and dispatches an `action` with type `REQUEST_BENCHES`
  * Our `BenchMiddleware` intercepts this `action` and triggers an `ajax` request to our
  rails api.
  * On success, the `ajax` request dispatches an `action` with type `RECEIVE_BENCHES`
  * When the `BenchReducer` receives this action, it updates the application state
  with the bench data contained in the `action`
  * When the application state changes, it triggers a callback that was provided by
  the connect function.
  * That callback runs our `mapStateToProps` and `mapDispatchToProps` functions. The
  return values of these functions are then merged and the resulting object is passed
  as new props to `BenchIndex`
  * When `BenchIndex` receives these new props, it re-renders. Phew!

---

## Phase 4: The Map

Now we're going to add a map alongside our index to visually convey our bench
information.

---

### Create a `BenchMap` component.

* Create a new React component class `BenchMap`
* Its `render` function should return a `div` with `id='map-container'` and
`ref='map'`
* In the `application.css` file, make sure to set the `width` and `height` of the
`#map-container` to `500px`
* We'll return to this component in a bit

---

### Create a parent component: `Search`

* Create a new React component, `Search`
* `Search` should render a `div` containing `BenchMap` and `BenchIndex`
* Remove your `BenchIndexContainer` and instead, create a `SearchContainer`
* `Search` should then pass the appropriate props to `BenchIndex`
* **You shouldn't have to change `BenchIndex`**


Since our `Search` component only needs a render method, we can make it a
[functional component][functional-comp-docs] with an implicit return! Remember,
**anywhere we use JSX, we need to import `React`.**

```javascript
  import React from 'react';

  const Search = props => (
    //... JSX goes here!
  );

  export default Search
```

You could also deconstruct your props (recommended) like so..

```javascript
  const Search = {benches} => (
    //... JSX goes here!
  );
```

* In your entry file, render the `SearchContainer` component instead of `BenchIndexContainer`.
  This should cause both the `BenchMap` and the `BenchIndex` to be rendered on
  the page.
* Verify your work before moving on.

**Call over a TA and explain when you use functional components.**

---

### Attach a Google Map to `BenchMap`

* Read [the google maps documentation][google-map-doc].
* Get a new API key for a JavaScript Google Map.
* Add a script tag (including your API key) to your `application.html.erb`
  * When including the google script tag, be sure to put it above `yield` and
    remove the `async defer` bit. This way, the script will fully load before the
    rest of your page and be ready to use as soon as your app mounts.

    ```html
      <!-- application.html.erb -->
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
    const mapDOMNode = ReactDOM.findDOMNode(this);
    const mapOptions = {
      center: {lat: 37.7758, lng: -122.435}, // this is SF
      zoom: 13
    };
    this.map = new google.maps.Map(mapDOMNode, mapOptions);
  }
  //...
```
This should cause a Google Map to be rendered to the page.

Read about the [findDOMNode method][findDOMNOde-docs]. Understand it before moving on!

[findDOMNOde-docs]: https://facebook.github.io/react/docs/top-level-api.html#reactdom.finddomnode

[functional-comp-docs]: https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html#stateless-functional-components

---

## Phase 5: Markers on the Map

We're now going to implement map markers for our benches. Read the documentation
on [map markers][map-markers] before continuing.

  * Update the `Search` component to pass a 'benches' prop to `BenchMap`

The `BenchMap` needs to update which markers are on the map when the component
first mounts and whenever the state changes.

  * Create an instance variable, `markers`, in your `#componentDidMount` method

Next, we will create a method `#_updateMarkers`. This method will be responsible
for making the markers on the map reflect the benches in the application state.

To accomplish the goal of adding and removing markers appropriately, write the following
helper methods:

  * `#_benchesToAdd` --> returns an array of benches that are in the state, but
  not on the map
  * `#_markersToRemove` --> returns an array of markers that are on the map, but
  the benches they represent are no in the state
  * `#_createMarkerFromBench` --> accepts a bench object as an argument; adds a
  marker to the map and to the `markers` array
  * `_removeMarker` --> accepts a marker as an argument; removes marker from map
  and from `markers`

We need to invoke `#_updateMarkers` when `BenchMap` mounts and it receives new
props. Use the appropriate `React` [lifecycle methods][lifecycle-methods].

[lifecycle-methods]: https://facebook.github.io/react/docs/component-specs.html

---

## Phase 6: Filtering by Map Location

When the map idles, we are going to use its current bounds to request only
benches within the boundaries of the map. First, let's prepare the back end to
search by bounds.

---

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

---

######## Warning.. unfinished
* When the `BenchMap` component is mounted, register an event listener on
change of the `BenchStore`.
* When the event occurs, create markers for every bench in the array.
* Confirm that your bench markers appear on your map. Nice!
* One last change: since it doesn't make sense to fetch any markers from
the API until we know where the map is, move the `BenchActions.fetchAllBenches`
from the `Index` to the `idle` event of the map.
[Read this documentation][event-doc] to learn about Google Map events.

### Sending the Correct Params

We now need to write a front-end request conforming to your new API hook.
Your API is expecting a `GET` request to the bench `index` with a query string containing 'bounds'.

* Modify `BenchActions.fetchAllBenches` to take a parameter `bounds`. Have it pass
`bounds` to `BenchApiUtil.fetchAllBenches`, which should pass `bounds` to its
`$.ajax` call.

* Return to your map `idle` event handler. Call `getBounds` on the map
  instance to get a `LatLngBounds` instance. Call `getNorthEast` and
  `getSouthWest` to get these coordinate pairs. Get their latitude and
  longitude and format these coordinates into exactly the format your API is
  expecting. Check [this documentation][lat-lng-docs] for more
  info.
* Package these coordinates into a `bounds` object.
* Call `BenchActions.fetchAllBenches`, passing `bounds`.
* Verify that, when the map moves, you are sending a properly 'bound' request and
  receiving the right benches in response.
* Moving your map around should now trigger updates to your `BenchStore` and `BenchIndex`. Verify this before moving on to updating your markers.

### Adding and Removing Markers

Moving your map should trigger changes in your store. However, our implementation
as it stands won't update map markers correctly without a little modification.

Recall that, every time the map idles, we add new markers for every bench in the store. This has two problems:
  0. If a bench was already in the store, a new, extraneous marker is added.
  0. If a bench that was in the store moved out of bounds, its marker still lives on.

Update your listener so that, as `BenchStore` changes, `BenchMap` only adds markers for new benches and removes them for benches that have left the map bounds.

Note: If your benches are flickering when you move the map, you're probably removing too many markers, and if out-of-bounds benches seem to be appearing before you've `idled`, you're probably not removing enough!

![map bounds diagram](assets/map_idle_diagram.png)

## BONUS!
* When you hover over an index item it should highlight the marker on
  the map. This should require creating a new store.

* Look at your app, then look at the real AirBNB. See any differences?
  Give your project a makeover and add a ton of CSS so that it resembles
  the REAL AirBNB.

[google-map-doc]: https://developers.google.com/maps/documentation/javascript/tutorial
[event-doc]: https://developers.google.com/maps/documentation/javascript/events#MarkerEvents
[map-markers]: https://developers.google.com/maps/documentation/javascript/markers
[lat-lng-docs]: https://developers.google.com/maps/documentation/javascript/reference#LatLngBounds
[react-router-source]: https://raw.githubusercontent.com/rackt/react-router/master/lib/umd/ReactRouter.min.js
[better-flux-diagram]: better_flux_structure.png
[flux-diagram]: https://raw.githubusercontent.com/facebook/flux/master/docs/img/flux-diagram-white-background.png
