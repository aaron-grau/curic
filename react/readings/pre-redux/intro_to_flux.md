# Flux

Flux is a front-end application architecture Facebook developed to use with
React. Flux is not a library or framework. Like MVC, Flux is simply a pattern in
which to structure one’s application. As seen in the following diagram, Flux
provides unidirectional data flow, which affords more predictability than the
multi-threaded, cascading updates one might encounter in an MVC application.

![flux]


## Action

An action begins the flow of data in Flux. An action is a simple JavaScript
object that at a minimum contains a `type`. An action’s `type` indicates the
type of change to be performed on the application’s state. An action may contain
additional data (the "payload") that’s necessary for changing the application’s
former state to its next one. Actions typically don’t get much more complicated
than this:

```js
{
  type: 'RECEIVE_TODOS',
  todos
}

```

Here’s a function that might be responsible for returning that action:

```js
const receiveTodos = (todos) => {
  return {
    type: 'RECEIVE_TODOS',
    todos
  }
}
```


## Dispatcher

The dispatcher is a mechanism for distributing (or "dispatching") actions to a
Flux application’s store. The dispatcher is little more than a registry of
callback functions into the store. Redux (the implementation of Flux we’ll use
at App Academy) consolidates the dispatcher into a single `dispatch()` function.


## Store

The store contains all of the state of the application in a simple JavaScript
object. One might think of the store as a cache of only data that’s relevant to
the React components. Keeping a store of information on the front-end is much
more efficient than repeatedly querying the database.

The store is responsible for updating the state of the application appropriately
whenever it receives an action. It does so by registering with the dispatcher a
callback function that receives an action. This callback function typically
contains a switch statement on `action.type`, ensuring that the store calls the
proper function to change the application’s state. After the store has changed
state, it “emits a change.”


## View

A view is simply a React component. To complete the Flux pattern, a view listens to
change events emitted by the store. When a change to the application’s data
layer occurs, a view can update its own internal state with `setState` and cause a
re-render.

A view can create actions, as in user-triggered events. If a user marks a
todo as complete, a `TodoList` React component might call a function that would
dispatch a `toggleTodo` action. Creating an action from the view turns our
Flux pattern into a unidirectional loop.

![flux-loop]

Here the original action might result from an asynchronous request to fetch
todos from the database with a success callback to dispatch our
`receiveTodos(todos)` action. It's a common pattern in Flux to first dispatch an
action that sets the initial state of the application, with further
modifications coming from the client.

## Redux

Redux is a node package that facilitates a particular implementation of Flux. A
Redux loop behaves slightly differently than a vanilla Flux loop, but the
general concepts remain the same.

![redux-loop]

You'll soon learn about Redux in greater detail. For now here are some brief
explanations of unfamiliar terms so that you can begin to trace the flow of data
in a Redux application.

**Middleware:** An ecosystem of utilities that augments the functionality of `dispatch()`.
Although `dispatch()` still ultimately returns a simple action to the root
reducer (more on that in the next paragraph), with middleware it can also log
the state of the application, make asynchronous requests, etc. Without
middleware the Redux store supports only synchronous flow of data.

**Reducers:** The part of the store that updates the application’s state. A reducer is a pure
function that receives the previous state and an action and returns the next
state. In a sizable Redux application it’s common to split the reducer into
separate functions, each of which manages a slice of the global state. One
combines these specialized reducers with `combineReducers()`, creating the "root
reducer."

[redux-loop]:https://camo.githubusercontent.com/e7921fdb62c3bab89005e090677a6cd07aceaa8c/68747470733a2f2f7062732e7477696d672e636f6d2f6d656469612f434e50336b5953577741455672544a2e6a70673a6c61726765


[flux-loop]: https://facebook.github.io/flux/img/flux-simple-f8-diagram-with-client-action-1300w.png

[flux]: https://facebook.github.io/flux/img/flux-simple-f8-diagram-1300w.png
