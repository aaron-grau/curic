# BenchBnB Day 2

[maps-sf]: https://www.google.com/maps/place/San+Francisco,+CA/

## Phase 6: The Map

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

* In your `IndexRoute`, render the `SearchContainer` component instead of `BenchIndexContainer`. This should cause both the `BenchMap` and the `BenchIndex` to be rendered on the page.
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
class MarkerManager {
  constructor(map) {
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
componentDidMount() {
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
  * Create and export an action type `UPDATE_BOUNDS`
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

  0.  Use `router#push` to send data along with the new `pathname`.

```javascript
  _handleClick(coords){
    this.props.router.push({
      pathname: "benches/new",
      query: coords
    });
  }
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
  const mapStateToProps = (state, ownProps) => ({
    lat: ownProps.location.query.lat,
    lng: ownProps.location.query.lng
  });
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
export const updateFilter = (filter, value) => ({
  type: UPDATE_FILTER,
  filter,
  value
});
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
