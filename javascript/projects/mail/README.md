# Mail

## Phase 0: Setup
* Download skeleton

## Phase I: Routing

### Triggering Route Changes
#### `main.js`

* Add an event listener for `DOMContentLoaded`
  * In the callback add an event listener on `.sidebar li` for `click`
    * Get the name of the location from the `innerText` of the element
    * Set `location.hash` to be the new location
* Test that clicking on the sidebar elements changes the hash
* Test that this isn't making a new request

### Handling Route Changes
#### `router.js`
* Create a constructor function `Router` that takes an argument `node`
  * Save `node` to `this.node`
* Create prototype methods `start`, `activeRoute`, and `render`
  * `start`
    * Immediately call `render` upon start
    * Add event listener for `hashchange` and call `render` in callback
  * `render`
    * Clear `this.node` using `innerHTML = ""`
    * Call `activeRoute` to get the name of the current route
    * Create a new `<p>` DOM Node using `document.createElement` to contain
      the new route we are going to insert into the DOM
    * Set the innerText of the new DOM Node to the route name returned from
      `activeRoute`
    * Insert the new DOM Node into `this.node` with `appendChild`
  * `activeRoute`
    * Get the hash fragment using `location.hash`
    * Remove the `#` character
    * Return the result

#### `main.js`
* Require the `router` constructor function
* In the `DOMContentLoaded` callback
  * Get the `.content` DOM Node with `document.querySelector`
  * Create a new instance of the `router` passing in the `.content` DOM Node
  * Start the `router` with `Router.prototype.start`
* Test that clicking on the sidebar items changes the content of the page AND
  that we are still on a single page that is not making new requests

## Phase II: Displaying Messages
Let's make something more interesting happening when the route changes. We could
do all the logic of creating DOM Nodes for each route  in the router like we are
now, but it's better to separate each separate "view" into it's own module(JS
file) that will be responsible for returning a DOM Node. We conventionally call
these modules components.

### `Inbox.js`
* Create an `Inbox.js` file that will export our `Inbox` component
  * The `Inbox` component will be a Javascript object
  * Create a property on the object called `render` which will be a function
    that returns a DOM Node
    * Create a container `<ul>` DOM Node using `document.createElement`
    * Set the class name of the container to `messages` using the `className`
      property so our styles will apply
    * For now set the `innerHTML` of the container to `"An Inbox Message"` so we
      can test that the component works
    * return the container

### `main.js`
Now we are going to create a mapping from `routes` to `components`. This will
allow us to create this mapping outside of the `router`, so that we can freely
modify this mapping elsewhere and treat the `router` like a black box.

* Create the `routes`
  * Create an object called `routes`. You don't need to create this inside the
  `DOMContentLoaded` callback. We could theoretically load this in from another
file, but it's simple enough that we will just make it in main.
  * We are going to format this object so that property names will be the names of
  routes ie. (`compose`, `inbox`, and `sent`)
  * For now just create one route by setting an `inbox` property with a value of
  the `Inbox` component itself. **Make sure you require the `Compose` module**
* Give the routes to the router
  * Pass the `routes` object as a second argument to the `Router` constructor
    function

### `router.js`
* `Router`
  * Let's update our `Router` to store the `routes`
  * Add a second parameter to the constructor function called `routes`
  * Save `routes` to `this.routes`
* `activeRoute`
  * Now we are going to change `activeRoute` to return the component that
    matches the current route instead of just returning the name of the route
  * Look up the appropriate component for the current route by accessing
    `this.routes` using the location name you retrieved from the hash. **Make
sure you have removed the "#" from the name.
  * Return the component
* `render`
  * Now that `activeRoute` returns a `component` instead of just text we need to
    tweak `render`
  * Save the result of calling `activeRoute` to a variable called `component`
  * There is a chance that no component will be returned from `activeRoute` in the
    case of a navigating to an incorrect hash fragment.
  * If `component` is not defined, then `render` should just clear `this.node`
    with `this.node.innerHTML = ""`
  * If `component` is defined, then we want to render the component into
    `this.node`
    * Clear `this.node` as before
    * Call `component.render()` to retrieve the DOM Node returned by the
      componet
    * Use `appendChild` to insert the DOM Node into `this.node`
* Test that clicking on the `Inbox` link in the sidebar inserts `An Inbox
  Message` onto the page.
* Test that clicking on the other sidebar links clears the page

### `messageStore.js`
Now that we have the core pieces of our single page application working together
cohesively, we can add any cool new component and corresponding route that we
want and everything should work.

Before we have components that render anything particularly interesting,
however, we need a data source to give them something to work with.

Just like we separated the code that matched routes into the `router` and the
code that rendered views into `components`, we are going to a separate module
that will store our data and expose an API for retrieving and manipulating it.

* Create a file called `messageStore.js`.
* Create a variable in this file called `messages`. This variable will actually
  store all of the e-mail messages for our application, but instead of directly
exporting the object itself, we are going to export an object with functions to
access this variable. Code in other modules will not be able to directly change this variable since
  it is only in scope inside the file, but any function that we define (and then
export) from this module will have closed over the variable so those functions
will have access to it.
* Let's fill the `messages` object with some seed data that our components will
  able to display.
  * Create two properties on the object: `sent` and `inbox`
  * These two properties will store an `array` of messages for their particular
    folder
  * Each `array` will contain objects that represent each individual message
  * You should format the messages so they have the following properties: `to`,
    `from`, `subject`, `body`.
  * Here is an example. Feel free to use this or get creative
  ```js
  messages = {
    sent: [
      {to: "friend@mail.com", subject: "Check this out", body: "It's so cool"},
      {to: "person@mail.com", subject: "zzz", body: "so booring"}
    ],
    inbox: [
      {from: "grandma@mail.com", subject: "Fwd: Fwd: Fwd: Check this out", body:
"Stay at home mom discovers cure for leg cramps. Doctors hate her"},
      {from: "person@mail.com", subject: "Questionnaire", body: "Take this free quiz win $1000 dollars"}
    ]
  ```

* Now that we have some data, let's create functionality for working with it.
  * Create a new object called `MessageStore`. This object will be what this
    module exports
  * Create the follow functions as properties on this object:
    `getInboxMessages`, `getSentMessages`, and `addSentMessages`.
    * `getInboxMessages` should return the array at `messages.inbox`
    * `getSentMessages` should return the array at `messages.sent`
    * `addSentMessage` should take a message as a parameter and `push` it into
      the array of sent messages at `messages.sent`
  * Make sure you export the `MessageStore` at the end of the file

### `Inbox.js`
Now that we have a data source to work with let's change our `Inbox` component
to render something more interesting.

* `render`
  * Instead of just inserting `"An Inbox Message"` into the `innerHTML` of the
    container `<ul>` DOM Node, we are going to append a new DOM Node for each message
in the inbox
  * First we need to get all of the messages in the inbox. Call
    `messageStore.getInboxMessages()` to retrieve them from the store. **Make
sure you require the `messageStore` at the top of the file.
  * Now iterate over the inbox messages so we can put each message into the
    container.
  * In order to keep `render` nice and clean, we're going to rely on a
    `renderMessage` function that we will write later which will
render a DOM Node for a given message
  * When you iterate over each message call `appendChild` on the container and
    pass it the result of calling `this.renderMessage` passing in the current
message you are iterating over.

* `renderMessage`
  * Add a new function to the `Inbox` component that takes a `message` object as
    a parameter and returns a new DOM Node for that message.
  * First create a new `<li>` DOM Node that we will return when we've finished
    populating it.
  * Give the `<li>` a class of `message` using the `className` property so our
    styling will apply.
  * Now set the `innerHTML` of the `<li>` to the following
    * A `<span>` with class `from` with content `message.from`
    * A `<span>` with class `subject` with content `message.subject`
    * A `<span>` with class `body` with content `message.body`
  * Return the `<li> DOM Node

* Test that clicking on the inbox link displays all your messages

## Phase III: Sent Component

### `Sent.js`

### `main.js`

## Phase IV: Compose Component

### `Compose.js`

### `main.js`
