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
    * Call `activeRoute` to match the current route
    * Insert the result into `this.node` with `appendChild`
  * `activeRoute`
    * Get the hash fragment using `location.hash`
    * Remove the `#` character
    * return the result

#### `main.js`
* Require the `router` constructor function
* In the `DOMContentLoaded` callback
  * Get the `.content` DOM Node with `document.querySelector`
  * Create a new instance of the `router` passing in the `.content` DOM Node
  * Start the `router` with `Router.prototype.start`
* Test that clicking on the sidebar items changes the content of the page AND
  that we are still on a single page that is not making new requests

## Phase II: Inbox Component

### `Inbox.js`

### `main.js`

## Phase III: Sent Component

### `Sent.js`

### `main.js`

## Phase IV: Compose Component

### `Compose.js`

### `main.js`
