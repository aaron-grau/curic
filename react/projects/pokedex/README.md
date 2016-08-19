# Pokedex: An Introduction to the React Router

[**Live Demo!**](http://aa-pokedex.herokuapp.com/)

In this project, we'll write an app to manage your `Pokemon` and their `Toys`.

We've already setup a Rails backend with migrations/models/controllers/views for you to start with in the skeleton.  **Set things
up with a `bundle install`, then `rake db:setup` (short for `rake
db:create db:migrate db:seed`).

Take a look at the schema, the routes file, and the jbuilder views to get
yourself oriented.

**Note the `defaults: {format: :json}`**. meaning HTTP requests that
Rails handles for the `pokemon` resource should be assumed to be asking for a
JSON response instead of HTML. When we render a template, instead of looking for `template.html.erb`, Rails will look for `template.json.jbuilder`.

## Phase 1: NPM and Webpack

### `Node Package Manager`

As before, you will need to set up a `package.json` and `webpack.config.js` file to configure your application to use NPM and Webpack. First, run `npm init -f` to initialize `package.json` to the default settings. Normally you could now proceed to run `npm install --save 'package-name'` to install the dependencies of your project. In this case however, we want to use specific versions of each package to ensure that none of the syntax has changed since these instructions were written. To that end, add (or replace if it already exists) a "dependencies" key in the `package.json` file with these contents:

```json
  "dependencies": {
    "babel-loader": "^6.2.4",
    "babel-core": "^6.13.2",
    "babel-preset-es2015": "^6.13.2",
    "babel-preset-react": "^6.11.1",
    "react-redux": "^4.4.5",
    "react": "^15.3.0",
    "react-dom": "^15.3.0",
    "react-router": "^2.6.1",
    "redux": "^3.5.2",
    "webpack": "^1.13.1"
  }
```

Run `npm install` to generate your `node_modules` folder.

### `Webpack`

Next we need to configure Webpack to compile our `bundle.js` file. Create a new
file called `webpack.config.js` in the root of your project and add the
following content:

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

Now that Webpack knows to create `bundle.js`, we need to require it in our
`application.js`:

```js
//= require jquery_ujs
//= require bundle
```

Notice that the `entry` key in `webpack.config.js` expects a file called
`./frontend/pokedex.jsx` to exist. Make the `frontend` folder in the root of
your project and add a file called `pokedex.jsx`. This is going to be the
starting point for the rest of your app. Make sure to import both the `'react'`
and `'react-dom'` packages, and then add an event listener for the
`DOMContentLoaded` event. This event will be fired once the static root page is
fully loaded. In the callback to this listener, try rendering a simple stateless functional React component to test out everything you've written so far. Don't forget to run `webpack --watch` to generate your `app/assets/javascripts/bundle.js`.

Next, add more structure to your `frontend` directory. You should have folders for actions, components, reducers, store, middleware and util.

## Phase 2: The Pokemon Index

### From API to Action Creator

We'd like to render a list of pokemon. Let's start by setting up a way to fetch
them from the back end. Make an `api_util.js` file inside your util folder.
Inside this file, we'll make ajax requests that fetch information served by our
rails controllers, and on success dispatch an action creator.

Export a function called `fetchAllPokemon` that takes in a success callback as an argument. The function should make the correct AJAX request to serve up the `index.json.jbuilder` for pokemon. 

Export another function called `receiveAllPokemon` to be passed as our success callback. Remember that this function will be passed implicitly passed the returned data from our AJAX request. For testing purposes just `console.log(data)` and import both of these functions in your entry file.

**Hint:** `import * as API from ./util/api_util.js` is a nice way to just import all of the api util functions as methods of an API object.

Now let's refactor this success function out to where it belongs as an action creator. Export a function called `receiveAllPokemon` from a `pokemon_actions.js` file that returns a pure object. This object should have a key for the action type that refers to a `RECEIVE_ALL_POKEMON` constant and the key for the pokemon data. Make sure to export the constant as well for future use by the reducer. 

**Import the action in your entry file and test everything still works. Our action creator just returns an object so to log it for testing we could wrap it in a function:**

```javascript
API.fetchAllPokemon((pokemon) => console.log(ACTIONS.receiveAllPokemon(pokemon)));
```

### The Reducer

Remember that the reducer is only concerned with describing how state changes as a result of a dispatched action. In our case this will be the `receiveAllPokemon` action. Create a `pokemon_reducer.js` file that exports a function implementing a switch statement to catch the action.type. Refer to these action types by importing the constants exported by the action creators file.

The reducer function should take two parameters: the oldState defaulting to an empty object and the action being dispatched. Assure that the default case for the reducer switch statement is to return the oldState.

**Before we can test the reducer we will need a store to dispatch from**

### Store

The store contains a refence to this single complete state tree for use by our container components. This is made trivial by importing `{ createStore } from 'redux'`.

The createStore function takes the reducer, any preloadedState and any enhancers such as middleware. For now just pass it the imported `pokemon_reducer` and we will come back to the other arguments later.

Wrap the creating of the store in a `configureStore` function. This is a great pattern to get used to, instead of just exporting the store we are exporting a function that creates the store. This can be used in the future to swap out reducers, preloadedState or enhancers depending on certain conditions.

Head back to the `pokedex.jsx` entry file, import your configureStore function and call it inside the DOM listener. Now replace the logging of your `receiveAllPokemon` success callback with a dispatching using the store.

Test that this dispatches the action to our reducer and updates the state by placing the store on the window at the end of the listener and calling `getState()` in your console.

Pass this to your root component as a prop and then inside the root component modify your function to receive a parameter `({store})`. 

If we try to read the state of our store, what is going to happen? Talk this over with your partner before moving on.

### Connect

In order to have our component render after the state is updated we have to subscribe our component to our state. This is made much easier with the `react-redux` bindings.

Remember that there are two types of components in the modern discussion of React/Redux: presentational components and container components. Our container components are concerned with subscribing to the store, reading from state and passing down necessary props to our presentational components. Our presentational components will only be concerned with rendering JSX and providing some user interface functionality like clicking.

Create a `pokemon_index_container` in a pokemon subfolder of your components folder. Import this in your entry file and add a `<PokemonIndexContainer/>` to your root component.

`import { connect } from 'react-redux';`

The connect function takes two main arguments: `mapStateToProps` and `mapDispatchToProps`. Mapping state to props will subscribe the component to the Redux store updates. Anytime the store changes, mapStateToProps will be called and return a plain object that is merged into the component’s props. 

```javascript
const mapStateToProps = (state) => ({
  // piece of state to subscribe to
});
```

Mapping dispatch to props is used mainly just to keep our presentational components from having to worry about dispatching actions. This function expects to be passed action creators that it then wraps in the dispatch function and merges each into the component's props for direct invocation.

This introduces a problem. According to our react/redux pattern, components are only supposed to manipulate state through the dispatching of actions. They should not be making AJAX requests to our server. We need a way to dispatch a request action that will then perform the AJAX fetch.

Talk over a plan to solve this problem with your partner before writing your `mapDispatchToProps` function.

```javascript
const mapDispatchToProps = dispatch => ({
  // request action
});
```

After writing your mapping functions, pass them to the connect function and then invoke the connect function again by passing it a presentational component.

Write a basic presentational react component that renders an unordered list of pokemon names next to images. Write a `componentDidMount` lifecycle method that calls the `requestAllPokemon` action from its props. Create the corresponding request action in your actions file and then let's fill in the final piece before we have a complete asynchronous redux pattern.

### Middleware

The answer to our problem of components not directly communicating with our server is to have them dispatch an action that is intercepted by a middleware. The middleware will then perform the AJAX request and decide whether to pass the action along to the reducer.

Create a `pokemon_middleware.js` file that imports the necessary actions and api util functions. Go ahead and remove those imports from your entry file that we used for testing.

Remember that the middleware will resemble the reducer in that it will be a switch statement that intercepts actions based on their type. The parameters of the middleware are written in a way that allows it to receive and pass along the actions using `next`. Make sure to call `next(action)` as the default of the switch statement to make sure actions uncaught by the middleware still make it to the reducer. We can pass the middleware the dispatch action as well in order to wrap our success callback actions.

```javascript
export default ({dispatch}) => next => action => {
  // middlware switch statement and necessary variables
});
```

In order to properly configure the new middleware with the store we will have to add the remaining paramaters to our CreateStore call in the configureStore function. Import and pass the applied middleware using the `applyMiddleware` function from `redux`. 

**Test that your PokemonIndex component now renders some pokemon**

```html
<section className="pokedex">
  <ul>
    {// mapping of pokemon list elements}
  </ul>
</section>
```

### Provider

We could continue to pass the store down as props to whatever components need to subscribe to it, but that wouldn't be very DRY. This is where another function from the `react-redux` library comes in: The Provider.

Refactor your root component out into it's own file and `import { Provider } from 'react-redux';`

Wrap your `<PokemonIndexContainer>` in a `<Provider></Provider>` component that receives the store as a prop. Export this back to your entry file and make sure everything is still rendering correctly.

## The Router

Now let's say we want the ability to click on any of these pokemon and see more details about them. In order to maintain a common user interface used around the web, we will have the URL define what components the user sees render. This is exactly what the powerful React Router library is for.

First `import {Router, Route, hashHistory} from 'react-router';`

Now wrap everything within our provider in a `<Router>` and pass this component `hashHistory` as a prop with the key of history. This tells the router what type of history we will be using to keep track of our locations and pathnames. Another common input for this prop is `browserHistory` but in order for browser history to work we would have to do extra configuration in Rails.

Next instead of rendering the `<PokemonIndexContainer>` directly setup a route that will render the component when `path="/"`. This will assure that the pokemon index is rendered no matter what our pathname is.

The React Router allows us to do some refactoring of our `PokemonIndex` component before moving on to the `PokemonIndexItem` with the use of the [onEnter](https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback) function.

This function is called when the route is entered so instead of dispatching the `requestAllPokemon` action in the `PokemonIndex` component we can call it on entrance of the `/` route. Write a function to pass to the `onEnter` of your route inside the root component so that you have access to the store.

Now you can refactor the `PokemonIndex` to be a stateless functional component that does not need to call any React lifecycle methods. We also do not need to
`mapDispatchToProps` anymore which simplifies our `PokemonIndexContainer`. 

**Make sure all pokemon still render before moving on**

### Pokemon Index Item

Let's refactor each of our pokemon into their own pokemon index item components. This is a great pattern for keeping our components minimal. Now the list will only care about rendering all of the list items and the items will care about the functionality of showing their details.

Because these components will receive all information through props and not need a lifecycle methods they will work perfetly as stateless functional components. Refactor the mapping of of each `<pokemonIndexItem>` and make sure the list still renders before adding the click functionality.

React Router is constantly updating the way that we pass a reference to the router in each component. The latest and cleanest way is to wrap the component in what is referred to as an HOC (Higher Order Component). These components much like our containers serve only to pass down information through props. To implement this we `import { withRouter } from 'react-router';` and then call this function on our component when we export it: `export default withRouter(PokemonIndexItem);` Make sure to add `router` to the props that this component expects to receive.

Now the component has a reference to the router and all of it's information/functions. One such function will be our most useful when implementing navigation and that is `router.push(url)`.

Create a `_handleClick` function in the `<PokemonIndexItem>` that receives the router and a url. Pass this function to an onClick prop of our list elements and test to make sure that when clicking a pokemonIndexItem you are taken to a path resembling: `/pokemon/1` where the number represents the pokemon ID.

After clicking the pokemonIndexItem we expect to see a warning error in the console: `[react-router] Location "/pokemon/1" did not match any routes`.

This tells us that the router was looking for a route and corresponding component to render but couldn't find one. Let's make a pokemonDetail component.

PokemonIndexItem Example JSX structure:
```html
<li className="pokemon-index-item" onClick={}>
    <span>{}</span>
    <img src={} alt={}/>
    <span>{}</span>
</li>
```

### Pokemon Detail

Before creating a component we should always plan out where and how it is going to get it's information. Eventually we also want the pokemon detail to display the toys that a pokemon has. Talk over these two questions with your partner and check in with a TA.

1. Where will the PokemonDetail get it's information?
2. How will we pass the PokemonDetail the information?

Implement the pokemonDetail component just like we did the pokemonIndex:

1. create an API function that fetches a single pokemon
2. create both actions for requesting and receiving a single pokemon
3. update the reducer to respond to the receiving of a pokemon
4. update the middleware to respond to the requesting of a pokemon
5. create a pokemonDetailContainer that maps pokemonDetail to props

Review the `_pokemon.json.jbuilder` file and talk with your partner about how you believe the `PokemonDetail` object will look before we map it to props. Confirm your answer by going to the correct URL in the browser.

You will notice that the toys are not the prettiest of data to turn into `ToyItem` components but the nesting will be helpful when rendering the future `ToyDetail` so instead of altering the Jbuilder let's write a selector.

The selector will take state as a parameter and jsut serve as a utility function to return an array of toy objects that we can easily map over. Create this `toy_selector.js` file in the `util` folder.

Map an additional piece of state to the props of your `PokemonDetail` component using your imported selector. 

6. create a `pokemonDetail` component

Just like the `PokemonIndex`, use an `onEnter` hook in the Route to invoke the `RequestSinglePokemon` action. This time we will need to pass an ID to this action so research the `onEnter` docs to figure out how we get this information.

7. complete the corresponding route that renders the `pokemonDetailContainer`

**Make sure to test as you go to avoid bugs. The most common bugs are related to importing/exporting functions.**

Nest the `PokemonDetail` route under the route for the `PokemonIndex` and then **explicitly tell the `PokemonIndex` component to render it's children**. This will assure that both components will be rendered on the page when at the `"/pokemon/1"` path.

Sample jsx structure for a pokemonDetail:
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

### Toy Detail

Implement the ability to click on a Toy and be taken to a path such as `/pokemon/1/toys/1` where a toyDetail component displays information about a Toy below the `PokemonDetail` component. This should be completed without any additional changes to the application state.

When providing the toy to the `ToyDetail` component from the `ToyDetailContainer` remember that `mapStateToProps` accepts a second parameter `ownProps`. Use this to key into the correct toy.

### Creating Pokemon

Our next feature will be to allow the creation of new pokemon. This will require a form that takes in user input and builds up a newPokemon object in internal component state. Upon submitting this form, a POST request should be made, the index should be updated and we should be taken to the pokemonDetail for our new pokemon.

1. create an API function that posts a single pokemon
2. create both actions for creating and receiving a new pokemon
3. update the reducer to respond to receiving a new pokemon 
  **Hint:** This should reassign multiple pieces of state
4. update the middleware to respond to creating a pokemon
5. create a pokemonFormContainer that only connects `mapDispatchToProps` 
6. create a pokemonForm controlled component

A controlled component is used in React to describe the overriding of browser default functionality to be purely in the control of your application. This is used in forms to assure input field values are being tracked in internal state and submit buttons perform actions as described by the application.

Use the `constructor` method to provide a default internal state to your form. Even though javascript prefers camelcase it may be easiest to define this state object as closely to what our server expects when making a POST request.

Normally these constructor functions are taken care of by React. This is how React creates parent/child relationships between components and why we never need to bind child methods. In this case we are overiding the constructor function to have a default internal state so let's make sure we do what React normally does for us as well.

```javascript
  constructor(props) {
    super(props);
    this.state = { 
      // Internal Default State 
    };
    this.exampleMethod = this.exampleMethod.bind(this);
  }
```

For the input elements use an `onChange` listener and write a single `update` function to call the `setState` method.

```html
  <input
    type="text"
    value={this.state.name}
    onChange={this.update('name')}/>
```

The best html element for the Pokemon Type is a dropdown. In order to get all of the Pokemon Types there is a script tag in the `application.html.erb` file that is accessing types from the Pokemon Model. Check it out and to maintain the Redux pattern, pass it into your configureStore invocation as preloaded state. Then map it to your `PokemonForm` as props.

Write a `handleSubmit` method as well that prevents the default event action and instead calls the `createPokemon` function from props. Make sure to pass this function to the `onSubmit` listener of the form.

We want this form to appear when at the same root path as the `PokemonIndex` but not when at any further nested routes like the `PokemonDetail`. This is exactly what the `react-router` `IndexRoute` is for. Import it along with the rest of the React Router tools and pass it the `PokemonFormContainer`.

**NB** There is a couple tricky aspects to getting the form to work properly which will be great debugging practice. Use a `debugger` in your `postPokemon` function to assure that you are always passing the correct parameters to your API. You may need to add a conditional to your update function as well.

The final tricky piece of functionalities with this Pokemon form are the redirect callback and error handling.

Sample Pokemon Form jsx structure:
```html
      <section className="pokemon-detail">
        <img src="/assets/pokemon-logo.png"/>
        <ul>
          {map list elements for errors with class "error"}
        </ul>
        <form className="pokemon-form" onSubmit={this.handleSubmit}>
            {// input elements for all but pokemon types}
            {// use select and option elements for pokemon types }
          <button>Create Pokemon</button>
        </form>
      </section>
```

### Redirecting

Once the posting is complete we want the application to redirect to the newly created pokemon. We need to wait because we need this pokemon's ID in order to push to that URL. Unfortunately this is one of the downfalls to implementing the react router separate from redux. We do not have the router as a part of our application state so instead we suggest using the slightly older way of implementing navigation: `import {hashHistory} from 'react-router';` 

This imports a reference to the `hashHistory` object that we can push directly to. Call `hashHistory.push` with the correct url inside of your `postPokemon` success callback.

**Challenge: There is an additional request being made to the server. Plan out with your partner how to fix this and improve your application.**

### Error Handling

The server is great at telling us whether or not our new pokemon is being inserted into the database correctly, but so far we have no way of letting our users know what happened. We need a way of displaying errors on the front-end after an unsuccessful post request.

1. Add a failure callback to the `createPokemon` function.
2. Add a `pokemonError` action
3. Update the middleware and reducer
4. Add a mapStateToProps function that connects in the `PokemonFormContainer`
5. Add an errors function to the `pokemonForm` that returns an unordered list of error messages.

## Bonus

### Loading Spinner

Use `next(action)` in your Pokemon Middleware to always assure the passing of your actions to the reducer. This way you can reduce actions such as `RequestPokemon` in order to describe an intermediary state of your application. Set this state back to normal when reducing `ReceivePokemon` actions.

### Update Toys

Add the ability to reassign toys to different Pokemon.
