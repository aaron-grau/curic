# Bench BnB

## Setup Checklist
Refer to [the master checklist][checklist] during Bench BnB and your final project.

[checklist]: ../../readings/checklist.md

## Phase 0: Rails Backend
* Create a new rails project using Postgres and **skipping Turbolinks.**
* Make a `Bench` model with `description`, `lat` and `lng`
* `lat` and `lng` should be of type `float`
* Make a JSON API for this resource, it will need `index` and `create`
* Populate `seeds.rb` with bench seed data using [real coordinates in SF][maps-sf] (click around to get coordinates).
* Boot up your server and open your app in the browser. Test your API in the console using `$.ajax` calls (Hint: you may want to save these calls for later).

[maps-sf]: https://www.google.com/maps/place/San+Francisco,+CA/

## Phase 1: Flux Structure

* Make a `StaticPagesController`, have it serve a `root` view with a `<div
id="content"/>`.

* Update `routes.rb` to `root` to `"Staticpages#root"`.
* Create a `/frontend` folder at the root directory of your project to hold your
frontend:

  ```
  frontend
    + actions
    + components
    + constants
    + dispatcher
    + stores
    + util
    bench_bnb.jsx
  ```
* `npm install --save react react-dom flux`
* setup `bench_bnb.jsx` to render your app into the `#content` `div`..
* Test this rendering setup before moving on.
* Create the dispatcher file that exports a Dispatcher singleton: 

  ```javascript
  //dispatcher/dispatcher.js
  const Dispatcher = require('flux').dispatcher;
  module.exports = new Dispatcher();
  ```

## Phase 2: The Bench Store and Web API

In this phase, you will build the pieces necessary to display a basic index of benches. Refer to the [Flux Utils Docs][flux-docs] as necessary for this section.

[flux-docs]: https://facebook.github.io/flux/docs/flux-utils.html#content

### Bench Store

* create `//stores/BenchStore.js` that exports a `BenchStore`.
* `BenchStore` should be a `new Store` that accepts your `AppDispatcher` singleton
as its only argument.
  *  This tells the `BenchStore` to listen to `AppDispatcher` for dispatches.
* `BenchStore` will provide access to all the client side benches.
* Use a local variable, `_benches` , to hold your benches.
  * This should be an object where the key is the `benchID` and the
    value is the `bench` object.
* Write a `BenchStore.all` function that returns a copy of the `_benches` object.
  * Don't worry about receiving and storing new benches yet; we'll get there in a minute. 

Your `BenchStore` should look something like this: 

```javascript
// stores/bench.js
const Store = require('flux/utils').store;
const AppDispatcher = require('../dispatcher/dispatcher');
let _benches = {};
const BenchStore = new Store(AppDispatcher);

BenchStore.all = function () {
  // return a copy of `_benches` using `Object.assign`
};

module.exports = BenchStore;
```

Assign `window.BenchStore` to your `BenchStore` in `bench_bnb.jsx`. This exports
the `BenchStore` to the `window` so we can test it in the console before we get
to our components.

### Api Utility

Create a `\util\` file, `bench_api_util.js` that exports a `BenchApiUtil` object 
that can `fetchAllBenches` from your API using `$.ajax`. `fetchAllBenches` should
take one argument, the `success` callback to invoke.

Your `BenchApiUtil` should look something like this.
```javascript
// util/bench_api_util.js
BenchApiUtil = {
  fetchAllBenches(successCb){
    $.ajax({
      url: //,
      method: // ,
      success: function(response){
        // invoke the `successCb` callback
      }
    })
  }
}

module.exports = BenchApiUtil;
```

* Add `window.BenchApiUtil` to `bench_bnb.jsx` for testing. Test that 
`fetchAllBenches` can get your seed data and call its `successCb` with it.

The success callback of the AJAX will contain all the bench objects, but how
do we insert them into our store? Refer to [the flux diagram][flux-diagram]. As
we can see, the only thing that can change a store is the `AppDispatcher`, and the
way the `AppDispatcher` interacts with the store is through actions.

#### Actions

##### Constants
* Before we can create an action we need a constant to name the action.
* Constants are important because they ensure that we see error messages if we ever
  misspell an action type.
* Create a new file, `constants/bench_constants.js`

```javascript
BenchConstants = {
  BENCHES_RECEIVED: "BENCHES_RECEIVED",
}

module.exports = BenchConstants;
```
* This will be the _name_ of the action

##### Back to the Action
* Let's start by assessing how we want to build our ApiUtil <--> ActionCreators structure.
  * If we only make two files, they can't require each other! So things can get tricky...
  * Take a look at the slightly more detailed flux diagram:

    ![better-flux-diagram](assets/better_flux_structure.png)

* Let's create a `bench_actions.js` file in our actions folder
  * `bench_actions` will require `api_util` and will be responsible for triggering api calls and dispatching the data that returns from the server
* Inside of `bench_actions`, create an object and give it `#fetchAllBenches` and `#receiveAllBenches` methods
* `#fetchAllBenches` should invoke `bench_api_util#fetchAllBenches`, and pass to it the success callback: `#receiveAllBenches`
* `#receiveAllBenches` should dispatch an object with an `actionType` of
  `BenchConstants.BENCHES_RECEIVED`

```javascript
const AppDispatcher = require('../dispatcher/dispatcher');
const BenchConstants = require('../constants/bench_constants');
BenchActions = {
  fetchAllBenches(){
    BenchApiUtil.fetchAllBenches(this.receiveAllBenches)
  },
  receiveAllBenches(benches){
    AppDispatcher.dispatch({
      actionType: BenchConstants.BENCHES_RECEIVED,
      benches: benches
    });
  }
}

module.exports = BenchActions;
```

##### Putting it all together
* In the success callback of your AJAX call in the `ApiUtil#fetchAllBenches`,
  we can invoke the success callback that was passed.
* Call `BenchStore.all`, it's still empty, right? The Dispatcher fired
  (hopefully) but the store wasn't listening to the Dispatcher.
* Tell the `BenchStore` to listen to the dispatcher by doing the
  following
* Remember to `require` the BenchConstants

```javascript
//stores/bench.js
  const BenchConstants = require('../constants/bench_constants');

  BenchStore.__onDispatch = function(payload) {
    switch(payload.actionType) {
      case BenchConstants.BENCHES_RECEIVED:
        resetBenches(payload.benches);
        break;
    }
  };

```

* Finally we should be able to test this thing. In the console, call
  `BenchActions.fetchAllBenches()`. Then, `BenchStore.all()`. If it returns an
  object containing all the benches in the database we have won.
* Make sure that everything is working before moving on
* Once you've tested that it works, remove the lines from the BenchStore and
  ApiUtil that exported them to the window.

![the story so far](../../assets/api_store_diagram.png)

## Phase 3: Our First React Component
#### Emitting Events from the Store
* Return to our store, when the contents of the `BenchStore` change,
  we need to inform all interested parties that the `BenchStore` has changed.
```javascript
//stores/bench.js
  BenchStore.__onDispatch = function (payload) {
   switch(payload.actionType) {
     case BenchConstants.BENCHES_RECEIVED:
       resetBenches(payload.benches);
       BenchStore.__emitChange();
       break;
    }
  };
```

Since our BenchStore is an instance of the `Flux/Utils` Store we have access to
the `addListener` method which will add a callback function to be invoked when
the store runs `__emitChange()`;

#### React Component
* Make an `Index` React component
* In `bench_bnb.jsx`, add a `ReactDOM.render` call that creates the
  `Index` and places it into the `#content` div
* Give it an initial state of `{ benches: BenchStore.all() }`
* As part of the `componentDidMount` lifecycle method, let's do two things:
  * Register a listener on the `BenchStore` using it's new `addListener` function.
    When the store changes, update the state.
  * Call `BenchActions#fetchAllBenches`. It should look like:

  ```javascript
    componentDidMount(){
      BenchStore.addEventListener(this._handleChange);
      BenchActions.fetchAllBenches();
    }
  ```

* Here's the summary:
  * The index component calls our client-side action-creator.
  * `BenchActions` calls the `ApiUtil`, which fetches bench data.
  * `ApiUtil` then invokes the callback on `BenchActions`, which triggers a dispatch.
  * The dispatcher hits the `BenchStore`, which should cause the store to emit a change.
  * When the store changes, our `Index` component's callback function is triggered, which should set the state of our `Index` component.
  * When the `Index` component's state changes, it re-renders. Phew!

## Phase 4: The Map
* Create a new React component, `Map`
* Its `render` function should return a `div` with class `map` and `ref`
  `map`
* In the `css` file, make sure to set the `width` and `height` of the
  `.map` to `500px`
* Read [the google maps documentation][google-map-doc]
* Get a new API key for a JavaScript Google Map
* Add a script tag including your API key to your `application.html.erb`
  * When including the google script tag, be sure to put it above `yield` and
    remove the `async defer` bit. This way, the script will load synchronously
    so it's guaranteed to be defined when the rest of your page loads.
* Create a new React component, `Search`
* `Search` should render a `div` with a `Map` and `Index` as children
* In `bench_bnb.jsx` render a `Search` component instead of `Index`
  at the root. This should cause the `Map` to be rendered into the page
* When the `Map` component mounts, instantiate the map as follows
* We will just use the default location of San Francisco instead of
  trying to geolocate

```javascript
    //components/map.jsx
    //...
    componentDidMount(){
      const map = ReactDOM.findDOMNode(this.refs.map);
      const mapOptions = {
        center: {lat: 37.7758, lng: -122.435},
        zoom: 13
      };
      this.map = new google.maps.Map(mapDOMNode, mapOptions);
    },
```

* This should cause a genuine Google Map to be rendered to the screen.  If
  you have API key issues, you may need to enable the Google Maps JavaScript
  API key.

## Phase 5: Markers on the Map
* When the `Map` component is mounted, register an event listener on
  change of the `BenchStore`
* Read about [map markers here][map-markers]
* When the event occurs, create markers for every bench in the array
* Move on when all your benches are represented by markers on the map
* One last change: since it doesn't make sense to fetch any markers from
  the API until we know where the map is, move the
  `BenchActions.fetchAllBenches` from the `Index` to the idle event of the map
   [read this documentation][event-doc] to learn about Google Map events
* If everything still works, move on to the next phase

## Phase 6: Filtering by Map Location

* When the map idles, we are going to use its current bounds to request
  only benches within the map bounds
* First, let's prepare the back end to search by bounds

### Back End Prep

* I wrote an `Bench.in_bounds` method that returned all the benches that
  were within the boundaries specified by the argument.

```ruby
#...
  def self.in_bounds(bounds)
  # bounds in the following format:
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
* Instead of rendering `Bench.all` we can instead use
  `Bench.in_bounds(params[:bounds])`

### Sending the Correct Params
* So now our back end is expecting a `GET` request to the `index`
  including a query string, so we must now furnish this request
* Return to our map `idle` event handler. Call `getBounds` on the map
  instance to get a `LatLngBounds` instance. Call `getNorthEast` and
  `getSouthWest` to get these coordinate pairs. Get their latitude and
  longitude and format these coordinates into exactly the format our back
  end is expecting. Check [this documentation][lat-lng-docs] for more
  info.
* Now, armed with an object containing the current bounds of the map, we
  can use this object in our AJAX call
* Pass this bounds object we have created as an argument to
  `ApiUtil.fetchAllBenches`. Inside `fetchAllBenches` we can now pass this
  argument to our AJAX call so it can be used as a query string
* Verify that when the map moves the correct request including the query
  string is being sent to the server, and the server is responding with
  the correct benches. The `Index` React component should be correctly
  updating with `benches` being added and removed as the map is dragged

### Adding and Removing Markers
* So the map move causes the store to emit a change event, but the map
  needs special treatment. When we detect that the contents of the store
  have changed, we should find out if any markers need to be added or
  removed.
* When a change event occurs, figure out which benches in the store have
  markers representing them on the map. Those without markers should
  have markers created and added. Markers for benches NOT in the store
  should be removed.
* This is expected to be a somewhat difficult problem
* When the only markers on the map are those appearing in the index, you
  may move on

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
