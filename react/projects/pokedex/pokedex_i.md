# Pokedex: An Introduction to the React Router - Part 1

In this project, we'll write an React/Redux/Rails app to manage `Pokemon` and
their `Items`!

Check out the live demo [here](http://aa-pokedex.herokuapp.com/)!

## Phase 0: Rails API Setup
We've already set up a Rails backend with migrations and models in the
[skeleton][skeleton-zip].

* Download the [skeleton][skeleton-zip].
* Run `bundle install`.
* Make sure Postgres is running, then run `rake db:setup` (short for
`rake db:create db:migrate db:seed`).

Get yourself oriented.

* Take a look at the `schema`, `routes`, and `StaticPagesController`.
* Also look at the `Pokemon` and `Item` models.
* Open up the rails console (`rails c`) to see what's in the database.
* Start up the rails server (`rails s`) and visit the root url.

:art: Stylesheets have been provided for you in the skeleton! :art:

[skeleton-zip]: ./skeleton.zip?raw=true

### API Namespace

Let's build routes for our pokémon! We want these routes to be nested under an
api namespace. Like so:

```ruby
namespace :api, defaults: {format: :json} do
  # api routes
end
```

The `defaults: {format: :json}` option tells the controller to first look for a
`.json.jbuilder` view rather than an `html.erb` view. Edit `routes.rb` to add
the following routes to our app. Your routes table should look like the
following:

```
           Prefix Verb   URI Pattern                Controller#Action
             root GET    /                          static_pages#root
api_pokemon_index GET    /api/pokemon(.:format)     api/pokemon#index {:format=>:json}
                  POST   /api/pokemon(.:format)     api/pokemon#create {:format=>:json}
      api_pokemon GET    /api/pokemon/:id(.:format) api/pokemon#show {:format=>:json}
                  PATCH  /api/pokemon/:id(.:format) api/pokemon#update {:format=>:json}
                  PUT    /api/pokemon/:id(.:format) api/pokemon#update {:format=>:json}
                  DELETE /api/pokemon/:id(.:format) api/pokemon#destroy {:format=>:json}
```

### Pokemon Controller

Build a controller to handle our pokémon `resources`.

* Generate an `Api::PokemonController`.
* Define `#index` and `#show` actions.

Remember, we want these actions to **render json responses**. To make the job
easier for our frontend, you should format your index action to serve up json
responses that look something like this:

```js
{
  1: {
    id: 1,
    name: /*...*/,
    image_url: /*...*/
  },
  2: {
    id: 2,
    name: /*...*/,
    image_url: /*...*/
  },
  //..
}
```

Here, the keys in your json response are the primary keys of the pokémon. The
values are the pokémon objects themselves. Let's use Jbuilder here!

* Create a `views/api/pokemon/index.json.jbuilder` file.
* Iterate over each pokémon.
* Use `json.set!` to explicitly set the key to the pokémon's id.
* Use `json.extract!` to grab the pokémon's `id`, `name`, and `image_url`.

Like so:

```ruby
@pokemon.each do |poke|
  json.set! poke.id do
    json.extract! poke, :id, :name, :image_url
  end
end
```

We don't need to return any more information than this for our index route!
Remember, Jbuilder allows us to *curate* our data, retrieving only the
attributes we are interested in.

* Next create a Jbuilder view for `PokemonController#show`. We want the action
to render all the information about a single pokémon, including its items.

A GET request to `localhost:3000/api/pokemon/5` should render this:

```js
{
  id: 5,
  name: "Rhydon",
  attack: 130,
  defense: 120,
  image_url: "/assets/pokemon_snaps/112.png",
  moves: [
    "horn attack",
    //...
  ],
  poke_type: "ground",
  items: [
    {
      id: 15,
      name: "Dark Vulcan",
      pokemon_id: 5,
      price: 12,
      happiness: 58,
      image_url: "/assets/pokeball.png"
    },
    //...
  ]
}
```

**Test your routes, controller actions and Jbuilder view**: Make GET requests to
(i.e. visit) `localhost:3000/api/pokemon` and
`localhost:3000/api/pokemon/:id`. Show a TA before moving on.


## Phase 1: Frontend Setup

### Node Package Manager

As with previous projects, you will need to set up a `package.json` and a
`webpack.config.js` file to configure your application to use NPM and Webpack.

* Run `npm init -f` to initialize your app's `package.json` with the default
boilerplace settings.
* `npm install --save` the following packages:
  * webpack
  * react
  * react-dom
  * react-router
  * redux
  * react-redux
  * babel-loader
  * babel-core
  * babel-preset-es2015
  * babel-preset-react
  * lodash

### Webpack

Next we need to configure Webpack to compile our `bundle.js` file.

* Create a new file called `webpack.config.js` in the root of your project.
* Copy and paste the following configuration:

  ```js
  const path = require('path');

  module.exports = {
    context: __dirname,
    entry: './frontend/pokedex.jsx',
    output: {
      path: path.join(__dirname, 'app', 'assets', 'javascripts'),
      filename: 'bundle.js'
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
          query: {
            presets: ['react', 'es2015']
          }
        }
      ]
    },
    devtool: 'source-maps'
  };
  ```

* Now that Webpack knows to create `bundle.js`, require it in our `application.js`:

  ```js
  //= require jquery_ujs
  //= require bundle
  ```

Notice that the `entry` key in `webpack.config.js` expects a file called
`./frontend/pokedex.jsx` to exist.

* Create a `frontend` folder in the root directory of your project.
* Add an entry file called `pokedex.jsx`.
* `import` both the `react` and `react-dom` packages.
* Add an event listener for `DOMContentLoaded`.
* In the callback to this listener, try rendering a simple stateless React
component to test everything we've written so far.
* Don't forget to run `webpack --watch` to generate your `bundle.js`.

Your entry file might look like the following:

```js
// frontend/pokedex.js

import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', () => {
	const rootEl = document.getElementById('root');
	ReactDOM.render(<h1>Pokedex</h1>, rootEl);
});
```

**Test your frontend setup**: Make sure that your test component renders at the root.

### Frontend Structure
Finish your frontend setup by defining the structure of your `frontend`
folder. Nest folders called `actions`, `components`, `reducers`, `store`,
`middleware` and `util` within `frontend`.

## Phase 2: `Pokemon` Redux Cycle

### Designing the State Shape

Before we actually build anything, we need to talk about the shape of our
application state. **This is an important first step!** Don't ever skip it. For
now, we just want to be able to render all of our pokemon. This means we'll
probably want a `pokemon` slice of state that returns a collection of pokémon
objects.

<!-- TODO -->

```js
// State Shape
{
  pokemon: {
    1: { ..pokémon 1 info.. },
    2: { ..pokémon 2 info.. }
  },

  pokemonDetail: {
    id: 3,
    name: "electrode",
    ...
  },

  errors: [ "message 1", "message 2" ]
}
```

We recommend using an object to store collections of objects in an app's state.
While this may impose a few more obstacles for iterating over the collection to
render, an object will prove far superior for updating or deleting individual
pokémon in our collection (re: time complexity of objects vs array methods).
Note the current sample state looks a lot like the json response returned by the
`PokemonController#index` action.

### API Util and Action Creators

We'd like to render all of our pokemon. Let's start by setting up a way to fetch
them from the back end.

* Create an `api_util.js` file inside your `frontend/util` folder.
  * Inside this file, we'll define functions that make ajax requests fetching information from our rails api.
* Export a function called `fetchAllPokemon` that takes a success callback as
an argument.
  * The function should make an AJAX request that will make a http request to our `PokemonController#index` endpoint.
  * Run `rake routes` to determine the appropriate url for this request.

Next, define action creator to be called in the success callback we will pass `fetchAllPokemon` in our middle.

* Create a `pokemon_actions.js` file within your `frontend/actions` folder.
* Export a constant called `RECEIVE_ALL_POKEMON` with the value `"RECEIVE_ALL_POKEMON"`
* Export a function called `receiveAllPokemon(pokemon)` that returns an action
object.
  * This action object should have two keys: `type` of `RECEIVE_ALL_POKEMON` and another for the received`pokemon` data.

Your code should look like the following:

```js
// frontend/actions/pokemon_actions.js

export const RECEIVE_ALL_POKEMON = "RECEIVE_ALL_POKEMON";

export const receiveAllPokemon = pokemon => ({
  type: RECEIVE_ALL_POKEMON,
  pokemon
})
```

**Test that your pokemon action creator and api util work in the browser before moving on!**
* Import the action and api_util functions into your entry file.
* Assign them to the `window` to test that in the browser's console.
* You should be able to run:

  ```
  const fetchSuccess = pokemon => console.log(receiveAllPokemon(pokemon));
  fetchAllPokemon(fetchSuccess);
  ```

Now let's define and export a `requestAllPokemon()` action creator, which will
trigger the calling of our utility function in our middleware.

* Define and export the string literal constant `REQUEST_ALL_POKEMON`;
* and a `requestAllPokemon()` function. It should not receive any
arguments and should return an action object with a `type` of
`REQUEST_ALL_POKEMON`.

### `PokemonReducer`

Let's define our `PokemonReducer`. Remember that the reducer is only concerned
with describing how the state changes as a result of a dispatched action. It
takes two parameters: the previous `state` and the `action` dispatched. It
should return the new state, without mutating the previous `state`. If the
reducer doesn't care about the action being dispatched, it should return
`state`.

* Create a `frontend/reducers/pokemon_reducer.js` file.
* Import our `RECEIVE_ALL_POKEMON` constant.

  ```js
  import { RECEIVE_ALL_POKEMON } from '../actions/pokemon_actions';
  ```

* Define and `export default` a `PokemonReducer(state = {}, action)`.
* Add a `switch(action.type)` statement.
* Create `RECEIVE_ALL_POKEMON` and default cases. Remember not to mutate `state`!

### The `RootReducer`

Before we can use our `PokemonReducer`, let's create a `RootReducer` using
Redux's `combineReducers` function. We'll use `combineReducers` to generate our
application state and assign each slice of the state to a different reducer.
This will make it easier to grow our application state.

* Create a new file: `/frontend/reducers/root_reducer.js`
* Import `combineReducers` from `redux` and our `PokemonReducer`:
* Call `combineReducer` so that our `PokemonReducer` is responsible for the
`pokemon` slice of the app state. Like so:

  ```js
  const RootReducer = combineReducers({
    pokemon: PokemonReducer
  });
  ```

* `export default RootReducer`.

### Store

Before we can test our app's reducer we need a Redux store to dispatch from.
Let's create our app's store.

* Create a `store.js` file within the `frontend/store` folder.
* Import `createStore` from the `redux` library.
* Import our `RootReducer`.

Redux's `createStore` function accepts the following parameters:
  * the reducer;
  * an optional `preloadedState`;
  * and any enhancers like as middleware.

* For now, call `createStore` and pass it our imported `RootReducer`. We will come back
to the other arguments later.
* Wrap the creation of the store in a `configureStore` function. Like so:

  ```js
  // frontend/store/store.js

  const configureStore = () => (
    createStore(
      IndexReducer
    )
  );
  ```

**NB**: This is a great pattern to continue using - instead of just exporting the
store, we are exporting a function that creates and returns a `store`. This can
be used in the future to swap out reducers, `preloadedState`, or enhancers
depending on different conditions (e.g. development vs production environments).

* In your `pokedex.jsx` entry file, import your `configureStore` function.
* Inside the `DOMContentLoaded` callback, declare a `store`.
* Call `configureStore` and assign its return value to `store`.
* For testing purposes, make `store` available on the `window` (i.e.
  `window.store = store;`).

**Test your store and reducer.** You should be able to run the following code
snippet in the browser's console:

```js
store.getState(); // should return initial app state

const fetchSuccess = pokemon => store.dispatch(receiveAllPokemon(pokemon));
fetchAllPokemon(fetchSuccess);

store.getState(); // should return the app state populated with pokemon
```

### `PokemonMiddleware`

Remember, middleware receives dispatched actions before the reducer. It can
intercept the dispatched action, trigger another dispatch, or simply pass on it
and do nothing. Our `PokemonMiddleware` will be responsible for a number of
things, including triggering api calls that eventually populate our `store` with
all of the pokémon in the datbase.

* Create a file, `middleware/pokemon_middleware.js`
* Import the following:
  * The `fetchAllPokemon` api utility function
  * The `REQUEST_ALL_POKEMON` constant
  * The `receiveAllPokemon` action creator

Recall that [Redux Middleware][middleware-docs] employs a currying strategy to
link several `Middleware` to each other and ultimately to the store. You'll need
to define 3 functions that wrap one-another like so:

  ```javascript
  const PokemonMiddleware = ({ dispatch }) => next => action => {
    // ...
  }
  ```

* Define a `PokemonMiddleware` that will `console.log` a message whenever it receives and `action` of type `REQUEST_ALL_POKEMON`. Like so:

```javascript
const PokemonMiddleware = ({ dispatch }) => next => action => {
  switch(action.type) {
    case REQUEST_ALL_POKEMON:
      console.log("gotta fetch 'em all!")
      return next(action);
    default:
      return next(action);
  }
}
```

* Export your `PokemonMiddleware`!

### `MasterMiddleware`

Similar what we did for the `RootReducer`, let's create an `MasterMiddleware`
that configures all of our middlewares.

* Create a file, `middleware/master_middleware.js`
* Import the following:
  * `applyMiddleware` from `redux`;
  * your `PokemonMiddleware`.
* Define and export your `MasterMiddleware` like so:

  ```js
  const MasterMiddleware = applyMiddleware(PokemonMiddleware);
  export default MasterMiddleware;
  ```

* Refactor your `configureStore` function to incorporate your `MasterMiddleware`.

  ```js
  // frontend/store/store.js
  import MasterMiddleware from '../middleware/master_middleware';

  const configureStore = () => (
    createStore(
      RootReducer,
      MasterMiddleware
    )
  );
  ```

[middleware-docs]: http://redux.js.org/docs/advanced/Middleware.html

**Test that your app's middleware is setup properly**. Dispatch an action of
type `REQUEST_ALL_POKEMON`. Does your app print "gotta fetch 'em all!" to the
browser's console. If not, start debugging by checking your rails server
and/or putting a debugger in your middleware. Make sure this works before
moving on!

#### Connecting the Dots

Let's update our `PokemonMiddleware` to `fetchAllPokemon`, dispatching a `RECEIVE_ALL_POKEMON` action if successful.

Inside of your `PokemonMiddleware` function:

* Define a callback, `receiveAllPokemonSuccess`, that dispatches a `RECEIVE_ALL_POKEMON` action by calling the `receiveAllPokemon` action creator.
* Invoke `fetchAllPokemon` when a `REQUEST_ALL_POKEMON` action is dispatched.
* Pass `receiveAllPokemonSuccess` to `fetchAllPokemon` as the success callback.


  ```js
  const PokemonMiddleware = ({ dispatch }) => next => action => {
    const receiveAllPokemonSuccess = data => dispatch(receiveAllPokemon(data));

    switch(action.type) {
      case REQUEST_ALL_POKEMON:
        fetchAllPokemon(receiveAllPokemonSuccess);
        return next(action);
      //...
    }
  };
  ```

We've done it! Connected the dots!

**Test your redux cycle**. In the browser console try:

```js
store.getState(); // should return initial app state
store.dispatch(requestAllPokemon());
store.getState(); // should return the app state populated with pokemon
```

### Selectors

We're going to add one final piece to our redux structure: selectors. Selectors
are functions that are used to "select" complex pieces of the state. Define them
in a `selectors.js` file in your app's `frontend/reducers` folder.

* Create a `frontend/reducers/selectors.js` file.
* Define and export a function, `selectAllPokemon(state)`, which accepts the
application state as an argument and exports an array of all the pokémon
objects. Use [lodash's values][lodash-values] method.

**Test your selector in the browser**. You should should be able to do the following:

```js
const initialState = store.getState();
selectAllPokemon(initialState); //=> []

store.dispatch(requestAllPokemon());

const populatedState = store.getState();
selectAllPokemon(populatedState); //=> array of pokemon objects!
```

We'll use this selector later in our pokemon components. **Call a TA over and
show them your pokemon redux cycle before moving on!** Make sure you can explain
how the different pieces of Redux fit together (i.e. state shape, actions,
reducer, store, middleware and selector).

[lodash-values]: https://lodash.com/docs/4.16.4#values

## Phase 3: React Components

<!-- TODO -->

### The `Root` Component

Let's build a `Root` component that will be responsible for rendering all of our other components. `Root` should be a *stateless* component that accepts the `store` as a prop. Our `Root` components should then wrap our components using the `Provider` from `react-redux`.

  ```js
    import React from 'react';
    import { Provider } from 'react-redux';

    const Root = ({ store }) => {
      return (
        <Provider store={store}>
          <div>Hello, world!</div>
        </Provider>
      );
    };

    export default Root;
  ```

Remember that anywhere we use JSX, we *must* import React.

Let's also update our doc-ready callback in `pokedex.jsx` to:
  0. Configure the store
  0. Render our `Root` component, passing is the store as a prop

  ```js
    document.addEventListener('DOMContentLoaded', () => {
    	const store = configureStore();
    	window.store = store; //Just for testing!
    	const root = document.getElementById('root');
    	ReactDOM.render(<Root store={store}/>, root);
    });
  ```

### `PokemonIndex`

Remember that there are two types of components in the modern discussion of React/Redux: presentational components and container components. Our **container components** are concerned with subscribing to the store, reading from state, and passing down necessary props to our presentational components. Our **presentational components** will only be concerned with rendering JSX and providing functionality to the user interface.

#### `PokemonIndexContainer`

  * Within `frontend/components/pokemon/`, create a `pokemon_index_container.js` file.
  * As with all container components, we will need to import the `connect` function.

  ```js
    import { connect } from `react-redux`;
  ```

The connect function accepts two primary arguments: `mapStateToProps` and `mapDispatchToProps`. Both functions are invoked when our redux store updates. They are responsible for constructing props, which are then passed to the presentational component. We'll only need `mapStateToProps` here.

  ```js
    const mapStateToProps = state => ({
      // piece of state to subscribe to
    });
  ```

Write a `mapStateToProps` function that uses our `selectAllPokemon` selector to pass a `pokemon` prop to the connected presentational component.

In the next phase we'll actually write our `PokemonIndex` component. Assume it already exists, and import it like so:

  ```js
    import PokemonIndex from './pokemon_index';
  ```

Finally, export your connected component:

  ```js
    export default connect(
      mapStateToProps
    )(PokemonIndex);
  ```

#### `PokemonIndex`
Now let's write the `PokemonIndex` presentational component, which will render an unordered list of Pokemon names next to corresponding images.

  * Create a `frontend/components/pokemon/pokemon_index.jsx` file
  * Build and export a *stateless*, *functional* component that creates a `<li>` for each pokémon
    * In each `<li>`, display the pokémon's name and a *small* image

Import the container component in your root file and nest a `<PokemonIndexContainer />` within your `<Root />` component.

Also amend our doc-ready callback to in include a `dispatch` of `requestAllPokemon`.

```js
  document.addEventListener('DOMContentLoaded', () => {
    const store = configureStore();
    window.store = store; //Just for testing!

    const root = document.getElementById('root');
    ReactDOM.render(<Root store={store}/>, root);

    store.dispatch(requestAllPokemon()); // We'll remove this later
  });
```

You should see your list of pokémon whenever the page loads!

Go ahead and **remove all other extraneous action creators, constants, or other redux pieces from our entry point.** This includes anything we added to the window "just for testing".


## Phase 3: React Router

Now let's say we want the ability to click on any of these Pokemon and see more details about them. In order to maintain a common user interface used around the web, we will have the URL define what components the user sees. This is exactly what the powerful `react-router` library is for. To use it, navigate to `root.jsx` and import the following:

  ```js
    import { Router, Route, hashHistory } from 'react-router';
  ```

Refer to the [routes reading][routes-reading] if you need a refresher

[routes-reading]: https://github.com/ReactTraining/react-router/blob/master/docs/guides/RouteConfiguration.md

#### The `Router`

The Router component is responsible for listening for changes to our browser's url. When the url changes, the `Router` chooses which component to render based on which `Route` matches the url.

Within our provider, we will nest everything within `<Router>` tags.  We need to pass the router `hashHistory` as a prop.

Your code should resemble the following:

```html
  <Provider store={store}>
    <Router history={hashHistory}>
      // routes will go here
    </Router>
  </Provider>
```

Next, instead of rendering the `PokemonIndexContainer` directly, setup a route that will render the component when `path="/"`.

```html
  <Provider store={store}>
    <Router history={hashHistory}>
			<Route path="/" component={PokemonIndexContainer}/>
    </Router>
  </Provider>
```

**Test that everything still works before moving on!**

#### The onEnter Hook

The React Router allows us to do some refactoring of our `requestAllPokemon` dispatch, which we're currently triggering in the doc-ready callback. Let's add an [onEnter][on-enter] hook to our `/` component. This hook will trigger a function whenever we enter the root url. Hence, when the page first loads, we'll fetch all our pokémon.

  * Import the `requestAllPokemon` action creator.
  * Create an `onEnter` hook for your root route.
  * Define a function inside of `Root`, called `requestOnEnter`, that dispatches `requestAllPokemon`.

As a reminder, the onEnter hook looks like this:

```js
  <Route path='PATH' component={COMPONENT} onEnter={ON_ENTER_CALLBACK} />
```

Your `Root` component should now look something like this:

  ```js
    const Root = ({ store }) => {
    	const requestOnEnter = () => {
    		store.dispatch(requestAllPokemon());
    	};

    	return (
    		<Provider store={store}>
    			<Router history={History}>
    				<Route path="/" component={PokemonIndexContainer} onEnter={requestOnEnter}>
    		</Provider>
    	);
    };
  ```

Remove the dispatch to `requestAllPokemon` from your doc-ready callback.

**Call over a TA!** Show them your `Root`, container, and `PokemonIndex` components.

[on-enter]: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback

### Pokemon Index Item

Let's refactor each of our Pokemon into their own `PokemonIndexItem` components. This is a great pattern for keeping our components minimal. Now the list will only care about rendering all of the list items and the items will care about the functionality of showing their details.

We will structure the index item components to receive all their information through props. This way they do not need lifecycle methods and will work perfectly as stateless functional components. Write a `PokemonIndexItem` component and refactor `PokemonIndex` to utilize this new component.  

**Test your code** to ensure everything still renders as it did before.  

In order to pass `PokemonIndexItem` a reference to the router we will wrap the component in what is referred to as an Higher Order Component (HOC). These components, much like our containers, serve only to pass down information through props. To implement this we'll use the `withRouter` function from `react-router`.

  ```js
    import { withRouter } from 'react-router';
  ```

Then call this function on `PokemonIndexItem` when we export it:

  ```js
    export default withRouter(ComponentName);
  ```

Add this code to your `PokemonIndexItem`. Make sure to add `router` to the list of props being received by `PokemonIndexItem`.

Now that `PokemonIndexItem` has a reference to the router we can use `router.push(url)` to redirect our user to different routes!

Create a `handleClick` function inside of `PokemonIndexItem`.

  ```js
    const PokemonIndexItem = ({pokemon, router}) => {

      const handleClick = url => router.push(url);

      return (
        // ...
      );
    };
  ```

Note that `handleClick` employs a currying pattern to generate the appropriate click handler. Inside of our return statement, we should have something like:

  ```js
    <li onClick={handleClick(`/pokemon/${pokemon.id}`)}>
  ```

We're **invoking** `handleClick`, and setting it's return value to the property of `onClick`.

**Call over a TA** if this doesn't make sense!

While the route will change, you may have noticed the following error in your browser console: `[react-router] Location "/pokemon/:id" did not match any routes`.  This tells us that the router was looking for a component to render for that route but was unable to find one. To fix this, let's make a `PokemonDetail` component.
