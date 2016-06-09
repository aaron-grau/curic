# Pokedex: An Introduction to the React Router

Live version available [here](http://aa-pokedex.herokuapp.com/)!

**Gotta Fetch 'em All**

In this project, we'll write an app to manage your `Pokemon` and their
`Toy`s. Check out the live version [here](http://aa-pokedex.herokuapp.com)!

We've already setup migrations/models/controllers/views for you to
start with in a skeleton that we will email to you at the beginning of
the day.  **Set things up with a `bundle install`, then `rake db:setup` (this is equivalent to `rake db:create db:migrate db:seed`)**.

Take a look at the schema, the routes file, and the jbuilder views to get yourself oriented. Navigate to the api routes to see the json that's sent up.

**Note the `defaults: {format: :json}`**. This means that HTTP
requests that Rails handles for the `pokemon` resource should be
assumed to be asking for a JSON response instead of HTML. When we
render a template, instead of looking for `template.html.erb`, Rails
will look for `template.json.jbuilder`.

**Also**: the root url `localhost:3000` will be the home of
our JS application. We have provided this controller and view
for you.

## Phase 1: NPM and Webpack

### `Node Package Manager`

As before, you will need to set up a `package.json` and `webpack.config.js` file
to configure your application to use NPM and Webpack. First, run `npm init -f`
to initialize `package.json` to the default settings. Normally you could now
proceed to run `npm install --save 'package-name'` to install the dependencies
of your project. In this case however, we want to use specific versions of each
package to ensure that none of the syntax has changed since these instructions
were written. To that end, add (or replace if it already exists) a
"dependencies" key in the `package.json` file with these contents:

```json
"dependencies": {
  "babel-core": "^6.1.4",
  "babel-loader": "^6.1.0",
  "babel-preset-es2015": "^6.6.0",
  "babel-preset-react": "^6.1.4",
  "flux": "^2.1.1",
  "react": "^0.14.2",
  "react-dom": "^0.14.2",
  "react-router": "^2.0.0",
  "webpack": "^1.12.4"
}
```

Now run `npm install` to generate your `node_modules` folder!

### `Webpack`

Next we need to configure Webpack to compile our `bundle.js` file. Create a new
file called `webpack.config.js` in the root of your project and add the
following content:

```js
var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./frontend/pokedex.jsx",
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js"
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
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
        loader: "node-loader"
      }
    ]
  }
};
```

Now that Webpack knows to create `bundle.js`, we need to require it in our
`application.js`:

```js
//= require bundle
```

Notice that the `entry` key in `webpack.config.js` expects a file called
`./frontend/pokedex.jsx` to exist. Make the `frontend` folder in the root of
your project and add a file called `pokedex.jsx`. This is going to be the
starting point for the rest of your app. Make sure to require both the `'react'`
and `'react-dom'` packages, and then add an event listener for the
`DOMContentLoaded` event. This event will be fired once the static root page is
fully loaded. In the callback to this listener, try rendering a simple React
element to test out everything you've written so far. Don't forget to run
`webpack --watch` to generate your `app/assets/javascripts/bundle.js`!

Next, add more structure to your `frontend` directory. You should have actions,
components, constants, dispatcher, stores, and util folders.

Finally, create the `frontend/dispatcher/dispatcher.js` file. This should export
one **instance** of the `Dispatcher` object from the `'flux'` library.

## Phase 2: Pokemon Index

### `ApiUtil`

We'd like to render a list of pokemon. Let's start by setting up a way to fetch
them from the back end. Make an `api_util.js` file inside your util folder.
Inside this file, we'll make ajax requests that fetch information served by our
rails controllers, and on success call an action creator.

Set the export of the file to be an object with a key fetchAllPokemons
pointing to a function that takes in a callback as an argument. The function should make an ajax request with url
`api/pokemon`. The success callback of the request will be passed the fetched
pokemons. For now, print the pokemons to the console and test that everything is
working.

**Hint:** You will need to temporarily require `'api_util.js'` in the starting
point of your app to call the `fetchAllPokemons` function

Once you can print the pokemons, have your `fetchAllPokemons` take in a callback function as an argument and trigger this callback with the received pokemons on success. Ultimately, we will be passing in `PokemonActions.receiveAllPokemons`, which we have yet to write. `receiveAllPokemons` will dispatch actions to our stores.

### `PokemonActions` and `PokemonConstants`

Now let's write that action dispatcher. Create a file `pokemon_actions.js`
in the actions folder. This will need to make use of the dispatcher we created
in Phase I. Once again, export an object from this file.

Within the object, create a `receiveAllPokemons` function that takes in a collection of pokemons. It will need to call
`Dispatcher.dispatch` and pass it an object with a property `actionType` whose
value is `PokemonConstants.POKEMONS_RECEIVED`, and
a property `pokemons` that passes along the pokemons.

In the constants folder, create a `pokemon_constants.js` file that exports an
object with a key `POKEMONS_RECEIVED` pointing to the string
"POKEMONS_RECEIVED".

In the same file, write a `fetchAllPokemons` function. This is the function that will call `ApiUtil.fetchAllPokemons`, passing in `receiveAllPokemons` as a callback.

Let's recap the cycle so far for context. Somewhere on our front end, we will call `PokemonActions.fetchAllPokemons`. This will make a call to `ApiUtil.fetchAllPokemons` which will make an ajax request to our back end. We pass in `PokemonActions.receiveAllPokemons` and trigger it when the ajax request comes back successfully. When `PokemonActions.receiveAllPokemons` is triggered, it will dispatch an action with the `actionType` `PokemonConstants.POKEMONS_RECEIVED` and and a collection of pokemons. Somewhere in the future, a store will be patiently listening.

### `PokemonStore`

We need a way to keep track of the pokemons on the front end. In
`stores/pokemon.js`, export an object that will represent our pokemon
store. We will need to make use of the `Store` object from the
`'flux/utils'` npm package. The file should have a local variable
`_pokemons` to store all our pokemon objects. Initialize this to a
_POJO_, not an _array_.

Later we're going to request individual pokemon from the store, which
would be an `O(n)` operation if we used an array. Using a POJO makes
this an `O(1)` operation... but it also makes our job a little more
complicated because we're getting the pokemon objects back from the
server in an array, and we also need to convert them back into an array
for `all()`.

Write a `resetPokemons(pokemons)` function that will receive a new array
of `pokemons` from the server. We'll need to iterate through that array
and store each pokemon in `_pokemons` by it's `id`. That's simple
enough, but there's a catch: what if a pokemon has been deleted? We'll
need to reset `_pokemons` first so that no old keys will leak into our
new data set.

We want to call `resetPokemons` when `PokemonConstants.POKEMONS_RECEIVED` is
dispatched. Make it so.

Now for `all()`: Basically what we want here is the equivalent of Ruby's
`Hash#values`. Unfortunately, that isn't fully available in JavaScript
yet, so we'll need to iterate through each key in `_pokemons` and put
its corresponding value into the result array. **NB**: JavaScript has
two ways to iterate through keys, but one of them will also give you
keys defined in the object's prototype. Depending on which you chose,
you may need to use `#hasOwnProperty` to ensure you're not getting extra
keys.

Check that calling `PokemonActions.fetchAllPokemons` and `PokemonStore.all` in
the browser works as expected.

### React Components

#### Component Hierarchy

![pokedex_structure](../../assets/pokedex_structure.png)

#### PokemonsIndex

Make a react component in `frontend/components/pokemons/pokemons_index.jsx` to
display the pokemons we've fetched. The state of
`PokemonsIndex` should keep track of all the `pokemons` in the store. `getInitialState`
will start us out right, but we also need to set the state whenever the store changes.

To do the latter we need to add a change listener to our store. Since the object
exported by `stores/pokemon.js` is an instance of the `Store` object from the
'flux/utils' library, it will respond to the `#addListener` method.

`PokemonStore` should invoke the `__emitChange` function when it registers
a `PokemonConstants.POKEMON_RECEIVED` dispatcher action. To accomplish that, we will need to
overwrite the default `__onDispatch` function on the PokemonStore.

Next, let's register an event listener in the pokemon index component using `PokemonStore.addListener`. Write an
`_onChange` function on `PokemonsIndex` that sets the state, and in the `componentDidMount`
function add `_onChange` to the callbacks for the store's listener. Make sure
to remove it in `componentWillUnmount`.

We're almost done. The only thing left is to fetch the pokemons when the component
mounts. On success, that fetch will call `PokemonActions.receiveAllPokemons`, where the response will be communicated by the dispatcher. That action will cause the store to reset its pokemon and emit an
event. The event will trigger the store's listener, which will reset the
state of our pokemon index.

For now, to test that the `PokemonsIndex` component is working, just have `render` return a
div containing `this.state.pokemons.length` to make sure the component has access to all the pokemon when it renders. In `pokedex.jsx` on document ready, render a
`PokemonsIndex` component into the DOM element with id `root` that we've provided.
It will overlap the background for now, but you should be able to see the info.

Now that that's working, let's change `PokemonsIndex.render` to render an unordered
list of `PokemonIndexItem` components instead of just `this.state.pokemons.length`. Each index item should be passed a `pokemon` prop,
and a unique key.

#### PokemonIndexItem

Create this class in a different file. It just needs a render method for now. Give
the pokemon list items a class name of "poke-list-item" so the css file we've
provided can do its magic. Each list item should show its name and poke type.

Make sure this works. The list is still overlapping the background. We're about
to fix that.

## Phase 3: Router

We would like to be able to render different elements depending on our url.
Eventually we want to be able to click on an item in our pokemon index and see
a detailed view of that pokemon. We'll use the **react router** to render a root
component that will in turn render our index and detail components. Then, by
navigating to different urls, we'll be able to change which pokemon detail is
displayed.

### Getting the React Router

We'll start by refactoring the logic we already have. In `pokedex.jsx`, we will
need to use the 'react-router' library to access the Router and Route
components:

```js

import { Router, Route } from 'react-router'
```

Instead of rendering a `PokemonIndex`, render the `Router`. It should have a single
route with path "/" that will render an `App` component.

Now we have to write the `App` component. This should render a div with an id of
`pokedex`. This div will eventually contain our entire pokedex, but for now it
will just contain a nested div inside it with a class of `pokemon-index-pane`.
For now the `pokemon-index-pane` div should just contain a `PokemonsIndex`
component.

**NB:** Make sure you specify the correct id and class for the divs so the
stylesheet we included in the skeleton will apply correctly.

## Phase 4: Pokemon Detail

We will soon write a `PokemonDetail` component to display more info about individual
pokemons. First we need to add a new `Route`.
It should be nested under the existing route, and have path "pokemon/:pokemonId".
This `Route`'s component should be the `PokemonDetail` component. Change `App` to render all of the child components given to it from the Router by using `this.props.children` inside `render`. Make sure do this outside of the
`.pokemon-index-pane` div, but inside the `#pokedex` div so that the pokemon
detail will be inside the pokedex, but not inside the pokemon detail pane.

Now that the route is set up we can work on the component itself.
We know that `PokemonDetail` needs to have pokemon info, but right now it only has `this.props.params.pokemonId`.
Write a `getStateFromStore` function on the component that returns an object with a
pokemon property. You'll need to write a `find` function on the pokemon store to return a pokemon
given an id. `find` should take an integer argument. In `PokemonDetail`, `this.props.params.pokemonId`
is stored as a string. Deal with this discrepency using `parseInt`. Set the initial state of the component to `this.getStateFromStore()`.

The render function should return a div with another div inside it with a class
of `pokemon-detail-pane`. Inside the `div.pokemon-detail-pane` make another div
with a class of `detail`. This might seem like a lot of nested div for no
reason, but we are going to fill in other sections as we move along.

Inside of `div.detail` show the properties of the pokemon and the pokemon's
image. Make sure to use the `image_url` property to display an image of the pokemon.

There will be no pokemon when there is no `pokemonId` - that is, before the fetch of pokemons comes back - so first check if `this.state.pokemon`
is defined and return an empty div if it isn't.

## Phase 5: OnClick

We want to be able to click on a pokemon index item and navigate to that pokemon's
url. `PokemonIndexItem` will need an `onClick` property of its rendered `li` to
call a `showDetail` function. In order to navigate to a different url in this
function, we will need to add the [HashHistory] (https://github.com/reactjs/react-router/blob/master/docs/guides/Histories.md#hashhistory) component from the 'react-router' library to our `pokedex.jsx` file:

```js
const HashHistory = require('react-router').hashHistory;
```
To use this HashHistory, we must set `history={HashHistory}` in the router element.  We can then navigate to a desired route within any component by requiring HashHistory, which is a singleton, and using `HashHistory.push`.

You should now be able to click on different pokemon and see the url change.
The pokemon detail, however, is still blank. That's because the
component doesn't update when its `this.props.params` change... unless we tell it
to. Add a `componentWillReceiveProps` function to the detail. This is passed
the new props. In it, call a `PokemonActions` function that makes an `ApiUtil` call (neither of which we have written yet) to
fetch the appropriate pokemon.
Using the flux pattern, we're going to set it up so that the fetch will cause the
component's state to change. Fetching a pokemon individually from the back end when
we navigate to its url will also allow us to get its toys, which we don't have access
to when we fetch all the pokemons together.

Write `fetchPokemon` to fetch a a single pokemon. This method should call a corresponding method in `ApiUtil` which uses an ajax request to fetch the pokemon from the backend. On success, it should trigger a passed-in success callback. What will the success callback be? Another action in `PokemonActions` that we will pass in when we call the ApiUtil function - `receiveSinglePokemon`. This method will dispatch an action that triggers the store to reset the information of a single pokemon. You might want to write a function in the file with the store to do this. After the single pokemon has been updated, the store should emit a change event. In `PokemonDetail`, register a listener that resets state.

Now, if we fetch a single pokemon when the detail mounts and when its props change, the pokemon in state
should be updated appropriately. Make sure you can explain to your partner how this
works.

You should now be able to refresh the page and still see a pokemon detail view.

## Phase 6: Toys

The pokemon detail should render a `ToysIndex` component. A toys index will have
toys passed in as a property it and should render a `ToyIndexItem` for each toy.
The index's toys will be undefined before an individual pokemon is fetched, so
account for that in render.

Index items should have a toy as a property, and render a "li.toy-list-item"
with its name, happiness, and price.

When we click on a toy index item, we'd like to see its detail. Give the index
item class an onClick that navigates to a "/pokemon/:pokemonId/toys/:toyId" url.

Create a new `Route` nested under the one that renders the `PokemonDetail`. This
route should render a `ToyDetail` component that we will create soon. The path of
this component should be "toys/:toyId".

Since our `ToyDetail` component will be a child component of the `PokemonDetail`
component based on our routes, we have to make sure that our `PokemonDetail`
component will render it.

Go back to `PokemonDetail`'s render function and add `this.props.children` outside of
`div.pokemon-detail-pane`, but inside the top level div in your render function.

The child will contain a whole new pane and we don't want to nest it inside
`pokemon-detail-pane`.


Write the following functions for the toy detail:
  * `getStateFromStore`
    - When might you not have access to a pokemon, and its toys? What simple
      checks can you do to not cause errors in those situations?
  * `_onChange`
  * `getInitialState`
  * `componentDidMount`
    - We already have a way to register a listener for a fetch of a pokemon
    - Since we're always rendering a pokemon detail whenever we render a toy
      detail, we don't need to fetch a pokemon here
  * `componentWillUnmount`
  * `componentWillReceiveProps`
  * `render`

## Phase 7: PokemonForm

We'd like to be able to create new pokemon. Let's make a `PokemonForm` component.
This will be rendered above the pokemon index, but inside of the
`pokemon-index-pane` so make sure you put it inside of `div.pokemon-index-pane`.

`PokemonForm` should render a form with a class name "new-pokemon".

We want the form to have controlled inputs. This means that their value mirrors the state of the component. Set the value of each input the corresponding property in the component's state using `value={this.state.x}` and write an `onChange` handler for each field which sets the state to `e.target.value`. Use a `select` input for the poke-type – if you look in your
`application.html.erb` layout file, you'll see that we're defining the possible
Poke Types on `window` when the page loads.  Set the class name to "type-selector".

Write an `onSubmit` that calls a function `PokemonActions.createPokemon`. It would be
nice to be able to navigate to the newly created pokemon's url after creation.
However, we don't have its id until it's saved to the database. To navigate once
we have the id, let `createPokemon` take a callback.

The index should update immediately when we create a new pokemon. You'll need to add a listener to the index to do this.

## Bonus: Reassigning Toys

Add a `select` to the toy detail that has an option for each pokemon. Choosing a
different pokemon should change the ownership of the toy.
