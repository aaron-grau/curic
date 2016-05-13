# Flux Stores and Actions

## Stores

It is the duty of Flux Stores to store a repository of data. However, there are
a couple of things that distinguish a Store from just a plain old array. Moving
forward, we'll be using the Store from Facebook's [Flux Utils][store-link],
which provides us a solid implementation and reduces the need for us to write
boilerplate. Have a look through the API (don't worry about the other types of
Store listed there) before continuing on.

[store-link]: https://facebook.github.io/flux/docs/flux-utils.html#store

#### Stores are linked directly to a Dispatcher, and respond to its messages.

The Store we're using takes a dispatcher as an argument. Once you have the basic
Flux structure set up, get the dispatcher by requiring it at the top of the file
from your `dispatcher/Dispatcher.js` file.

When an action is triggered, the dispatcher passes the action's payload along to
any objects that have registered with the dispatcher (i.e., our Stores that were
constructed with said dispatcher). It is the job of the Store to inspect these
payloads and determine what (if anything) needs to happen in response. We can
accomplish this by registering a callback with the dispatcher. All Stores must
implement `__onDispatch()`.

```js
MyStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
  case MyConstants.ACTION_ONE:
    MyStore.responseOne(payload);
    break;
  case MyConstants.ACTION_TWO:
    MyStore.responseTwo(payload);
    break;
  }
};
```

#### Stores are event emitters.

When the contents of a store change, the store emits an event to notify any
dependent objects (our React components).

```js
var AppDispatcher = require('../dispatcher/Dispatcher.js');
var Store = require('flux/utils').Store;

var MyStore = new Store(AppDispatcher);

var _objects = [];

var addObject = function (object) {
  _objects.push(object);
  MyStore.__emitChange();
};

// ...
```

The Store class in Flux/Utils exposes the following API to manage events:

- `addListener(callback)`: Adds a callback to be called when the Store
  emits a change event. This can be called from our React views, commonly 
  in `componentDidMount()`.
  - `remove()`: `addListener()` returns a token when called. By storing this
    value, we can remove the listener at a later date by calling
    `remove()` on the token. This is commonly done in `componentWillUnmount()`.
- `__emitChange()`: Emits a change event. This triggers all callbacks that
  were added using `addListener()`.

Summary: use `addListener()` and `remove()` to allow your React components to
register and de-register listeners on your Store. Use `__emitChange()` to emit
events when the contents of the Store change.

#### Stores do not expose their data publicly.

If we change a Store's data without emitting an event, our React components may
not know that they should update. This is dangerous and allows discrepancies to
creep into our presentation. In order to privatize the underlying data store, be
sure to use a local variable and a closure to store data, rather than appending
it as a property or instance variable on the store. Similarly, if we have 
functions that can mutate the store's data (like `addObject()`), we should also
make those local variables and not accessible directly through the Store object.

```js
var _data = [];

var MyStore = // ...
```

In addition, don't pass a reference to the original `_data` variable to any
components. If the data is needed, pass a copy:

```js
var _data = [];

// ...

MyStore.all = function () {
  return _data.slice();
};
```

## Actions

In Flux, Actions are simply helper functions that dispatch a payload through the
dispatcher. It would be possible to do this dispatching directly from the user
interaction or API util, but in practice it is best to centralize actions and
write them to be easy to invoke. Actions can be triggered by user interaction
and also by responses from the server to AJAX requests from our application.
Here are a couple of sample actions:

```
var TodoActions = {
  addTodo: function (todo) {
    AppDispatcher.dispatch({
      actionType: "ADD_TODO",
      todo: todo
    });
  },

  removeTodo: function (todo) {
    AppDispatcher.dispatch({
      actionType: "REMOVE_TODO",
      todo: todo
    });
  }
};
```

The argument to `AppDispatcher.dispatch()` here is the 'payload'. Our dispatcher
dispatches to all registered Stores, causing the callbacks specified in those
Stores' `__onDispatch()` functions to fire. If the Action Type matches any of
the ones that the Store is listening to, the Store will update based on the
payload and emit a change event.
