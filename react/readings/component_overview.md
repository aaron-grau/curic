# Flux Component Overview

### Guide
The concept of single directional data flow in the Flux world means that
information can only enter a component from one other component. For
example: a store can only be changed by the dispatcher. A dispatcher can
only be used by an action. An action is usually used by a view. And a
view is only changed by events from the store. 

A component's **user** is the component that is allowed to run functions
or change that component. A component's **observer** is the component that
the original component is allowed to change.

![the diagram](../assets/flux-diagram.png)


### Dispatcher
##### Overview
The central information hub. A singleton. Stores callbacks from **stores**
so it can notify them when **actions** are triggered.
##### Users
**Actions** create objects that are _dispatched_ through the dispatcher.
##### Observers
**Stores** receive all objects (sometimes known as actions) that are dispatched through the dispatcher.
It is up to them individually to decide what they do with the payload.

### Stores
##### Overview
Hold resources and provide functionality for reading. If your
application is about managing todo's, you will likely have a `TodoStore`
which holds all the actual todo items. Implemented as singletons.
##### Users
Data can be **read** by views, but **NOT** written. The only component that
has any right to _change_ a store's contents is the **Dispatcher** when an
**action** has been dispatched through it.
##### Observers
When a store changes, it should `emit` an event. Views will register
event listeners on these events so they will be notified when the
contents change and can get the latest data.

### Views
##### Overview
Usually React components.
##### Users
Users interact with views. Events `emit`ted from **stores** cause views'
properties/state to be updated.
##### Observers
User interaction can cause **actions** to be triggered.

### Actions
##### Overview
Used to prepare objects to be **dispatched**. Also used for communicating
with web APIs.
##### Users
Can be triggered by **views** or API callbacks.
##### Observers
The **dispatcher** is...dispatched as part of an action.
