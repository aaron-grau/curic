# Pokedex: An Introduction to the React Router

[**Live Demo!**](http://aa-pokedex.herokuapp.com/)

In this project, we'll write an app to manage your `Pokemon` and their `Toys`.

## Phase 0: Rails API Setup
We've already set up a Rails backend with migrations, models, controllers, and
views for you to start with in the [skeleton][skeleton-zip].

+ Download the [skeleton][skeleton-zip].
+ Run `bundle install`.
+ Make sure Postgres is running then run `rake db:setup` (short for
  `rake db:create db:migrate db:seed`).

Get yourself oriented.

+ Take a look at the schema, routes file, and jbuilder views for `Pokemon` and `Toys`.
+ Open up the rails console (`rails c`) to see what's in the database.
+ Start up the rails server (`rails s`) and visit each api route to see what
data is served up from the backend at each endpoint.
  + Run `rake routes` to see what routes are available.
  + For example, visiting `http://localhost:3000/api/pokemon/63` returns
  information about the pokemon Squirtle parsed by the jbuilder view at
  `app/views/api/pokemon/show.json.jbuilder`.

  ```
  {
    id: 63,
    attack: 48,
    defense: 65,
    image_url: "/assets/pokemon_snaps/007.png",
    moves: [
      "tackle",
      "bubble",
      "water gun"
    ],
    name: "Squirtle",
    poke_type: "water",
    toys: {
      187: { id: 187, happiness: 72, image_url: "http://placekitten.com/200/300?image=3", name: "Falcon", pokemon_id: 63, price: 84 },
      188: { id: 188, happiness: 37, image_url: "http://placekitten.com/200/300?image=8", name: "Dormammu Dragon", pokemon_id: 63, price: 1 },
      189: { id: 189, happiness: 5, image_url: "http://placekitten.com/200/300?image=12", name: "General Blob", pokemon_id: 63, price: 82 }
    }
  }
  ```

**NB**: The `defaults: {format: :json}` in the `routes.rb` file means
HTTP requests for the `pokemon` resource should be assumed to be asking for a
JSON response instead of HTML. When we render a template, instead of looking
for `template.html.erb`, Rails will look for `template.json.jbuilder`.

:art: Stylesheets have been provided for you in the skeleton! **Follow the
sample jsx structures provided in the instructions to have these stylings
applied.** :art:

[skeleton-zip]: ./skeleton.zip?raw=true

## Phase 1: Frontend Setup

### Node Package Manager

As with previous projects, you will need to set up `package.json` and
`webpack.config.js` files to configure your application to use NPM and Webpack.

* First, run `npm init -f` to initialize `package.json` with the default settings.

Instead of proceeding to run `npm install --save <package-name>` to install
dependencies, we want to use specific versions of each package.

+ To that end, add (or replace if it already exists) a "dependencies" key in the `package.json`
file with the following:

```json
  "dependencies": {
    "babel-loader": "^6.2.4",
    "babel-core": "^6.13.2",
    "babel-preset-es2015": "^6.13.2",
    "babel-preset-react": "^6.11.1",
    "lodash": "^4.15.0",
    "react-redux": "^4.4.5",
    "react": "^15.3.0",
    "react-dom": "^15.3.0",
    "react-router": "^2.6.1",
    "redux": "^3.5.2",
    "webpack": "^1.13.1"
  }
```

+ Run `npm install` to generate your `node_modules` folder.

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
point for the rest of your app.
+ `import` both the `'react'` and `'react-dom'` packages.
+ Then add an event listener for `DOMContentLoaded`.  
+ In the callback to this listener, try rendering a simple stateless functional
React component to test out everything you've written so far.
+ Don't forget to run `webpack --watch` to generate your `app/assets/javascripts/bundle.js`.

Your entry file might look something like the following:
```js
import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', () => {
	const root = document.getElementById('root');
	ReactDOM.render(<h1>hello</h1>, root);
});
```

**Test your code** - make sure that your test component renders at `http://localhost:3000/`.

### Frontend Structure
Next, define the structure of your `frontend` directory. You should have folders
called `actions`, `components`, `reducers`, `store`, `middleware` and `util`.

## Phase 2: The Pokemon Index

### From API to Action Creator

We'd like to render a list of Pokemon. Let's start by setting up a way to fetch
them from the back end.

+ Make an `api_util.js` file inside your `util` folder.
  + Inside this file, we'll make ajax requests that fetch information served by our
  rails controllers, and on success dispatch an action creator.
+ Export a function called `fetchAllPokemon` that takes in a success callback as
an argument.
  + The function should make an AJAX request that will serve up the
  `index.json.jbuilder` view for Pokemon.  
  + Check out `routes.rb` and run `rake routes` to determine the appropriate url for this request.

Now let's write the success callback that will be passed to this function.

+ Create a `pokemon_actions.js` file within the `actions` folder and import the
ajax request function we just wrote.
  + **Tip**: `import * as API from '../util/api_util.js'` is a nice way to just
  import all of the api util functions as key-value pairs of an `API` object!

In our newly created `pokemon_actions.js` file,

+ Start by exporting a constant called `RECEIVE_ALL_POKEMON` with the value `"RECEIVE_ALL_POKEMON"`.
+ Next, export a function called `receiveAllPokemon(pokemon)` that returns an action
object.
  + This object should have two keys: `type` of `RECEIVE_ALL_POKEMON` and another for the `pokemon` data.

Your code should look like the following:
```js
// frontend/actions/pokemon_actions.js
export const RECEIVE_ALL_POKEMON = 'RECEIVE_ALL_POKEMON';

export const receiveAllPokemon = pokemon => ({
  type: RECEIVE_ALL_POKEMON,
  pokemon
})
```

**Import the action and api_util functions in your entry file to test that everything
works**.  Remember, our action creator just returns an object. In order to
verify that we indeed received all the Pokemon, we can wrap it in a
`console.log`. Like so,

```javascript
const fetchSuccess = pokemon => console.log(receiveAllPokemon(pokemon));
API.fetchAllPokemon(fetchSuccess);
```

Next, let's write and export a `requestAllPokemon()` action creator.
+ Define and export the appropriate action type constant `REQUEST_ALL_POKEMON`.
+ `requestAllPokemon()` will not need to receive any arguments, and will return an
action object with a `type` of `REQUEST_ALL_POKEMON`.

### The Reducer

Remember that the reducer is only concerned with describing how state changes as
a result of a dispatched action. In our case this will be the
`receiveAllPokemon` action.

Remember, the reducer function takes two parameters: the `oldState` (defaulting
to an empty object) and the action being dispatched. It should then return the
new state, without mutating the `oldState` object.  The default case for the
reducer switch statement to return is the `oldState`.

+ Create a `pokemon_reducer.js` file that exports a reducer function implementing a
switch statement to catch the `action.type`.
+ Refer to these action types by
importing the relevant action type constants from `pokemon_actions.js`.

**Tip**: The [Lodash merge](lodash-docs) function is a helpful method to use to avoid mutating
nested arrays and objects.

[lodash-docs]: https://lodash.com/docs

**Before we can test the reducer we need a store to dispatch from.**

### Store

Remember, a Redux store contains a reference to the application's single
complete state tree.

+ Create a `store.js` file within the store folder.  
+ Import `createStore` from the `redux` package.
+ The `createStore` function takes the reducer, any `preloadedState`, and any
enhancers such as middleware. For now just pass it the imported
`pokemon_reducer` and we will come back to the other arguments later.
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
    PokemonReducer
  )
);
```

+ Head back to the `pokedex.jsx` entry file.
+ Import your `configureStore` function.
+ Call it inside the DOM listener callback and assign the return value to `store`.
+ Replace the logging of your `receiveAllPokemon` success callback with a dispatch using the store.

**Test that this dispatches the action to our reducer and updates the state** by
placing the `store` on the window at the end of the listener and calling
`store.getState()` in your console.

+ Now let's pass the store to our root component as a prop.  
+ Inside the root component, modify your function to receive a parameter `({ store })`.

If we try to read the state of our store, what is going to happen? Talk this
over with your partner before moving on.

### Connect

In order to have our component render after the state is updated we have to
subscribe our component to our state. We can easily do this using the
`react-redux` bindings.

Remember that there are two types of components in the modern discussion of
React/Redux: presentational components and container components. Our **container
components** are concerned with subscribing to the store, reading from state, and
passing down necessary props to our presentational components. Our
**presentational components** will only be concerned with rendering JSX and
providing functionality to the user interface.

#### `PokemonIndexContainer`

+ Within `frontend/components/pokemon/`, create a `pokemon_index_container.js`
file.
+ As with all container components, we will need to `import { connect } from
'react-redux'`.  

The connect function takes two main arguments: `mapStateToProps` and
`mapDispatchToProps`. Mapping state to props will subscribe the component to the
Redux store updates. Anytime the store changes, `mapStateToProps` will be called
and return a plain object that is merged into the component’s props.

```javascript
const mapStateToProps = state => ({
  // piece of state to subscribe to
});
```

+ Write `mapStateToProps` which will pass `state.pokemon` as a prop to the
connected component.

Mapping dispatch to props is used mainly just to keep our presentational
components from having to worry about dispatching actions. This function expects
to be passed action creators that it then wraps in the dispatch function and
merges each into the component's props for direct invocation.

```javascript
const mapDispatchToProps = dispatch => ({
  // functions to dispatch relevant actions
});
```

This introduces a problem. According to our React/Redux pattern, components are
only supposed to manipulate state through the dispatching of actions. They
should not be making AJAX requests to our server. We need a way to dispatch a
request action that will then perform the AJAX fetch.

+ Talk over a plan to solve this problem with your partner before writing your
`mapDispatchToProps` function.

+ After writing your mapping functions, pass them to the connect function and then
invoke the connect function by passing it a `PokemonIndex` presentational
component, which we will write next.

#### `PokemonIndex`
Now let's write the `PokemonIndex` presentational component, which will render
an unordered list of Pokemon names next to corresponding images.

+ Create a `frontend/components/pokemon/pokemon_index.jsx` file.
+ Add a  `componentDidMount` lifecycle method that calls the `requestAllPokemon`
action from its props.
  + If you have not already, create the corresponding request action in your
  actions file.
+ Before we move on, import the container component into your entry file and nest
a `<PokemonIndexContainer />` within your `<Root />` component.

### Middleware

The answer to our problem of components not directly communicating with our
server is to have them dispatch an action that is intercepted by a middleware.
The middleware will then perform the AJAX request and decide whether to pass the
action along to the reducer.

+ Create a `pokemon_middleware.js` file that imports the necessary actions
(`receiveAllPokemon`, as well as the `REQUEST_ALL_POKEMON` constant) and api
util functions (`fetchAllPokemon`).
+ Go ahead and remove those imports from your entry file that we used for
testing.   
+ Write a `PokemonMiddleware` function that makes the API call to fetch Pokemon
when an action of type `"REQUEST_ALL_POKEMON"` is dispatched.   

Remember that the middleware will resemble the reducer in that it will be a
switch statement that intercepts actions based on their type. The parameters of
the middleware are written in a way that allows it to receive and pass along the
actions using `next`. Make sure to call `next(action)` as the default of the
switch statement to make sure actions uncaught by the middleware still make it
to the reducer. We can pass the middleware the dispatch action as well in order
to wrap our success callback actions.

```javascript
export default ({ dispatch }) => next => action => {
  // middleware switch statement and necessary variables
};
```

In order to properly configure the new middleware with the store we will have to
add the remaining parameters to our `createStore` call in the `configureStore`
function. Import and pass the applied middleware using the `applyMiddleware`
function from `redux`.

Your `configureStore` method should now look like the following:

```js
const configureStore = () => (
  createStore(
    PokemonReducer,
    applyMiddleware(PokemonMiddleware)
  )
);
```

The following code is an example of what your `PokemonIndex` component might contain in its `render` method.

```html
<section className="pokedex">
  <ul>
    	{pokemon.map(poke => (
        <li key={poke.id}>{poke.name}</li>
      ))}
  </ul>
</section>
```

### Provider

We could continue to pass the store down as props to whatever components need to
subscribe to it, but that wouldn't be very DRY. This is where another function
from the `react-redux` library comes in: The Provider.

Refactor your root component out into it's own file and `import { Provider }
from 'react-redux';`

Wrap your `<PokemonIndexContainer>` in a `<Provider>` component that receives
the store as a prop. Export this back to your entry file and **test this
change** by making sure everything is still rendering correctly.

```js
const Root = ({ store }) => {
	return (
		<Provider store={store}>
			<PokemonIndexContainer />
		</Provider>
	);
};
```

**Test that your `PokemonIndex` component renders the pokemon from the database**

## Phase 3: React Router

Now let's say we want the ability to click on any of these Pokemon and see more
details about them. In order to maintain a common user interface used around the
web, we will have the URL define what components the user sees. This is exactly
what the powerful React Router library is for. To use it, `import { Router,
Route, hashHistory } from 'react-router';` at the top of our `root.jsx` file.
We will handle all routing decisions within our root component.  

Within our provider, we will nest everything within `<Router>` tags.  We need to
pass the router `hashHistory` as its `history` parameter, which tells the router
what type of history we will be using to keep track of our locations and
pathnames. Another option is `browserHistory`, but it requires extra backend
configuration so we will prefer `hashHistory` in this course.  

Your code should resemble the following:

```html
  <Provider store={store}>
    <Router history={hashHistory}>
      // routes will go here
    </Router>
  </Provider>
```

Next, instead of rendering the `PokemonIndexContainer` directly, setup a route
that will render the component when `path="/"`. This will assure that the
Pokemon index is rendered no matter what our pathname is.

The React Router allows us to do some refactoring of our `PokemonIndex`
component with the use of the [onEnter][on-enter] function.  This function is
called when the route is entered, so instead of dispatching the
`requestAllPokemon` action in the `PokemonIndex` component we can call it on
entrance of the `/` route. Write this function.

As a quick reminder, React Router's route syntax is as follows:

```js
<Route path='PATH' component='COMPONENT' onEnter='ON_ENTER_CALLBACK'></Route>
```

Now you can refactor the `PokemonIndex` to be a stateless functional component
that does not need to call any React lifecycle methods. We also do not need to
`mapDispatchToProps` anymore which simplifies our `PokemonIndexContainer`.

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
<li className="pokemon-index-item" onClick={}>    
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
its information. Eventually, we will want the `PokemonDetail` to display a Pokemon's information as well as its `Toys`. Talk over the following questions with your partner:

1. Where will the `PokemonDetail` get it's information from?
2. How will we pass this information to `PokemonDetail`?

Implement the `PokemonDetail` component just like we did the `PokemonIndex`:

1. Create an API function that fetches a single Pokemon.
2. Create actions for both requesting and receiving a single Pokemon.
3. Update the reducer to respond to the receiving of a Pokemon.
4. Update the middleware to respond to the requesting of a Pokemon.
5. Create a `PokemonDetailContainer` that maps `PokemonDetail` to props.

Review the `_pokemon.json.jbuilder` file and talk with your partner about how
you believe the `PokemonDetail` object will look before we map it to props.
**Confirm your answer by navigating to the URL in your browser.** (The URL will be similar to `http://localhost:3000/api/pokemon/63`)

You will notice that the toys data are not well formatted for turning into
`ToyItem` components.  But this nesting will be helpful later on when we render
a `ToyDetail` component, so we will opt to use a selector rather than edit the
jBuilder template.  The selector will take state as a parameter and serve as a
utility function to return an array of toy objects that we can easily map over.
Create a `selectors.js` file in the `reducers` folder.  Provide this piece of
state to the props of your `PokemonDetail` component using your imported
selector.

6. Create a `PokemonDetail` component.

Just like the `PokemonIndex`, use an `onEnter` hook in the Route to invoke the
`RequestSinglePokemon` action. But this time we will need to pass an ID to the
action. Refer to the [`onEnter` documentation][on-enter] to figure out how we
get this information.

We recommend you follow the below structure for `PokemonDetail`:
```html
<section className="pokemon-detail">
  <ul>
    <img src={} alt=""/>
      <li><h2>{}</h2></li>
      <li>Type: {}</li>
      <li>Attack: {}</li>
      <li>Defense: {}</li>
      <li>Moves: &#34;{}&#34;</li>
    <section className="toys">
        <h3>Toys</h3>
      <ul className="toy-list">
        {}
      </ul>
    </section>
  </ul>
</section>
```

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

## Phase 5: Toy Detail

Implement the ability to click on a Toy and be taken to a path such as
`/pokemon/1/toys/1` where a `ToyDetail` component displays information about a
Toy below the `PokemonDetail` component. This should be completed without any
additional changes to the application state.

You will need to:
1. Create a `ToyDetailContainer` that provides the toy's information as props
2. Create a `ToyDetail` component that displays its props
3. Create a nested route that renders the `ToyDetailContainer` when the path matches `/pokemon/:pokemonId/toys/:toyId`

When providing the toy to the `ToyDetail` component from the
`ToyDetailContainer`, remember that `mapStateToProps` accepts a second parameter
`ownProps`. Use this to key into the correct toy.

**Hint:** A component rendered by a route receives `params` as a prop, which includes information about the route.

**Test your code** by clicking on a Pokemon's toy and making sure that a `ToyDetail` component is rendered with the correct information.

## Phase 6: Creating Pokemon

Our next feature will be to allow the creation of new Pokemon. To allow users to create Pokemon, you will need to:

1. Create an API function that sends a single Pokemon's information as part of a `POST` request to the backend
2. Create actions for both creating and receiving a new Pokemon
3. Update the reducer to respond to receiving a new Pokemon (**Hint:** This should merge multiple pieces of state)
4. Update the middleware to respond to a `CREATE_POKEMON` action
5. Create a `PokemonFormContainer` that only connects `mapDispatchToProps`
6. Create a `PokemonForm` controlled component

A controlled component is one which overrides the default functionality of the
browser, allowing your code to entirely control your application. This is most
commonly used in forms to ensure that input field values are being tracked in
internal state and that submit buttons perform actions as described by the
application.

Use the `constructor()` method to provide a default internal state to your form.
Even though Javascript prefers camelCase, it is often easiest to define data in
the format our server expects when making a "POST" request.  In Ruby, this means
snake_case.

Normally these constructor functions are taken care of by React. This is how
React creates parent/child relationships between components and why we never
need to bind child methods. In this case, we are overriding the constructor
function to have a default internal state, so it is our responsibility to make
sure all functions are properly bound.

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
appears to the user as a dropdown. In order to get all of the Pokemon types, we
have provided a script tag in the `application.html.erb` file which stores an
array of types on the window. To maintain the Redux pattern, pass it into your
`configureStore` invocation as preloaded state. Then map it to your
`PokemonForm` as props.

Your `configureStore` method, with `preloadedState` added, will now look like
the following:

```js
const configureStore = (preloadedState = {}) => (
  createStore(
    PokemonReducer,
    preloadedState,
    applyMiddleware(PokemonMiddleware)
  )
);
```

You will pass `preloadedState` in to `configureStore` like so (inside your entry
file):

```js
const store = configureStore(window.pokemonTypes);
```

Sample `PokemonForm` jsx structure:
```html
      <section className="pokemon-detail">
        <img src="/assets/pokemon-logo.png"/>
        <ul>
          {// map list elements for errors with class "error"}
        </ul>
        <form className="pokemon-form" onSubmit={this.handleSubmit}>
            {// input elements for all but Pokemon types}
            {// use select and option elements for Pokemon types }
          <button>Create Pokemon</button>
        </form>
      </section>
```

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
API. You may need to add a conditional to your update function as well.

**Next steps:** The final tricky parts of the Pokemon form are the redirect callback and error
handling.

### Redirecting

Once the posting is complete we want the application to redirect to the newly
created Pokemon. We need to wait because we need this Pokemon's ID in order to
push to that URL. Unfortunately this is one of the downfalls to implementing the
react router separate from Redux. We do not have the router as a part of our
application state, so instead we suggest using the slightly older way of
implementing navigation: `import {hashHistory} from 'react-router';`

This imports a reference to the `hashHistory` object that we can push directly
to. Call `hashHistory.push` with the correct url inside of your `postPokemon`
success callback.

**Challenge: There is an additional request being made to the server. Plan out
with your partner how to fix this and improve your application.**

### Error Handling

The server is great at telling us whether or not our new Pokemon is being
inserted into the database correctly, but so far we have no way of letting our
users know what happened. We need a way of displaying errors on the front-end
after an unsuccessful post request.

1. Add a failure callback to the `createPokemon` function.
2. Add a `pokemonError` action
3. Update the middleware and reducer to use this new action type
4. Add a `mapStateToProps` function that connects to the `PokemonFormContainer`
5. Add an errors function to the `pokemonForm` that returns an unordered list of error messages.

## Bonus

### Loading Spinner

Use `next(action)` in your `PokemonMiddleware` to always ensure the passing of
your actions to the reducer. This way you can reduce actions such as
`RequestPokemon` in order to describe an intermediary state of your application.
Set this state back to normal when reducing `ReceivePokemon` actions.

### Update Toys

Add the ability to reassign toys to different Pokemon.
