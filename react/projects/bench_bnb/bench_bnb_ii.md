# BenchBnB Day 2

## Phase 7: React Router

We're going to add routing to our application.

```
  npm install --save react-router
```

Before we add the `ReactRouter`, we'll need to refactor our component hierarchy a
bit. Define 3 new files: these can all live at the root of the `components` folder:

* `app.jsx`
* `root.jsx`
* `router.jsx`

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
### The `AppRouter`

Start by importing the following:
    * `React`
    * `Router`, `Route`, `IndexRoute`, `hashHistory`
    * `App`
    * `SearchContainer`

Next, we want to define and export a **functional component** that renders a
`Router`. Setup your `Router` to use `hashHistory`.

```javascript
  const AppRouter = () => (
    <Router history={ hashHistory }>
      // Routes go here...
    </Router>
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
#### `IndexRoute`

Next, let's make sure that our `SearchContainer` is the default component rendered
inside `App`. Use an `IndexRoute` to accomplish this.

```javascript
const AppRouter = () => (
  <Router history={ hashHistory }>
    <Route path="/" component={ App }>
      <IndexRoute component={ SearchContainer } />
    </Route>
  </Router>
)
```

### The `Root` component

Create and export a **functional component** called `Root`. The component should accept
the `Store` as a prop, and it should render the `AppRouter` wrapped in the `Provider`

```javascript
  const Root = ({store}) => (
    <Provider store={store}>
      <AppRouter/>
    </Provider>
  );
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

Test that everything works before moving on!

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

  */#/benches/new?lat=37.79153217974085&lng=-122.40194320678711*

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
  * Create the following constants:
    * `BenchConstants.CREATE_BENCH`
    * `BenchConstants.RECEIVE_BENCH`
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

## Phase 9: Front-End User Authentication

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

Create a new file, `session_api_util.js` with the following functions:
  * **`signup`:** POST 'api/users'
  * **`login`:** POST 'api/session'
  * **`logout`:** DELETE 'api/session'

Each function should take `success` and `error` callbacks.

Test each of your api util functions before moving on!

### Session Actions

We need the following Action Creators:
  * `login`
  * `logout`
  * `signup`
  * `receiveCurrentUser`
  * `receiveErrors`

Build the corresponding `SessionConstants` as well. All of our action creators (
other than `logout`) should accept an argument.


### `SessionMiddleware`

Your `SessionMiddleware` should only listen for 3 of our action types:
  * `LOGIN`
  * `LOGOUT`
  * `SIGNUP`

Your middleware should be responsible for invoking the appropriate `SessionApiUtil`
function and passing the appropriate callbacks. The success callback for `login` and
`signup` requests should `dispatch` a `receiveCurrentUser` action. The error callbacks should dispatch `receiveErrors`.

The success callback of `logout` should simply be to invoke `next(action)`.

Test that your `SessionMiddleware` works by dispatching `login`, `logout`, and
`signup` actions from the console.

### `SessionReducer`

Create a new reducer to keep track of our current user and error messages.
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

Test that your `SessionReducer` works by dispatching session actions and then
checking your application state!

### `Greeting` Component

* Create a new react component, `Greeting`, and a container, `GreetingContainer`

If the user **is logged in**, then the `Greeting` should contain:
  * A welcome message including the user's username
  * A button to logout

If the user **is not logged in**, then the `Greeting` should contain:
  * A link to the `/#/signup`
  * A link to the `/#/login`

Change your `App` to render the `GreetingContainer` above our other content.

### `SessionForm` Component

  * Create a new component, `SessionForm`, and a container, `SessionFormContainer`
  * Create new routes for these components in your `router.jsx` file

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

### Bootstrapping the Current User

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
Verify that the `script` contains an object literal of the current user and
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

### Protect your front-end routes.

Let's make sure users can't get to our "/benches/new" or "benches/:id/review" routes on the front-end unless they're logged in.

Refer to the `onEnter` [reading][onEnter] for this part.

  * Add an `onEnter` prop to the Routes we want to protect:
    ```html
    <Route path="benches/new" component = { BenchForm } onEnter={ _ensureLoggedIn } />
    ```
  * Give your `Router` direct access to the `Store` by using [React context][context-docs].
    * Note that this is [established by the provider][store-context].
  * Define an `_ensureLoggedIn` function in your `router.jsx` file. It should:
    * Check to see if the application state has a `currentUser` property
    * If `true`, do nothing.
    * Otherwise, `replace` the path with "/login". (Remember that `replace` won't
    add a "fake" entry to the browser's history, whereas `push` will.)
    * We don't need an `asyncDoneCallback` because `_ensureLoggedIn` runs synchronously.

Test your work before continuing.

[onEnter]: ../../readings/on_enter.md
[context-docs]: https://facebook.github.io/react/docs/context.html
[store-context]: https://egghead.io/lessons/javascript-redux-passing-the-store-down-implicitly-via-context

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
    type: FilterConstants.UPDATE_FILTER,
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

Also be sure to refactor `FilterConstants`.

### `FilterForm`

Create a new component, `FilterForm`. It should be a sub-component of `Search`.
`FilterForm` should render two inputs, one for `minSeating` and one for
`maxSeating`.

Update your `SearchContainer` to pull `minStating` and `maxSeating` from the state
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

## Bonus
* Every bench can have multiple photos!
* Show page should have a carousel!
* Display the score as a list of star images!
* Users can favorite benches!
* Style your page!

[rails]: ../../../rails#readings-after-you-finish-all-videos
[google-map-doc]: https://developers.google.com/maps/documentation/javascript/tutorial
[event-doc]: https://developers.google.com/maps/documentation/javascript/events#MarkerEvents
[map-markers]: https://developers.google.com/maps/documentation/javascript/markers
[lat-lng-docs]: https://developers.google.com/maps/documentation/javascript/reference#LatLngBounds
[react-router-source]: https://cdnjs.cloudflare.com/ajax/libs/react-router/1.0.0-rc1/ReactRouter.min.js
[react-history]: https://github.com/reactjs/react-router/blob/master/docs/guides/Histories.md
[on-enter]: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback
[jquery-ajax]: http://api.jquery.com/jquery.ajax/#jQuery-ajax-settings
[cloudinary-js]: http://cloudinary.com/documentation/upload_widget
