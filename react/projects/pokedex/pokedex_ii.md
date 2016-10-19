# Pokedex: An Introduction to the React Router - Part 2

Check out the live demo [here][live-demo]!

[live-demo]: http://aa-pokedex.herokuapp.com/
### `PokemonIndexItem`

Let's refactor your presentational component so that each pokemon object is
rendered in a `PokemonIndexItem` component. As your app grows, refactor
components to keep them minimal and modular.

Create a `frontend/components/pokemon/pokemon_index_item.jsx` file and export a
function `PokemonIndexItem` component. Your `PokemonIndexItem` should return a
`li` containing information on a pokemon's `name` and `image_url`. This
information should be served as props. Refactor `PokemonIndex` to utilize this
new component. Your `PokemonIndex` should map each pokemon objects in
`this.props.pokemon` to a `PokemonIndexItem`. It should look something like
this:

```
<section className="pokedex">
	<ul>
		{pokemon.map(poke => (
			<PokemonIndexItem key={poke.id} pokemon={poke} />
		))}
	</ul>
</section>
```

**Test your code** to ensure everything still renders as it did before.  

Let's add functionality to our app. Every time a user clicks on a
`PokemonIndexItem` we wanted to route them to a `/pokemon/:id` path and render a
`PokemonDetail` component. To see this in action check out the [live
demo][live-demo].

In order to pass `PokemonIndexItem` a reference to the router we will wrap the
component with `react-router`'s `withRouter` function. `withRouter` is referred
to as a **Higher Order Component** (HOC). Much like our container components, it
serves to pass down information (namely the `router`) through props.

* Import `withRouter` to your `PokemonIndexItem` like so:

	```js
	import { withRouter } from 'react-router';
	```

* Call this function on `PokemonIndexItem` before exporting it like so:

  ```js
  export default withRouter(PokemonIndexItem);
  ```

Your `PokemonIndexItem` will now have access to your app's router via
`this.props.router`! We can now use `router.push(path)` to redirect our user to
different routes!

Define a `handleClick` function inside of `PokemonIndexItem`. It will take a
string `url` and return a function that will take an event `e` and use
`this.props.router` to redirect our user to `url`. Use ES6 currying pattern to
generate the appropriate click handler.

Your `PokemonIndexItem` should look something like this:

```js
const PokemonIndexItem = (props) => {

  const handleClick = url => e => this.props.router.push(url);

  return (
    <li
      className="pokemon-index-item"
      onClick={handleClick(`/pokemon/${this.props.pokemon.id}`)}>
			// pokemon information...
    </li>
  );
};
```

The `handleClick` function is called, and its return value is set to the `li`'s
`onClick` property. Now whenever a user clicks a `PokemonIndexItem` the router
will redirect them to the url passed to the call of `handleClick`.

While clicking on a `PokemonIndexItem` will change the browser's url, you may
have noticed the following error in your browser console: `[react-router]
Location "/pokemon/:id" did not match any routes`.  This tells us that the
router was looking for a `Route` with a matching `path` in the `Router` and
could not find one. Let's fix this.

## Phase 5: `PokemonDetail`

Start by defining that component the `Route` will render: `PokemonDetail`.

Before defining a new component and adding it to your app, you should always
plan out where and how it will get its information. We want the `PokemonDetail`
to display a Pokemon's information as well as its `Items`. Talk over the
following questions with your partner:

* Where will the `PokemonDetail` get its information from?
* How will we pass this information to `PokemonDetail`?

Hint: Your the state shape will look something like this:
```js
// Sample State Shape
{
  pokemon: {
    1: {
			//...
		},
    2: {
			//...
		},
		//...
  },
  pokemonDetail: {
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
}
```

Implement the `PokemonDetail` component just like we did the `PokemonIndex`.
Make sure to **test at each step!**

* Create an API utility function that fetches a single pokemon.
* Create actions for both requesting and receiving a single Pokemon. This
requires defining a new constant and action creator for each action.
* Create a `PokemonDetailReducer` reducer to respond to the `pokemonDetail`
slice of the app state.
* Update the `PokemonMiddleware` to respond to the request of a single pokemon.
* Create a `PokemonDetailContainer` that maps props to `PokemonDetail`.
* Create a functional `PokemonDetail` component that returns information of the pokemon.
* Add a `Route` that renders the `PokemonDetailContainer` component when the url matches the path `"pokemon/:pokemonId`".
	* Nest the `PokemonDetailContainer` route under the route for the
	`PokemonIndexContainer`. Like so:

	```js
	<Route path='PARENT_PATH' component='PARENT_COMPONENT'>
	  <Route path='CHILD_PATH' component='CHILD_COMPONENT'/>
	</Route>
	```
	* Render `this.props.children` in `PokemonIndex`. This will ensure that
	both parent (`PokemonIndexContainer`) and child
	(`PokemonDetailContainer`) components are rendered when a user visits
	`"/pokemon/:pokemonId"`.
	* Use an `onEnter` hook in the Route to dispatch a call to the
	`requestSinglePokemon` action creator. Pass it the pokemon's id from the
	`params`. Refer to the [`onEnter` documentation][on-enter] to figure out how
	we get this information.

Your app's `Router` should look like this:

```js
<Router history={History}>
	<Route path="/" component={PokemonIndexContainer} onEnter={requestAllPokemonOnEnter}>
		<Route path="pokemon/:pokemonId" component={PokemonDetailContainer} onEnter={requestSinglePokemonOnEnter} />
		</Route>
	</Route>
</Router>
```

**Test your `PokemonDetail` redux cycle and route!** Does it behave like the
[live demo][live-demo]. Show a TA before moving on.

[on-enter]: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback

## Phase 6: `ItemDetail`

Let's add more functionality and another Route. When a user clicks on an item
from a pokemon's `PokemonDetail`, the router should redirect to a path
`/pokemon/:pokemonId/items/:itemId` where an `ItemDetail` component displays
information about an `Item` within the `PokemonDetail` component. This should be
implemented without any changes to the application state because items are loaded
into the `pokemonDetail` slice of state when a single pokemon is selected.


* Create an `ItemDetailContainer` that receives an item's information as `props`.
	* When providing the item to the `ItemDetail` component from the
	`ItemDetailContainer`, remember that `mapStateToProps` accepts a second parameter
	`ownProps`. `ownProps.params` returns the params object.
	* Use `ownProps.params.itemId` to select the correct item from the `state`.
	* Define a new `selectPokemonItem(state, itemId)` selector and call it in `mapStateToProps`.
* Create a functional `ItemDetail` component that displays its `item` prop.
	* `ItemDetailContainer` connects it to the store.
* Create a nested route that renders the `PokemonIndexContainer`,
`PokemonDetailContainer` and `ItemDetailContainer` when the path matches
`/pokemon/:pokemonId/items/:itemId`. Hint: nest your new `Route` and don't
forget to render `this.props.children`.

Your app's `Router` should look like this:
```js
<Router history={hashistory}>
	<Route path="/" component={PokemonIndexContainer} onEnter={requestAllPokemonOnEnter}>
		<Route path="pokemon/:pokemonId" component={PokemonDetailContainer} onEnter={requestSinglePokemonOnEnter}>
			<Route path="item/:itemId" component={ItemDetailContainer} />
		</Route>
	</Route>
</Router>
	```

**Test your `ItemDetail` components and route!** Does it behave like the [live
demo][live-demo]? Show a TA before moving on.

## Phase 7: Creating Pokemon

Our next feature will be to allow the creation of new Pokemon. To allow users
to create Pokemon, you will need to:

* Define a `#create` controller action for the `PokemonController`.
* Create an API function that sends a single Pokemon's information as part of a
`POST` request to the backend.
* Create actions for both creating and receiving a new Pokemon.
* Update the reducer to respond to receiving a new Pokemon.
* Update the middleware to respond to a `CREATE_POKEMON` action.
* Create a `PokemonFormContainer` that only connects `mapDispatchToProps`.
  * Pass a function prop called `createPokemon` that dispatches your
	`CREATE_POKEMON` action.

**Test at each step!**

### `PokemonForm`

Create a controlled `PokemonForm` component.

Remember, a **controlled component** is one which overrides the default
functionality of the browser, allowing your code to entirely control your
application. This is most commonly used in forms to ensure that input field
values are being tracked in internal state and that submit buttons perform
actions as described by the application.

Use the `constructor()` method to provide a default internal state to your form.
Even though Javascript convention is to use camelCase, it is often easiest to
define data in the format our server expects when making a "POST" request.  In
Ruby, this means snake_case.

Normally these constructor functions are taken care of by React. In this case,
we are overriding the constructor function to have a default internal state, so
it is our responsibility to make sure all functions are properly bound. Like so:

```javascript
class ControlledComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //...
    };

    this.exampleMethod = this.exampleMethod.bind(this);
  }

	//...
}
```

For the input elements, use an `onChange` listener and write a single `update`
function to call the `setState` method.

An basic example of an `update` method is below:
```js
class ControlledComponent extends React.Component {
	//...

	update(property) {
	  return e => this.setState({[property]: e.target.value});
	}

	//...
}
```

The best html element for the Pokemon type is a `<select>` element, which
appears to the user as a dropdown. Copy / paste the array of pokémon types from
the model and use it in your `PokemonForm`.

Write a `handleSubmit` method as well that prevents the default event action and
instead calls the `createPokemon` function from props. Make sure to pass this
function to the `onSubmit` listener of the form.

We want this form to appear when at the same root path as the `PokemonIndex`,
but not at any further nested routes like the `PokemonDetail`. This is exactly
what `IndexRoute` is for. Import it along with the rest of the React Router
tools and pass it the `PokemonFormContainer`.

**NB**: There are a couple of tricky aspects to getting the form to work
properly which will be great debugging practice. Use a `debugger` in your
`postPokemon` function to ensure that you are always passing the correct
parameters to your API.

The final parts of the `PokemonForm` are redirecting callback and error handling.

### Redirecting

Once the posting is complete we want the application to redirect to the newly
created Pokemon. We need to wait, however, because we need this Pokemon's ID in
order to push to that URL. This should happen in our `PokemonMiddleware`. In
order to change location outside of React components, we need to import the
`hashHistory` module.

  ```js
  import { hashHistory } from 'react-router';
  ```

This imports a reference to the `hashHistory` object that we can push directly
to. Call `hashHistory.push` with the correct url inside of your `postPokemon`
success callback.

Your `PokemonMiddleware` should look something like this:

  ```js
  const PokemonMiddleware = store => next => action => {

    const receiveNewPokemonSuccess = pokemon => {
      dispatch(receiveNewPokemon(pokemon));
      hashHistory.push(`/pokemon/${pokemon.id}`);
    };

    switch (action.type) {
      //...

      case CREATE_POKEMON:
        postPokemon(action.pokemon, receiveNewPokemonSuccess);
        return next(action);

			//...
    }
  };
  ```

### Error Handling

The server will tell us whether or not our new Pokemon was created successfully.
But so far, we have no way of letting our users know what happened. We need a
way of displaying errors on the front-end after an unsuccessful POST request by
adding an `errors` slice to our state.

```js
// Sample State Shape
{
  pokemon: {
		//...
  },
  pokemonDetail: {
  	//...
  },

  errors: [ "message 1", "message 2" ]
}
```

* Add a failure callback to the `postPokemon` api util function.
* Add a `receivePokemonErrors` action and corresponding constant.
* Add a new reducer, `ErrorsReducer`, to handle the `errors` slice to your app state.
* Update the `PokemonMiddleware` to use this new action
  * `PokemonMiddleware` should also be responsible for constructing the error callback
* Add a `mapStateToProps` function that connects to the `PokemonFormContainer`
* Add an errors function to the `pokemonForm` that returns an unordered list of error messages.
* Add a `mapStateToProps` function in the `PokemonFormContainer` to provide the `PokemonForm` with a list of errors

## Phase 8: Loading Spinner

In this phase we'll create a 'loading' spinner that displays while we're fetching information from the backend.

* Google search "css spinners" -- pick one you like!
* Create a new reducer, the `LoadingReducer`
  * Your `LoadingReducer` shoulw care about all `REQUEST_` and `RECEIVE_` action types
  * When a request is made, change the loading state to `true`, when the data is received, change the state to `false`
* Use `next(action)` in your `PokemonMiddleware` to always ensure the passing of
your actions to the reducer
* Change your `PokemonIndex` and `PokemonDetail` components to render the spinner if the loading state is `true`

## Phase 9: Bootstrap Poketypes

We have a list of pokétypes in two places: our `Pokemon` model and our
`PokemonForm` React component. This is not very dry. Let's employ a tactic
called "bootstrapping" to tell our form all the pokémon types.

* Delete the `POKEMON_TYPES` constant from your `PokemonForm` component
* Open `application.html.erb`
  * Add a `<script>` tag; inside, set the value of window.POKEMON_TYPES to the POKEMON_TYPES constant used in the `PokemonModel`
  * Use the `#raw` method to tell rails not to escape the symbols in our array
* Update you `PokemonForm` to use `window.POKEMON_TYPES` instead

```js
window.POKEMON_TYPES = <%=raw Pokemon::TYPES %>
```

## Bonus: Update Items

Add the ability to reassign items to different Pokemon. This time, design is up to you!
