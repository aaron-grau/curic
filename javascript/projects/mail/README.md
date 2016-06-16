# Mail
The goal of this project is to learn the basics of how to make a
[single-page application](https://en.wikipedia.org/wiki/Single-page_application).
Some of the benefits of a single-page application include:
* More responsive user experience because you don't need to complete a
  request/response cycle with every user interaction
* Similar feeling to a native, desktop application
* Decoupling of server architecture from user-interface gives flexibility
  and opportunity for scaling.

There are several frameworks that facilitate the process of creating single-page
applications, but it is important to understand the fundamental WebAPIs and
logic they all use.

You will also practice managing client-side data using good modular code design.
## Phase 0: Setup
* Download the skeleton
* Create a `main.js` file that contains `console.log("It's working")`
* Open up a new terminal tab and run `webpack --watch main.js bundle.js`
* Open `index.html` in your browser and test that you see `It's working` in the
  console

## Phase I: Routing
In order to have a single-page application we need a system for "routing" to
different parts of our application. We need to create a system that makes it
look like you are navigating to different pages, but just uses JavaScript to
manipulate the DOM instead of making a new HTTP request.

There are different ways of accomplishing this "routing" process. We are going
to use a commonly used technique of changing the [hash
fragment](https://en.wikipedia.org/wiki/Fragment_identifier). When the URL of
the page you are on changes in such a way that **only** the hash fragment
changes, your browser will not make a new request.

Your browser will simply trigger a `hashchange` event. We will add an event
listener for this event, and then update the DOM based on what the hash was
changed to.

This scheme will allow us to programatically change routes and react to the changes
without trigger a redirect.

### Triggering Route Changes
#### `main.js`

* Add an event listener for `DOMContentLoaded`
  * In the callback add an event listener on `.sidebar-nav li` for a `click`
    event which will do the following:
    * Get the name of the location from the `innerText` of the element
    * Call `toLowerCase` on the name to make sure there aren't case differences
    * Set `location.hash` to be the lower cased location name
* Test that clicking on the sidebar elements changes the hash
* Test that this isn't making a new request. You can do this easily by setting a
  variable in the console in the dev tools. If it is still defined after
clicking the sidebar element, you have not made a new request.

### Handling Route Changes
#### `router.js`
* Create a constructor function `Router` that takes an argument `node` which
  will be a pointer to the DOM Node that the router should be operating on
  * Save `node` to `this.node` so we can use it later.
* Create prototype methods `start`, `activeRoute`, and `render`
  * `start`
    * Immediately call `render` upon start so that if someone is linked to a URL
      with a hashfragment or if they refresh with a hashfragment the router will
still update the DOM
    * Add an event listener for `hashchange` and call `render` in the callback
      * This will make the Router update the DOM every time the hash fragment
        changes
  * `render` - This function is responsible for actually updating the DOM by
    changing the content of the DOM Node that was given to the router when it
was constructed
    * Clear `this.node` using `innerHTML = ""`. This will remove anything left
      over from a previous route.
    * Call `this.activeRoute` to get the name of the current route. We will write
      this function soon.
    * Create a new `<p>` DOM Node using `document.createElement` to contain
      the new route we are going to insert into the DOM
    * Set the innerText of the new DOM Node to the route name returned from
      `activeRoute`
    * Insert the new DOM Node into `this.node` with `appendChild`
  * `activeRoute` - This function will initially just return the name of the
    currently active route
    * Get the hash fragment using `location.hash`
    * Remove the `#` character
    * Return the result

#### `main.js`
* Require the `router` constructor function
* In the `DOMContentLoaded` callback
  * Get the `.content` DOM Node with `document.querySelector`. This is DOM Node
    we are going to give our `router` to be responsible for updating.
  * Create a new instance of the `Router` passing in the `.content` DOM Node
  * Start the `router` with `Router.prototype.start`
* Test that clicking on the sidebar items changes the content of the page AND
  that we are still on a single page that is not making new requests

## Phase II: Displaying Messages
Let's make something more interesting happen when the route changes. We could
do all the logic of creating DOM Nodes for each route in the router itself like
we are now, but it's better to separate each separate "view" into it's own module(JS
file) that will be responsible for returning a DOM Node. We conventionally call
these modules components.

### Routing to Components
#### `Inbox.js`
* Create an `Inbox.js` file that will export our `Inbox` component
  * The `Inbox` component will be a JavaScript object
  * Create a property on the object called `render` which will be a function
    that returns a DOM Node
    * Create a container `<ul>` DOM Node using `document.createElement`
    * Set the class name of the container to `messages` using the `className`
      property so our styles will apply
    * For now set the `innerHTML` of the container to `"An Inbox Message"` so we
      can test that the component works
    * Return the container

#### `main.js`
Now we are going to create a mapping from `routes` to `components`. This will
allow us to specify the routing configuration outside of the router. Separating
the configuration from the logic that uses that configuration is good
practice because it follows the principle of [separation of
concerns](https://en.wikipedia.org/wiki/Separation_of_concerns).

* Create the `routes`
  * Create an object called `routes`. You don't need to create this inside the
  `DOMContentLoaded` callback. We could theoretically load this in from another
file, but it's simple enough that we will just make it in `main.js`
  * We are going to format this object so that its properties will be the names of
  routes ie. (`compose`, `inbox`, and `sent`)
  * For now just create one route by setting an `inbox` property with a value of
  the `Inbox` component itself. **Make sure you require the `Inbox` module**
* Give the routes to the router
  * Pass the `routes` object as a second argument to the `Router` constructor
    function. We will make use of this additional argument in the next part.

#### `router.js`
* `Router`
  * Add a second parameter to the constructor function called `routes`
  * Save `routes` to `this.routes`
* `activeRoute`
  * Now we are going to change `activeRoute` to return the component that
    matches the current route instead of just returning the name of the route
  * Look up the appropriate component for the current route by accessing the
    `this.routes` object using the location name you retrieved from the hash. **Make
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
      component
    * Use `appendChild` to insert the DOM Node into `this.node`
* Test that clicking on the `Inbox` link in the sidebar inserts `An Inbox
  Message` onto the page.
* Test that clicking on the other sidebar links clears the page

### Rendering Data from Components
Now that we have the core pieces of our single page application working together
cohesively, we can add any cool new component and corresponding route that we
want and everything should work.

Before we have components that render anything particularly interesting,
however, we need a data source to give them something to work with.

Just like we separated the code that matched routes into the `router` and the
code that rendered views into `components`, we are going to make a separate module
that will store our data and expose an API for retrieving and manipulating it.

#### `messageStore.js`

* Create a file called `messageStore.js`.
* Create a variable in this file called `messages`. This variable will actually
  store all of the e-mail messages for our application, but instead of directly
exporting the object itself, we are going to export a different object with functions to
access this variable. Code in other modules will not be able to directly change the `messages` 
variable since it is only in scope inside the file, but any function that we define (and then
export) from this module will have closed over the variable so those functions
will have access to it.
* Let's fill the `messages` object with some seed data that our components will
  able to display.
  * Create two properties on the object: `sent` and `inbox`
  * These two properties will store an `array` of messages for their particular
    folder
  * Each `array` will contain objects that represent each individual message
  * You should format the messages so they have the following properties: `to`,
    `from`, `subject`, and `body`.
  * Here is an example. Feel free to use this or get creative
  ```js
  let messages = {
    sent: [
      {to: "friend@mail.com", subject: "Check this out", body: "It's so cool"},
      {to: "person@mail.com", subject: "zzz", body: "so booring"}
    ],
    inbox: [
      {from: "grandma@mail.com", subject: "Fwd: Fwd: Fwd: Check this out", body:
"Stay at home mom discovers cure for leg cramps. Doctors hate her"},
      {from: "person@mail.com", subject: "Questionnaire", body: "Take this free quiz win $1000 dollars"}
    ]
  };
  ```

* Now that we have some data, let's create the functionality for working with it.
  * Create a new object called `MessageStore`. This object will be what this
    module exports
  * Create the follow functions as properties on this object:
    * `getInboxMessages` should return the array at `messages.inbox`
    * `getSentMessages` should return the array at `messages.sent`
  * Make sure you export the `MessageStore` at the end of the file

#### `Inbox.js`
Now that we have a data source to work with let's change our `Inbox` component
to render it.

* `render`
  * Instead of just inserting `"An Inbox Message"` into the `innerHTML` of the
    container `<ul>` DOM Node, we are going to append a new DOM Node into the container 
for each message in the inbox
  * First we need to get all of the messages in the inbox. Call
    `messageStore.getInboxMessages()` to retrieve them from the store. **Make
sure you require the `messageStore` at the top of the file.
  * Now iterate over the inbox messages array so we can put each message into the
    container.
    * In order to keep `render` nice and clean, we're going to rely on a
    `renderMessage` function that we will write later which will
render a DOM Node for a given message
    * When you iterate over each message first call `this.renderMessage` and
      pass in the current message you are iterating over to get a DOM Node for
that message.
    * Next call `appendChild` on the container and pass it the DOM Node returned
from `renderMessage`

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
  * Using a [template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
will make this easier as you can treat it sort like of an `html.erb` file.
  * Return the `<li> DOM Node

* Test that clicking on the inbox link displays all your messages
* Now that your inbox works, make the application immediately route to the inbox
  by using `location.hash` to route to `#inbox` inside the `DOMContentLoaded`
callback. **Make sure this happens after the router starts**

## Phase III: Sent Component
After setting up routing and creating a store for our data creating another
component should be easy.

### `Sent.js`
* The `Sent` component should be almost identical to the `Inbox` component. It
  should look exactly the same, but make the following changes
  * `render`
    * Retrieve the sent messages instead of the inbox by calling `messageStore.getSentMessages`
  * `renderMessage`
    * Replace `<span class="from">${message.from}</span>` with `<span
      class="to">To: ${message.}</span>` so we display the recipient instead of
the sender in the sent folder

### `main.js`
* Add a route for the `Sent` component by adding a property to `routes` called
  `sent` with a value of the `Sent` component **Remember to require the Sent
component**

## Phase IV: Compose Component
Now let's add a new component that will allow us to write new e-mails. The
process will be the same as making the `Inbox` and `Sent` components with a few
key differences:
* The component will have a more complicated structure for the DOM Node it needs to
  render
* We will need to add event listeners in order to give to give our component a
  couple key pieces of functionality
  1. We want to store the message being drafted somewhere in memory. If the
     currently drafted messaged only exists as a values in the fields of a
form, then as soon as the form is unmounted from the DOM then you will lose
the contents of your draft. So for example if you are writing a message and you
then click on the inbox tab, this will delete your drafted message. We need
to add a listener to the form so that every time the value changes we update the copy
that we're storing in memory.
  2. The default behavior when a form is submitted is to make a new request
to the current url (or the one specified in the form) with the contents of the
form . This would cause a reload of the entire page and completely ruin the
single page application architecture we are going for. Therefore we will add
another listener on the form so that when it is submitted, we prevent the
default behavior and handle the submission according to our own logic.

### `messageStore.js`
Let's make a couple additions to our `messageStore` to provide the logic for
storing message drafts.
* We are going to make a constructor function to facilitate creating new message
  objects. Every time we send a message, we need to create a new message object,
and making a constructor function will make this easier to do in a DRY manner.
This conflicts with the way we wrote our seed data, but since the seed data only
really exists for testing purposes, it's alright. In a real mail application we
would not be hard coding messages, but instead fetching them from a server. So
you can leave the seed data as is for now.
  * Create a constructor function `Message`. This function should have the following
  paramters: `from`, `to`, `subject`, `body`. Make sure to save these values to
the object being constructed inside the constructor function.
* Now we need a place to store the current message draft. Create a variable
  called `messageDraft` and set it equal to a new `Message` object by calling
`Message` constructor style. Drafts always start off blank so it is okay if the
fields start off blank.
* This object will be in scope inside this file, but out of scope outside so we
  will next create the following functions on our `MessageStore` to update it:
  * `updateDraftField` should take two parameters `field` and `value` and set the
      property of `messageDraft` specified in `field` to `value`.
  * `sendDraft` should do the following:
    * Add the current draft to the sent folder by pushing
    `messageDraft` onto the `messages.sent` array.
    * Reset `messageDraft` to a **new** blank message object by calling the
      `Message` constructor.

### `Compose.js`
* Make a new file as you did for the other components.
* Make sure to require the `messageStore` immediately since we know we are going
  to need it.
* As with the other components the `Compose` component will be an object with a
  `render` function and a helper function for doing the work of creating the
complicated DOM structure.
* `render`
  * Create a `<div>` DOM Node that will be returned from this function.
  * Set the class of this node to `new-message` using `className` for styling
    purposes
  * Set the `innerHTML` of this node to the result of calling `this.renderForm`
    which we will return the `html` string of our form.
* `renderForm` - This helper function will build up the HTML for the form.
  * First get the current message draft so we can make sure to render it into
    the form by calling `MessageStore.getMessageDraft()`
  * Next we need to build up an `HTML` string for the form. Use a template
    literal to build up the following elements since template literals handle
multi-line strings
    * A `<p>` with class "new-message-header" and content `New Message`
    * A `<form>` tag with class "compose-form" with the following nested inside
      it:
      * An input tag with the following attributes `placeholder` = `Recipient`, `name` = `to`, `type` = `text`, and `value` = the `to` property of the current draft
      * An input tag with the following attributes `placeholder` = `Subject`, `name` = `subject`, `type` = `text`, and `value` = the `subject` property of the current draft
      * A textarea with the following attributes `name` = `body` and `rows` = `20`.  In order to change the inside of the `<textarea>` to contain the `body` of the current message, you need to put it between the two tags. `<textarea>Here's some text</textarea>`. `<textarea value="Here's some text"></textarea>` will not work.
      * A button with the following attributes `type` = `submit`, `class` = `btn
        btn-primary submit-message` and content `Send`.
    * Return the string at the end of the function
### `main.js`
* Now all we have to do is add a new route for our `Compose` component by adding
  a new `compose` property to `routes` object with a value of the `Compose`
component **Make sure to require the `Compose` component**
* Test that clicking the compose button renders your compose form

### `Compose.js`
Finally we will add the event listeners to our `Compose` function to make it
respond to user actions
* `render`
   * Update the message draft when the form changes
    * Add an event listener to the container `<div>` on a `change` event.
    * This event listener will be called any time one of the fields in the form
      fires a `change` event because the event will propagate up.
    * The handler function receive one argument for the `event`.
    * You can retrieve the element that fired the event by accessing the
      `target` property of the event.
    * This allows you to get the name of the field that changed through the
      `name` property of the `target` element and the value of the field that changed
through the `value` property of the `target` element.
    * Tell the `MessageStore` to update the contents of the message draft to
      match the form by calling `MessageStore.updateDraftField` passing in the
name of the field to change as the first argument and the value of the field to
change as the second argument
    * Test that if you fill out the form and click `Inbox` or `Sent` before 
submitting and then navigate back to compose form, the form is still filled out
  * Send the new message when the form is submitted
    * Add an event listener to the container `<div>` on a `submit` event.
    * This event listener will be called when the `form` fires a `submit` event.
    * The handler function should do the following:
      * Prevent the default behavior of the `submit` event by calling
        `preventDefault()` on the event object.
      * Tell the `MessageStore` to send the current draft by calling
        `MessageStore.sendDraft()`
      * Navigate back to the inbox by changing the hash fragment using
        `location.hash`
    * Test that when you submit the form you are redirected to the `Inbox`
    * Test that your `Sent` folder contains the message you sent
