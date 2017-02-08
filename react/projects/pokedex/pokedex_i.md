# Pokedex: An Introduction to the React Router - Part 1

In this project, we'll write an React/Redux/Rails app to manage `Pokemon` and
their `Items`! Check out the live demo [here](http://aa-pokedex.herokuapp.com/)!

Note: The singular and plural forms of the word "pokemon" do not
differ.

## Phase 0: Rails API Setup
We've already set up a Rails backend with migrations and models in the
[skeleton][skeleton-zip].

* Download the [skeleton][skeleton-zip].
* Run `bundle install`.
* Make sure Postgres is running, then run `rake db:setup` (short for
`rake db:create db:schema:load db:seed`).

Get yourself oriented.

* Take a look at the `schema`, `routes`, and `StaticPagesController`.
* Also look at the `Pokemon` and `Item` models.
* Open up the rails console (`rails c`) to see what's in the database.
* Start up the rails server (`rails s`) and visit the root url.

[skeleton-zip]: ./skeleton.zip?raw=true

### API Namespace

Let's build routes for our pokemon! We want these routes to be nested under an
api namespace. Like so:

```ruby
namespace :api, defaults: {format: :json} do
  resources :pokemon
end
```

The `defaults: {format: :json}` option tells the controller to first look for a
`.json.jbuilder` view rather than an `html.erb` view. Edit `routes.rb` to add
the following routes to our app.

Edit your `routes.rb`. Your routes table should look like the following:

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

Build a controller to handle our pokemon `resources`.

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

Here, the keys in your json response are the primary keys of the pokemon. The
values are the pokemon objects themselves. Let's use Jbuilder here!

* Create a `views/api/pokemon/index.json.jbuilder` file.
* Iterate over each pokemon.
* Use `json.set!` to explicitly set the key to the pokemon's id.
* Use `json.extract!` to grab the pokemon's `id`, `name`, and `image_url`.

Like so:

```ruby
@pokemon.each do |poke|
  json.set! poke.id do
    json.extract! poke, :id, :name
    json.image_url asset_path(poke.image_url)
  end
end
```

**NB** Notice that we use the `asset_path` helper to find the correct path to the image. Asset locations can be different in production so you should always use `asset_path` rather than a literal path. For more detail [check out the guides.](http://guides.rubyonrails.org/asset_pipeline.html)

We don't need to return any more information than this for our index route!
Remember, Jbuilder allows us to *curate* our data, retrieving only the
attributes we are interested in.

* Next create a Jbuilder view for `PokemonController#show`. We want the action
to render all the information about a single pokemon, including its items.

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

* Run `npm init -y` to initialize your app's `package.json` with the default
boilerplate settings.
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
      path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
      filename: 'bundle.js'
    },
    resolve: {
      extensions: ['.js', '.jsx', '*']
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
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
probably want a `pokemon` slice of state that returns a collection of pokemon
objects.

Sample state shape:

```js
{
  pokemon: {
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
    //...
  }
}
```

We recommend using an object to store collections of objects in an app's state.
While this may impose a few more obstacles for iterating over the collection to
render, an object will prove far superior for updating or deleting individual
pokemon in our collection (re: time complexity of objects vs array methods).
Note the current sample state looks a lot like the json response returned by the
`PokemonController#index` action.

### API Util and Action Creators

We'd like to render all of our pokemon. Let's start by setting up a way to fetch
them from the back end.

* Create an `api_util.js` file inside your `frontend/util` folder.
  * Inside this file, we'll define functions that make ajax requests fetching information from our rails api.
* Export a function called `fetchAllPokemon` that returns a promise.
  * The function should make an AJAX request that will make a http request to our `PokemonController#index` endpoint.
  * Run `rake routes` to determine the appropriate url for this request.

Next, define action creator to be called on success of `APIUtil#fetchAllPokemon`.

* Create a `pokemon_actions.js` file within your `frontend/actions` folder.
* Export a constant called `RECEIVE_ALL_POKEMON` with the value `"RECEIVE_ALL_POKEMON"`
* Export a function called `receiveAllPokemon(pokemon)` that returns an action
object.
  * This action object should have two keys: `type` of `RECEIVE_ALL_POKEMON` and another for the received `pokemon` data.

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
  const getSuccess = pokemon => console.log(receiveAllPokemon(pokemon));
  fetchAllPokemon().then(getSuccess);
  ```

### `pokemonReducer`

Let's define our `pokemonReducer`. Remember that the reducer is only concerned
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

* Define and `export default` a `pokemonReducer(state = {}, action)`.
* Add a `switch(action.type)` statement.
* Create `RECEIVE_ALL_POKEMON` and default cases. Remember not to mutate `state`!

### The `rootReducer`

Before we can use our `pokemonReducer`, let's create a `rootReducer` using
Redux's `combineReducers` function. We'll use `combineReducers` to generate our
application state and assign each slice of the state to a different reducer.
This will make it easier to grow our application state.

* Create a new file: `/frontend/reducers/root_reducer.js`
* Import `combineReducers` from `redux` and our `pokemonReducer`:
* Call `combineReducers` so that our `pokemonReducer` is responsible for the
`pokemon` slice of the app state. Like so:

```js
const rootReducer = combineReducers({
  pokemon: pokemonReducer
});
export default rootReducer
```

### Store

Before we can test our app's reducer we need a Redux store to dispatch from.
Let's create our app's store.

* Create a `store.js` file within the `frontend/store` folder.
* Import `createStore` from the `redux` package.
* Import our `rootReducer`.

Redux's `createStore` function accepts the following parameters: the reducer, an optional `preloadedState`, and any enhancers like as middleware.

* For now, call `createStore` and pass it our imported `rootReducer`. We will come back to the other arguments later.
* Wrap the creation of the store in a `configureStore` function. Like so:

  ```js
  // frontend/store/store.js

  const configureStore = () => createStore(rootReducer);
  ```
  **NB**: This is a great pattern to continue using - instead of just exporting the
  store, we are exporting a function that creates and returns a `store`. This can
  be used in the future to swap out reducers, `preloadedState`, or enhancers
  depending on different conditions (e.g. development vs production environments).

* In your `pokedex.jsx` entry file, import your `configureStore` function.
* Inside the `DOMContentLoaded` callback, declare a `store`.
* Call `configureStore` and assign its return value to `store`.
* For **testing purposes only**, make `store` available on the `window` (i.e.
  `window.store = store;`).

**Test your store and reducer.** You should be able to run the following code
snippet in the browser's console:

```js
store.getState(); // should return initial app state

const getSuccess = pokemon => store.dispatch(receiveAllPokemon(pokemon));
fetchAllPokemon().then(getSuccess);

store.getState(); // should return the app state populated with pokemon
```

### Thunk Middleware

Create a new file `frontend/middleware/thunk.js` and export your thunk middleware.
It should check the typeof incoming actions and either return `action(dispatch)` if
they are functions, or `next(action)` if they are not. Reference yesterdays solutions if you need more guidance.

* Refactor your `configureStore` function to incorporate your `thunk middleware`.

  ```js
  // frontend/store/store.js
  import thunk from '../middleware/thunk';

  const configureStore = () => (
    createStore(
      rootReducer,
      applyMiddleware(thunk)
    )
  );
  ```

#### Connecting the Dots

Let's add a new thunk action creator `requestAllPokemon`, dispatching a `RECEIVE_ALL_POKEMON` action if successful.
It should not receive any arguments and should call the `APIUtil`, and then on resolution of the promise,
dispatch `receiveAllPokemon`.

This one's free!

```js
export const requestAllPokemon = () => (dispatch) => {
  return APIUtil.fetchAllPokemon()
    .then(pokemon => dispatch(receiveAllPokemon(pokemon)));
}
```

**Test your redux cycle**. In the browser console try:

```js
store.getState(); // should return initial app state
store.dispatch(requestAllPokemon());
store.getState(); // should return the app state populated with pokemon
```

You've done it! You have successfully built out an api endpoint, and
setup a Redux cycle for your pokemon! :tada:

### Selectors

We're going to add one final piece to our redux structure: selectors. Selectors
are functions that are used to "select" complex pieces of the state. Define them
in a `selectors.js` file in your app's `frontend/reducers` folder.

* Create a `frontend/reducers/selectors.js` file.
* Define and export a function, `selectAllPokemon(state)`, which accepts the
application state as an argument and exports an array of all the pokemon
objects. You can use [lodash's values][lodash-values] method.

**Test your selector in the browser**. You should should be able to do the following:

```js
const initialState = store.getState();
selectAllPokemon(initialState); //=> []

store.dispatch(requestAllPokemon());

const populatedState = store.getState();
selectAllPokemon(populatedState); //=> array of pokemon objects!
```

We'll use this selector later in our pokemon components. **Show a TA your
bug-free pokemon redux cycle before moving on!** Make sure you can explain how
the different pieces of Redux fit together (i.e. state shape, actions, reducer,
store, middleware and selector).

[lodash-values]: https://lodash.com/docs/4.16.4#values

## Phase 3: `Pokemon` React Components

### The `Root` Component

* Create a `Root` component that will be responsible for rendering all of the
app's React components.
    * `Root` should be a *stateless* component (i.e. a *functional component*).
    * It will be passed the app's  Redux`store` as a prop.
    * It should wrap our all of our app's components with the `Provider` from
    `react-redux`.

Your `Root` component should look like this:

```js
import React from 'react';
import { Provider } from 'react-redux';

const Root = ({ store }) => (
  <Provider store={store}>
    <div>Hello, world!</div>
  </Provider>
);

export default Root;
```

**NB**: Remember that anywhere we use JSX, we *must* import React.

* Update your doc-ready callback in the entry file `pokedex.jsx` to:
  * Import your newly defined `Root` component;
  * and render it, passing is the `store` as a prop.

Like so:

```js
document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store}/>, root);
});
```

**Test that your `Root` component is properly rendered before moving on.**

### `PokemonIndex`

Remember that there are two types of React components: presentational components
and container components. **Container components** (i.e. containers) are
concerned with subscribing to the store, reading from state, and passing down
necessary props to presentational components. Our **presentational components**
are concerned with rendering JSX and defining the user interface.

#### `PokemonIndexContainer`

* Create a `frontend/components/pokemon` folder. This will house all of the
React components concerning the `pokemon` slice of state.
* With this folder, create a `pokemon_index_container.js` file.
* As with all container components, import the `connect` function from the
`react-redux` package.

The `connect` function accepts two functions as arguments: `mapStateToProps` and
`mapDispatchToProps`. Both functions are invoked when our redux store updates.
They are responsible for determining and constructing the props that are passed to
presentational component.

* Define `mapStateToProps`.

  ```js
  const mapStateToProps = state => ({
    // piece of state that container subscribes to
  });
  ```

* Define `mapDispatchToProps`.

  ```js
  const mapDispatchToProps = dispatch => ({
    requestAllPokemon: // dispatch requestAllPokemon action.
  });
  ```

* Import your `selectAllPokemon` selector.
* Use it to pass a `pokemon` prop to the connected presentational component
`PokemonIndex`. `this.props.pokemon` in `PokemonIndex` will return an array of
all the pokemon objects in the app state.
* In the next phase we'll actually define our `PokemonIndex` component in
`frontend/components/pokemon/pokemon_index.jsx`. Assume it already exists, and
import it.
* `connect` `PokemonIndex` and export the returned component. Like so:

  ```js
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PokemonIndex);
  ```

#### `PokemonIndex`

Now let's write the `PokemonIndex` presentational component, which should render
an unordered list of pokemon names next to corresponding images.

* Create a `frontend/components/pokemon/pokemon_index.jsx` file.
* Define and export a *class*, component that renders a `<li>` for each pokemon object in the `this.props.pokemon` array.
  * Display the pokemon's name and a *small* image.
* Inside of `componentDidMount`, call `this.props.requestAllPokemon`
* Import the container component to `root.jsx`.
* Nest and render a `<PokemonIndexContainer />` within your `<Root />` component.

**Test your `PokemonIndex` components**: To start, your app should render an empty `ul`
reflecting your app's initial state, after the request to `requestAllPokemon` succeeds the ul should be populated with pokemon. Look for webpack and console errors when debugging.

Now you should see your list of pokemon whenever you refresh the page. Go ahead
and remove all other extraneous action creators, constants, and code snippets
used for testing from our entry point if you haven't already. **Show a TA that your pokemon React components render before moving on!**

Continue to [Part 2](./pokedex_ii.md).
