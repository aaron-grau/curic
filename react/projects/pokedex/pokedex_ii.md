# Pokedex: An Introduction to the React Router - Part 2

Check out the live demo [here](http://aa-pokedex.herokuapp.com/)!

Refer to our readings and the instructions for Part 1 to help guide you through
Part 2.

## Phase 4: Pokemon Detail

Before creating a component, we should always plan out where and how it will get its information. Eventually, we will want the `PokemonDetail` to display a Pokemon's information as well as its `Items`. Talk over the following questions with your partner:

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
