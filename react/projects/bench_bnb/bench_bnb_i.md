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
* Make a `BenchesController` to handle API requests. It will need `index` and `
create` to start.
* Add routes for your `BenchController` actions. These should be namespaced under `api/benches` and return JSON by default.
* Populate `seeds.rb` with bench seed data using [real coordinates in SF][maps-sf] (click around to get coordinates).
* Boot up your server and open your app in the browser. Test your API in the Dev Tools console using `$.ajax` calls (Hint: you may want to save these calls for later).

[maps-sf]: https://www.google.com/maps/place/San+Francisco,+CA/

## Phase 1: `Frontend` Structure

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
* setup your entry file (`bench_bnb.jsx`) to render your app into the `#content` `div`..
* Test this rendering setup before moving on.

## Phase 2: `Bench` flux cycle

In this phase, you will build the pieces necessary to display a basic index of benches. Refer to the [Flux Utils Docs][flux-docs] as necessary for this section.

[flux-docs]: https://facebook.github.io/flux/docs/flux-utils.html#content

### `AppDispatcher`
* Create a file that exports a `Dispatcher` singleton:

  ```javascript
  //dispatcher/dispatcher.js
  const Dispatcher = require('flux').Dispatcher;
  module.exports = new Dispatcher();
  ```

### `BenchStore`

`BenchStore` will be the front-end cache of benches that your components use.

* create a `/stores/bench_store.js` file that exports a `BenchStore`.
* `require` `Store` from `'flux/utils'` as `Store`.
* `BenchStore` should be a `new Store` that accepts your `AppDispatcher` singleton
as its only argument.
  *  This tells the `BenchStore` to listen to `AppDispatcher` for dispatches.
* Use a local variable, `_benches` , to hold your benches.
  * This should be an object where the key is the `benchID` and the
    value is the `bench` object.
* Write a `BenchStore.all` function that returns a copy of the `_benches` object.
* Write a `resetAllBenches` function that receives a `benches` argument and sets
`_benches` to `benches`. `BenchStore` should close over this function. Closure
lets us keep the method private and prevents components from bypassing our flux
loop.

Your `BenchStore` should look something like this:

```javascript
// stores/bench.js
const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
let _benches = {};
const BenchStore = new Store(AppDispatcher);

BenchStore.all = function () {
  // return a copy of `_benches` using `Object.assign`
};

function resetAllBenches (benches) {
  // set `_benches` to `benches`
}

module.exports = BenchStore;
```

Assign `window.BenchStore` to your `BenchStore` in your entry file. This exports
the `BenchStore` to the `window` so we can test it in the console before we get
to our components. Test `BenchStore.resetAllBenches` and `BenchStore.all` before moving on.

### `BenchApiUtil`

Create a `/util/bench_api_util.js` that exports a `BenchApiUtil` object
that can `fetchAllBenches` from your API using `$.ajax`. `fetchAllBenches` should
have one parameter, the `success` callback to invoke when your request succeeds.

Your `BenchApiUtil` should look something like this.
```javascript
// util/bench_api_util.js
BenchApiUtil = {
  fetchAllBenches(success){
    $.ajax({
      url: //,
      method: // ,
      success: function(response){
        // invoke the `success` callback
      }
    })
  }
}

module.exports = BenchApiUtil;
```

* Add `window.BenchApiUtil` to your entry file for testing. Test that
`fetchAllBenches` can get your seed data and call `success` with it. We
will use this Util in our Action creator in the next step.

### `BenchActions`

`BenchActions` will be the interface through which your components interact with the `BenchStore` / Web API.

#### Constants

Before creating `BenchActions`, let's define action constants. Constants provide
more clarity about what actions our app can handle and prevent certain syntax errors. [See this Stack Overflow question.][so-constants]

[so-constants]: http://stackoverflow.com/questions/27109652/why-do-flux-architecture-examples-use-constants-for-action-types-instead-of-stri

Create a new file, `constants/bench_constants.js`

```javascript
BenchConstants = {
  BENCHES_RECEIVED: "BENCHES_RECEIVED",
}

module.exports = BenchConstants;
```

#### Back to the Action

* Start by creating `/actions/bench_actions.js` and defining and exporting your
`BenchActions` object inside it.
* `require` your `BenchApiUtil`; `BenchActions` will use it to interact with the API.
* `BenchActions` should have `fetchAllBenches` and `receiveAllBenches` methods.
  * `fetchAllBenches` should invoke `BenchApiUtil.fetchAllBenches`, and pass
  `receiveAllBenches` as a callback.
  * `receiveAllBenches` should call `AppDispatcher.dispatch` with an object with
  an `actionType` of `BenchConstants.BENCHES_RECEIVED` and a `benches` attribute
  containing the benches returned by the API.

```javascript
const AppDispatcher = require('../dispatcher/dispatcher');
const BenchConstants = require('../constants/bench_constants');
BenchActions = {
  fetchAllBenches(){
   // call BenchApiUtil.fetchAllBenches
  },
  receiveAllBenches(benches){
    AppDispatcher.dispatch({
      actionType: // use a `BenchConstant`,
      benches: benches
    });
  }
}

module.exports = BenchActions;
```
### `BenchStore.__onDispatch`

We want the `BenchStore` to update itself whenever we call our `BenchActions`, which we can accomplish through `BenchStore.__onDispatch`.

* Define `BenchStore.__onDispatch`; it should take a single `payload` argument.
* In the function body, write a `switch` statement that listens for `
payload.actionType`.
* When `payload.ActionType` equals `BenchConstants.BENCHES_RECEIVED, call `resetAllBenches` with `payload.benches`.

```javascript
//stores/bench.js
  const BenchConstants = require('../constants/bench_constants');

  BenchStore.__onDispatch = function(payload) {
    switch(payload.actionType) {
      case BenchConstants.BENCHES_RECEIVED:
        resetAllBenches(payload.benches);
        break;
    }
  };

```

### Emitting Events from the `BenchStore`

When the contents of the `BenchStore` change, we need to inform all interested components that the `BenchStore` has changed. Add a call to `BenchStore.__emitChange` in `resetAllBenches`.

```javascript
//stores/bench.js
resetAllBenches(benches){
  _benches = benches;
  BenchStore.__emitChange();
}
```

Let's do another test before moving on.
* Assign `window.BenchActions` in your entry file.
* In the console, call `BenchActions.fetchAllBenches()`, then `BenchStore.all()`.
* `BenchStore.all()` should return the benches in your DB.
* Remove all your global testing variables before moving on.

## Phase 3: `BenchIndex`: Our First React Component

Let's render a component that shows our benches.

* Make a `BenchIndex` React component
* In your entry file, add a `ReactDOM.render` call that creates the
  `Index` and places it into the `#content` div
* Give it an initial state of `{ benches: BenchStore.all() }`
* In your `componentDidMount` method, do two things:
  * Call `addlistener` on the `BenchStore`, passing it a callback that calls `setState` on the `BenchIndex` to update its benches.
  * Call `BenchActions#fetchAllBenches`.
* `render` a list of your benches. You may want to create a `BenchIndexItem`
  component that receives a `bench` prop and returns a `<div>` containing a single
  bench's information.

  You should have something like:

  ```javascript
  const BenchIndex = React.createClass({
    getInitialState(){
      // get the benches from benchstore
    },
    componentDidMount(){
      BenchStore.addEventListener(this._handleChange);
      BenchActions.fetchAllBenches();
    },
    _handleChange(){
      // reset the benches state
    }
    render(){
      // ...
    }
  })
  ```

Here's a summary of your flux loop so far:
  * The `BenchIndex` component calls our client-side action-creator,
    `BenchActions.fetchAllBenches`.
  * `BenchActions.fetchAllBenches` calls the `BenchesApiUtil`, which fetches bench
    data from your API, passing it `BenchActions.receiveAllBenches` as a callback.
  * `BenchesApiUtil` then invokes the callback on `BenchActions`, which triggers a
    dispatch.
  * The dispatcher hits the `BenchStore`, which should cause the store to update
    its `_benches` and `__emitChange()`.
  * When the store emits change, our `BenchIndex` component's callback function is
    triggered, which should reseset the state of our `BenchIndex` component.
  * When the `BenchIndex` component's state changes, it re-renders. Phew!

## Phase 4: The Map

Now we're going to add a map alongside our index to visually convey our bench
information.

### Create a `BenchMap` component.

* Create a new React component, `BenchMap`.
* Its `render` function should return a `div` with `className='map'` and
`ref='map'`.
* In the `application.css` file, make sure to set the `width` and `height` of the
`.map` to `500px`
* We'll return to this component in a bit.

### Create a parent component: `Search`

* Create a new React component, `Search`
* `Search` should render a `div` containing `BenchMap` and `BenchIndex`.
* In your entry file, render a `Search` component instead of
  `BenchIndex`. This should cause both the `BenchMap` and the `BenchIndex` to be
  rendered on the page.
* Verify your work before moving on.

### Attach a Google Map to `BenchMap`.

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
    BenchMap = React.createClass({
    //...
    componentDidMount(){
      const mapDOMNode = ReactDOM.findDOMNode(this.refs.map);
      const mapOptions = {
        center: {lat: 37.7758, lng: -122.435}, // this is SF
        zoom: 13
      };
      this.map = new google.maps.Map(mapDOMNode, mapOptions);
    },
    //...
```

This should cause a genuine Google Map to be rendered to the screen.

## Phase 5: Markers on the Map

We're now going to implement map markers for our benches. Read the documentation
on [map markers][map-markers] before continuing.

* When the `BenchMap` component is mounted, register an event listener on
  change of the `BenchStore`.
* When the event occurs, create markers for every bench in the array.
* Confirm that your bench markers appear on your map. Nice!
* One last change: since it doesn't make sense to fetch any markers from
  the API until we know where the map is, move the `BenchActions.fetchAllBenches`
  from the `Index` to the `idle` event of the map.
  [Read this documentation][event-doc] to learn about Google Map events.

## Phase 6: Filtering by Map Location

When the map idles, we are going to use its current bounds to request only
benches within the map bounds. First, let's prepare the back end to search by
bounds.

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
  in as a query string and therefore available in the `params` hash.
* Instead of rendering `Bench.all` in our `index` action,  we can instead use
  `Bench.in_bounds(params[:bounds])`.

### Sending the Correct Params

We now need to write a front-end request conforming to your new API hook.
Your API is expecting a `GET` request to the bench `index` with a query string containing 'bounds'.

* Modify `BenchActions.fetchAllBenches` to take a parameter `bounds`. Have it pass
`bounds` to `BenchApiUtil.fetchAllBenches`, which should pass `bounds` to its `
$.ajax` call.

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
