# Pokedex: An Introduction to the React Router

[**Live Demo!**](http://aa-pokedex.herokuapp.com/)

In this project, we'll write an app to manage your `Pokemon` and their `Items`.

## Phase 0: Rails API Setup
We've already set up a Rails backend with migrations and models in the [skeleton][skeleton-zip].

+ Download the [skeleton][skeleton-zip].
+ Run `bundle install`.
+ Make sure Postgres is running then run `rake db:setup` (short for
  `rake db:create db:migrate db:seed`).

Get yourself oriented.

+ Take a look at the `schema`, `routes`, and `StaticPagesController`.
+ Also look at the `Pokemon` and `Item` models
+ Open up the rails console (`rails c`) to see what's in the database.
+ Start up the rails server (`rails s`) and visit the root url.

:art: Stylesheets have been provided for you in the skeleton! :art:

[skeleton-zip]: ./skeleton.zip?raw=true

### The api namespace

Let's build routes for our pokémon! We want these routes to be nested under an api namespace.

  ```ruby
    namespace :api, defaults: {format: :json} do
      # api routes
    end
  ```

  Build the appropriate routes. Your routes table should look *something* like the following:

  | Prefix           | Verb  | URI Pattern      | Controller#Action
  |------------------|-------|------------------|-------------------
  |root              | GET   | /                | static_pages#root
  |api_pokemon_index | GET   | /api/pokemon     | api/pokemon#index
  |                  | POST  | /api/pokemon     | pi/pokemon#create
  |api_pokemon       | GET   | /api/pokemon/:id | api/pokemon#show
  |                  | PATCH | /api/pokemon/:id | api/pokemon#update
  |                  | DELETE| /api/pokemon/:id | api/pokemon#destroy


### Pokemon Controller

  Build a controller to handle our pokémon resource. Start by defining the `#index` and `#show` actions. Remember, we want these actions to **render json responses**. To make the job easier for our frontend, you should format your index response like this:

  ```
    {
      1: { ..pokémon 1 info.. },
      2: { ..pokémon 2 info.. },
      ...
    }
  ```

  Here, the keys in your json response are the primary keys of the pokémon. The values are the pokémon themselves. Let's use jBuilder here!

  * Iterate over each pokémon.
  * Use `json.set!` to explicity set the key to the pokémon's id
  * Use `json.extract!` to grab the pokémon's id, name, and image_url
    * We don't need to return any more information than this for our index route!

  ```ruby
    @pokemon.each do |poke|
      json.set! poke.id do
        json.extract! poke, :id, :name, :image_url
      end
    end
  ```

  Finally, build a `#show` action as well. We'll want the `#show` action to render all the information about our pokémon, **including the pokémon's items.** Do so like this:

  A GET request to `localhost:3000/api/pokemon/5` should yield something like:

  ```
    {
      "id": 4,
        ...
      "moves": [ ... ],
      "items": [
        {
        "id": 12,
        "name": "General Iron Fist Man",
        "pokemon_id": 4,
        "price": 41,
        "happiness": 74,
        "image_url": "/assets/pokeball.png"
        },
        ...
      ]
    }
  ```

**Test your routes and controller actions** by making GET requests to `localhost:3000/api/pokemon` and `localhost:3000/api/pokemon/#`.


## Phase 1: Frontend Setup

### Node Package Manager

As with previous projects, you will need to set up `package.json` and
`webpack.config.js` files to configure your application to use NPM and Webpack.

+ First, run `npm init -f` to initialize `package.json` with the default settings.

Instead of proceeding to run `npm install --save <package-name>` to install
dependencies, we want to use specific versions of each package.

+ `npm install --save` the following npm packages:

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

### `Webpack`

Next we need to configure Webpack to compile our `bundle.js` file.

+ Create a new file called `webpack.config.js` in the root of your project.
+ Copy and paste the following configuration:

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
        },
        {
          test: /\.node$/,
          loader: 'node-loader'
        }
      ]
    },
    devtool: 'source-maps'
  };
  ```

+ Now that Webpack knows to create `bundle.js`, require it in our `application.js`:

  ```js
    //= require jquery_ujs
    //= require bundle
  ```

Notice that the `entry` key in `webpack.config.js` expects a file called
`./frontend/pokedex.jsx` to exist.

  + Make the `frontend` folder in the root of
  your project
  + Add an entry file called `pokedex.jsx` - this is going to be the starting
  point for the rest of your app
  + `import` both the `react` and `react-dom` packages
  + Add an event listener for `DOMContentLoaded`.
  + In the callback to this listener, try rendering a simple stateless
  React component to test everything we've written so far
  + Don't forget to run `webpack --watch` to generate your `bundle.js`.

Your entry file might look something like the following:
  ```js
    import React from 'react';
    import ReactDOM from 'react-dom';

    document.addEventListener('DOMContentLoaded', () => {
    	const root = document.getElementById('root');
    	ReactDOM.render(<h1>hello</h1>, root);
    });
  ```

**Test your code** - make sure that your test component renders at `localhost:3000/`.

### Frontend Structure
Next, define the structure of your `frontend` directory. You should have folders
called `actions`, `components`, `reducers`, `store`, `middleware` and `util`.

## Phase 2: Redux Setup

### API and Action Creators

We'd like to render a list of Pokemon. Let's start by setting up a way to fetch
them from the back end.

+ Make an `api_util.js` file inside your `util` folder
  + Inside this file, we'll make ajax requests that fetch information served by our
  rails controllers, and on success dispatch an action creator
+ Export a function called `fetchAllPokemon` that takes in a success callback as
an argument
  + The function should make an AJAX request that will serve up the
  `index.json.jbuilder` view for Pokemon
  + Check out `routes.rb` or run `rake routes` to determine the appropriate url for this request

Next, let's write some action creators that will trigger this utility function.

  + Create a `pokemon_actions.js` file within the `actions` folder

  + Export a constant called `RECEIVE_ALL_POKEMON` with the value "RECEIVE_ALL_POKEMON"
  + Export a function called `receiveAllPokemon(pokemon)` that returns an action
  object
    + This object should have two keys: `type` of `RECEIVE_ALL_POKEMON` and another for the `pokemon` data

Your code should look like the following:
  ```js
    // frontend/actions/pokemon_actions.js
    export const RECEIVE_ALL_POKEMON = 'RECEIVE_ALL_POKEMON';

    export const receiveAllPokemon = pokemon => ({
      type: RECEIVE_ALL_POKEMON,
      pokemon
  })
  ```

**Import the action and api_util functions in your entry file.** Assign them to the window to test that everything works.

We should be able to run:

  ```js
    const fetchSuccess = pokemon => console.log(receiveAllPokemon(pokemon));
    fetchAllPokemon(fetchSuccess);
  ```

Test that this works in the browser console **before moving on!**

Next, let's write and export a `requestAllPokemon()` action creator.
+ Define and export the appropriate action type constant `REQUEST_ALL_POKEMON`.
+ `requestAllPokemon()` will not need to receive any arguments, and will return an
action object with a `type` of `REQUEST_ALL_POKEMON`.
+ This action creator will come in handy later, when we build our middleware.

### The `PokemonReducer`

Let's create a new file, `pokemon_recucer.js`, which should live in `frontend/reducers/`.

Remember that the reducer is only concerned with describing how the state changes as a result of a dispatched action.

Also Remember, the reducer function takes two parameters: the `oldState` and the action being dispatched. It should then return the new state, without mutating the `oldState` object. If the reducer doesn't care about the action being dispatched, it should return the `oldState`.

Start by importing the `RECEIVE_ALL_POKEMON` constant.

  ```js
    import { RECEIVE_ALL_POKEMON } from '../actions/pokemon_actions';
  ```

Then, build a reducer that implements a `switch` statement, triggering on `action.type`. Your reducer should look something like this:

  ```js
    const PokemonReducer = (oldState = {}, action) => {
      switch (action.type) {
        case RECEIVE_ALL_POKEMON:
          return action.pokemon;
        default:
          return oldState;
      }
    }
  ```

Export default the `PokemonReducer`.

### The `IndexReducer`

Before we can use our `PokemonReducer`, we have to create an `IndexReducer`. This will give our application state some more structure and make it easier to add additional reducers later.

Create a new file: `/frontend/reducers/index_reducer.js`

Inside, import two objects: `combineReducers` from `redux` and our own `PokemonReducer`:

  ```js
    import { combineReducers } from 'redux';
    import PokemonReducer from './pokemon_reducer';
  ```

Here, we'll use `combineReducers` to specify our highest level application state. Let's tell redux that the `PokemonReducer` is responsible for the `pokemon` part of our state.

  ```js
    const IndexReducer = combineReducers({
      pokemon: PokemonReducer
    });
  ```

Export default the `IndexReducer`;

**Before we can test the reducer we need a store to dispatch from.**

### Store

Remember, a Redux store contains a reference to the application's state tree.

+ Create a `store.js` file within the store folder
+ Import `createStore` from the `redux` library
+ Import `IndexReducer`
+ The `createStore` function has the following parameters:
  + The reducer
  + An optional `preloadedState`
  + Any enhancers such as middleware

For now just pass it the imported `pokemon_reducer` and we will come back to the other arguments later.

+ Wrap the creation of the store in a `configureStore` function.

**NB**: This is a great pattern to get used to: instead of just exporting the
store, we are exporting a function that creates and returns a `store`. This can
be used in the future to swap out reducers, `preloadedState`, or enhancers
depending on certain conditions.

Your code should look like the following:

  ```js
    // frontend/store/store.js
    const configureStore = () => (
      createStore(
        IndexReducer
      )
    );
  ```

+ Head back to the `pokedex.jsx` entry file.
+ Import your `configureStore` function.
+ Call it inside the `DOMContentLoaded` callback and assign the return value to `store`.
+ Assign it to the window as well, for testing.

Next, let's open up the browser console. We should be able to run the following:

  ```js
    store.getState(); // You should see the default application state

    const fetchSuccess = pokemon => store.dispatch(receiveAllPokemon(pokemon));
    fetchAllPokemon(fetchSuccess);

    store.getState(); // You should see the updated application state
  ```

**Confirm that this works before moving on!**

### Middleware

Our `PokemonMiddleware` will be responsible for a number of things, including
triggering api calls that eventually populate our `store` with pokémon.

Remember, `Middleware` receives dispatches before the store. It can decide to
intercept the dispatch, trigger another dispatch, or simply pass on it and do
nothing.

* Create a file, `middleware/pokemon_middleware.js`
* Import the following:
  + The `fetchAllPokemon` api utility function
  + The `REQUEST_ALL_POKEMON` constant
  + The `receiveAllPokemon` action creator

Recall that [Redux Middleware][middleware-docs] employs a currying strategy to
link several `Middleware` to each other and ultimately to the store. You'll need
to define 3 functions that wrap one-another like so:

  ```javascript
    const PokemonMiddleware = ({dispatch}) => next => action => {
      // ...
    }
  ```

+ Let's start by writing some `Middleware` that will just `console.log` whenever it
sees a `REQUEST_ALL_POKEMON` action type.

  ```javascript
    const PokemonMiddleware = ({dispatch}) => next => action => {
      switch(action.type){
        case REQUEST_ALL_POKEMON:
          console.log("gotta fetch 'em all!")
          next(action);
        default:
          next(action);
      }
    }
  ```

+ Export your `PokemonMiddleware`!

  ```javascript
  export default PokemonMiddleware;
  ```

Similar to the `IndexReducer`, let's create an `IndexMiddleware` that configures all of our middlewares for us.
  * Create a file, `middleware/index_middleware.js`
  * Import the following:
    * `applyMiddleware` from `redux`
    * `PokemonMiddleware`

Create an 'IndexMiddleware' like so:

  ```js
    const IndexMiddleware = applyMiddleware(PokemonMiddleware);
    export default IndexMiddleware;
  ```

Refactor your `configureStore` function to use the `IndexMiddleware`.

  ```js
    const configureStore = (preloadedState = {}) => (
      createStore(
        IndexReducer,
        preloadedState,
        applyMiddleware(PokemonMiddleware)
      )
    );
  ```

Remember, the `preloadedState` is optional, so let's default it to an empty object.

[middleware-docs]: http://redux.js.org/docs/advanced/Middleware.html

Let's test that our `PokemonMiddleware` is setup properly. Open the browser console and type:

  ```js
    store.dispatch(requestAllPokemon());
  ```

**You should see the "gotta fetch 'em all!" console.log!** Make sure this works before moving on.

#### Connecting all the dots

Let's update our PokemonMiddleware to actually `fetchAllPokemon` and then `dispatch` a `receiveAllPokemon` action.

Inside of your `PokemonMiddleware` function:

  * Define a callback, `receiveAllPokemonSuccess`, that dispatches a `receiveAllPokemon` action
  * Invoke `fetchAllPokemon` when a `REQUEST_ALL_POKEMON` action is dispatched
  * Pass `receiveAllPokemonSuccess` to `fetchAllPokemon` as the success callback

  ```js
    const PokemonMiddleware = ({dispatch}) => next => action => {
      const receiveAllPokemonSuccess = data => dispatch(receiveAllPokemon(data));

      switch (action.type) {
        case REQUEST_ALL_POKEMON:
          fetchAllPokemon(receiveAllPokemonSuccess);
          next(action);
          break;
      }
    }
  ```

We've done it! Let's do one final test of our redux structure. Open up the browser console and try:

  ```js
    store.getState(); // Should return the initial application state
    store.dispatch(requestAllPokemon());
    store.getState(); // Should return the updated application state with pokémon!
  ```

### Selectors

We're going to add one final piece to our redux structure: selectors. Selectors are functions that are used to "select" complex pieces of the state. These files typically live in the reducers folder.

  * Create a file, `reducers/selectors.js`
  * Define and export a function, `selectAllPokemon(state)`, which accepts the application state as an argument and exports an array of all the pokémon objects. *Use lodash's #values method*

Assign `selectAllPokemon` to the window for testing. You should should be able to do the following:

  ```js
    const initialState = store.getState();
    selectAllPokemon(initialState); // ==> []

    store.dispatch(requestAllPokemon());

    const populatedState = store.getState();
    selectAllPokemon(populatedState); // ==> array of pokemon!
  ```

We'll use this selector later in this project.

**Call a TA over and show them your redux cycle and selector!**

## Phase 3: React Components

### The `Root` Component

Let's build a `Root` component that will be responsible for rendering all of our other components. `Root` should be a *stateless* component that accepts the `store` as a prop. Our `Root` components should then wrap our components using the `Provider` from `react-redux`.

  ```js
    import React from 'react';

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

Remember that there are two types of components in the modern discussion of
React/Redux: presentational components and container components. Our **container
components** are concerned with subscribing to the store, reading from state, and
passing down necessary props to our presentational components. Our
**presentational components** will only be concerned with rendering JSX and
providing functionality to the user interface.

#### `PokemonIndexContainer`

+ Within `frontend/components/pokemon/`, create a `pokemon_index_container.js`
file.
+ As with all container components, we will need to import the `connect` function

  ```js
    import { connect } from `react-redux`;
  ```

The connect function accepts two primary arguments: `mapStateToProps` and
`mapDispatchToProps`. Both functions are invoked when our redux store updates. They are responsible for constructing props, which are then passed to the presentational component. We'll only need `mapStateToProps` here.

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
Now let's write the `PokemonIndex` presentational component, which will render
an unordered list of Pokemon names next to corresponding images.

+ Create a `frontend/components/pokemon/pokemon_index.jsx` file
+ Build and export a *stateless*, *functional* component that creates a `<li>` for each pokemon
  + In each `<li>`, display the pokémon's name and a *small* image

Import the container component in your entry file and nest a `<PokemonIndexContainer />` within your `<Root />` component.

Also amend our doc-ready callback to in include a `dispatch` of `requestAllPokemon`

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

Go ahead and **remove all other extraneous action creators, constants, or other redux pieces from our entry point**


## Phase 3: React Router

Now let's say we want the ability to click on any of these Pokemon and see more
details about them. In order to maintain a common user interface used around the
web, we will have the URL define what components the user sees. This is exactly
what the powerful `react-router` library is for. To use it, navigate to `root.jsx` and import the following:

  ```js
    import { Router, Route, hashHistory } from 'react-router';
  ```

Refer to the [routes reading][routes-reading] if you need a refresher

[routes-reading]: https://github.com/ReactTraining/react-router/blob/master/docs/guides/RouteConfiguration.md

#### The `Router`

The Router component is responsible for listening for changes to our browser's url. When the url changes, the `Router` looks at it's child `Route` components. The `Router` then chooses which component to render based on the `Route`.

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

**Test that everything still works before moving on!**

#### The onEnter Hook

The React Router allows us to do some refactoring of our `requestAllPokemon` dispatch, which we trigger in the doc-ready callback. Let's add an [onEnter][on-enter] hook to our `/` component. This hook will trigger a function whenever we enter the root url. Hence, when the page first loads, we'll fetch all our pokémon.

  * Import the `requestAllPokemon` action creator
  * Create an `onEnter` hook for your root route
  * Define a function inside of `Root`, called `requestOnEnter`, that dispatches `requestAllPokemon`

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

**Test your changes:** Make sure all Pokemon still render before moving on.

[on-enter]: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback

### Pokemon Index Item

Let's refactor each of our Pokemon into their own `PokemonIndexItem` components.
This is a great pattern for keeping our components minimal. Now the list will
only care about rendering all of the list items and the items will care about
the functionality of showing their details.

We will structure the index item components to receive all their information
through props.  This way they do not need lifecycle methods and will work
perfectly as stateless functional components. Write a `<PokemonIndexItem>`
component and refactor `<PokemonIndex>` to utilize this new component.  

**Test your code** to ensure everything still renders as it did before.  

In order to pass a reference to the router we wrap a component in what is
referred to as an Higher Order Component (HOC). These components, much like our
containers, serve only to pass down information through props. To implement this
we `import { withRouter } from 'react-router'` and then call this function on
our component when we export it: `export default withRouter(ComponentName)`.
Add this code to your `PokemonIndexItem`, making sure to add `router` to the
list of props being received by the `PokemonIndexItem`.

Now the component has a reference to the router and all of its information &
functions. One such function will be our most useful when implementing
navigation: `router.push(url)`.

Create a `handleClick` function in this file that receives the router and a url.
Pass this function to an `onClick` prop of our list elements and **test your
code** by clicking a `pokemonIndexItem` and making sure that you are taken to a
path resembling `/pokemon/:id`.

`PokemonIndexItem` example JSX structure:    
```html   
<li onClick={}>    
    <span>{}</span>   
    <img src={} alt={}/>    
    <span>{}</span>   
</li>   
```

While the route will change, you may have noticed the following error in your
browser terminal: `[react-router] Location "/pokemon/:id" did not match any
routes`.  This tells us that the router was looking for a component to render
for that route but was unable to find one. To fix this, let's make a
`PokemonDetail` component.

## Phase 4: Pokemon Detail

Before creating a component, we should always plan out where and how it will get
its information. Eventually, we will want the `PokemonDetail` to display a Pokemon's information as well as its `Items`. Talk over the following questions with your partner:

1. Where will the `PokemonDetail` get it's information from?
2. How will we pass this information to `PokemonDetail`?

Implement the `PokemonDetail` component just like we did the `PokemonIndex`:

1. Create an API utility function that fetches a single Pokemon.
2. Create actions for both requesting and receiving a single Pokemon.
3. Create a `PokemonDetailReducer` reducer to respond to the receiving of a Pokemon.
4. Update the `PokemonMiddleware` to respond to the requesting of a Pokemon.
5. Create a `PokemonDetailContainer` that maps props for `PokemonDetail`.
6. Create a `PokemonDetail` component.

Just like the `PokemonIndex`, use an `onEnter` hook in the Route to invoke the
`RequestSinglePokemon` action. But this time we will need to pass an ID to the
action. Refer to the [`onEnter` documentation][on-enter] to figure out how we
get this information.

7. Complete the corresponding route that renders the `PokemonDetailContainer`

Nest the `PokemonDetail` route under the route for the `PokemonIndex`.  We will
also need to **explicitly tell the `PokemonIndex` component to render it's
children** (make sure to pass `children` as a prop). This will ensure that both
components will be rendered on the page when at the `"/pokemon/1"` path.

As a reminder, the syntax for nested routes follows the following pattern:
```js
<Route path='PARENT_PATH' component='PARENT_COMPONENT'>
  <Route path='CHILD_PATH' component='CHILD_COMPONENT'></Route>
</Route>
```

[on-enter]: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback

## Phase 5: Item Detail

Implement the ability to click on an item and be taken to a path such as
`/pokemon/1/items/1` where an `ItemDetail` component displays information about an
Item below the `PokemonDetail` component. This should be completed without any
additional changes to the application state.

You will need to:
1. Create an `ItemDetailContainer` that provides the item's information as props
2. Create an `ItemDetail` component that displays its props
3. Create a nested route that renders the `ItemDetailContainer` when the path matches `/pokemon/:pokemonId/items/:itemId`

When providing the item to the `ItemDetail` component from the
`ItemDetailContainer`, remember that `mapStateToProps` accepts a second parameter
`ownProps`. Use this to find into the correct item.

**Hint:** A component rendered by a route receives `params` as a prop, which includes information about the route.

**Test your code** by clicking on a Pokemon's item and making sure that a `ItemDetail` component is rendered with the correct information.

## Phase 6: Creating Pokemon

Our next feature will be to allow the creation of new Pokemon. To allow users to create Pokemon, you will need to:

0. Define a `#create` controller action for the `PokemonController`
0. Create an API function that sends a single Pokemon's information as part of a `POST` request to the backend
0. Create actions for both creating and receiving a new Pokemon
0. Update the reducer to respond to receiving a new Pokemon (**Hint:** This should merge multiple pieces of state)
0. Update the middleware to respond to a `CREATE_POKEMON` action
0. Create a `PokemonFormContainer` that only connects `mapDispatchToProps`
  0. Pass a function prop called `createPokemon` that dispatches your `CREATE_POKEMON` action
0. Create a `PokemonForm` controlled component

A controlled component is one which overrides the default functionality of the
browser, allowing your code to entirely control your application. This is most
commonly used in forms to ensure that input field values are being tracked in
internal state and that submit buttons perform actions as described by the
application.

Use the `constructor()` method to provide a default internal state to your form. Even though Javascript convention is to use camelCase, it is often easiest to define data in the format our server expects when making a "POST" request.  In Ruby, this means snake_case.

Normally these constructor functions are taken care of by React. In this case, we are overriding the constructor function to have a default internal state, so it is our responsibility to make sure all functions are properly bound.

```javascript
  constructor(props) {
    super(props);
    this.state = {
      // Internal Default State
    };
    this.exampleMethod = this.exampleMethod.bind(this);
  }
```

For the input elements, use an `onChange` listener and write a single `update`
function to call the `setState` method.

An basic example of an `update` method is below:
  ```js
    update(property) {
      return e => this.setState({[property]: e.target.value});
    }
  ```

The best html element for the Pokemon type is a `<select>` element, which
appears to the user as a dropdown. Copy / paste the array of pokémon types from the model and use it in your `PokemonForm`.

Write a `handleSubmit` method as well that prevents the default event action and
instead calls the `createPokemon` function from props. Make sure to pass this
function to the `onSubmit` listener of the form.

We want this form to appear when at the same root path as the `PokemonIndex`,
but not at any further nested routes like the `PokemonDetail`. This is exactly
what `IndexRoute` is for. Import it along with the rest of the React Router
tools and pass it the `PokemonFormContainer`.

**NB**: There are a couple of tricky aspects to getting the form to work properly which
will be great debugging practice. Use a `debugger` in your `postPokemon`
function to ensure that you are always passing the correct parameters to your
API.

**Next steps:** The final tricky parts of the `PokemonForm` are the redirect callback and error handling.

### Redirecting

Once the posting is complete we want the application to redirect to the newly created Pokemon. We need to wait, however, because we need this Pokemon's ID in order to push to that URL. This should happen in our `PokemonMiddleware`. In order to change location outside of React components, we need to import the `hashHistory` module.

  ```js
    import {hashHistory} from 'react-router';
  ```

This imports a reference to the `hashHistory` object that we can push directly
to. Call `hashHistory.push` with the correct url inside of your `postPokemon`
success callback.

Your `PokemonMiddleware` should look something like this:

  ```js
    const PokemonMiddleware = default ({dispatch}) => next => action => {

      const receiveNewPokemonSuccess = pokemon => {
        dispatch(receiveNewPokemon(pokemon));
        hashHistory.push(`/pokemon/${pokemon.id}`);
      };

      // ...

      switch (action.type) {
        //...

        case CREATE_POKEMON:
          postPokemon(action.pokemon, receiveNewPokemonSuccess);
          next(action);
          break;
      }
    };
  ```

### Error Handling

The server will tell us whether or not our new Pokemon was created successfully. But so far, we have no way of letting our users know what happened. We need a way of displaying errors on the front-end after an unsuccessful POST request.

  0. Add a failure callback to the `postPokemon` api util function
  0. Add a `pokemonError` action
    0. Also create the necessary constants
  0. Add a new reducer, `ErrorsReducer`
  0. Update the `PokemonMiddleware` to use this new action
    0. `PokemonMiddleware` should also be responsible for constructing the error callback
  0. Add a `mapStateToProps` function that connects to the `PokemonFormContainer`
  0. Add an errors function to the `pokemonForm` that returns an unordered list of error messages.
  0. Add a `mapStateToProps` function in the `PokemonFormContainer` to provide the `PokemonForm` with a list of errors

### Loading Spinner

In this phase we'll create a 'loading' spinner that displays while we're fetching information from the backend.

  0. Google search "css spinners" -- pick one you like!
  0. Create a new reducer, the `LoadingReducer`
    0. Your `LoadingReducer` shoulw care about all `REQUEST_` and `RECEIVE_` action types
    0. When a request is made, change the loading state to `true`, when the data is received, change the state to `false`
  0. Use `next(action)` in your `PokemonMiddleware` to always ensure the passing of
  your actions to the reducer
  0. Change your `PokemonIndex` and `PokemonDetail` components to render the spinner if the loading state is `true`

### Bootstrap Pokétypes

We have a list of pokétypes in two places: our `Pokemon` model and our `PokemonForm` React component. This is not very dry. Let's employ a tactic called "bootstrapping" to tell our form all the pokémon types.

  0. Delete the `POKEMON_TYPES` constant from your `PokemonForm` component
  0. Open `application.html.erb`
    0. Add a `<script>` tag; inside, set the value of window.POKEMON_TYPES to the POKEMON_TYPES constant used in the `PokemonModel`
    0. Use the `#raw` method to tell rails not to escape the symbols in our array
  0. Update you `PokemonForm` to use `window.POKEMON_TYPES` instead

  ```js
    window.POKEMON_TYPES = <%=raw Pokemon::TYPES %>
  ```

### Update Items

Add the ability to reassign items to different Pokemon. This time, design is up to you!
