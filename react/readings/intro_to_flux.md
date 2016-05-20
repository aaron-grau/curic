# Intro to Flux
## What is Flux?
Flux is an _architecture_ developed by Facebook for front end web
applications. It provides a logical structure to follow when organizing
front end code. The fundamental idea is that data flows in only one
direction. If this sentence doesn't make sense, don't worry. Once you
start making applications using the Flux architecture the concept will
become more clear.

All explanations of flux show the following diagram:
![flux diagram](../assets/flux-diagram.png)

The core pieces of Flux are the React Component Views, the Dispatcher,
and the Data Stores. We are already familiar with React views. The
dispatcher and stores, however, are new concepts.

A store is an object with functions that expose a resource. It provides access to models. It
has methods for adding, removing, and listing all models. Your Flux
stores will likely have a similar interface. These are implemented as
singleton objects, meaning that there is only one instance of the store
and it is globally available.

The Dispatcher is also singleton object whose duty is to hold callbacks and
trigger them all when an action occurs. An action is something that
would change a store. Strictly speaking: the action is the object that
the dispatcher passes to all of its callbacks. An action minimally has a
type. This informs the Stores what kind of action is being dispatched.
For example: when a message should be deleted from a message store, the
object given to the dispatcher (the action) would likely be the
following: `{ type: MESSAGE_CONSTANTS.DELETE_MESSAGE, id: 2 }`. The
message store will be notified and it can decide what to do with this
action, but it should probably remove the message with the `id` of `2`.

When a store changes, it should emit an event so that all views that
depend on its contents can update themselves. Views listen to events
emitted by stores.

## What isn't Flux?

Flux is NOT a framework, but an application architecture or pattern. Flux doesn't provide base
classes for all the key components. This means that we must implement
(almost) everything by hand.

This is nice because it means the way we implement these concepts is
flexible and completely up to the developer. For example: a store could
be just an object with functions defined as properties! Or it could be an instance of a class from another JS library (EventEmitter, Backbone etc.) The store is only a concept!
