#jQuery Lite!

## Overview
Today we will be recreating most of the important functionality of the
jQuery library. jQuery is widely used for making AJAX requests, handling
events, manipulating the DOM, and guaranteeing it works across browsers.

We will implement most of this functionality using the native DOM API
that is built right in to every browser. You will be surprised how
little you actually need jQuery when you finish this project!

## Phase 0: Getting Started

### Create a sandbox HTML document

For testing, make a new HTML document and put some content (a few divs,
links, an unordered list, etc) into the body. We will be testing our
library on this document, so give yourself some elements to experiment
with.

### Webpack

Create a `/lib` folder where we will store all of our files. Create a file in `/lib` 
called, `main.js` and boot up `webpack --watch lib/main.js lib/jquery_lite.js`. 
This output file is what we want to source in the
`<script>` tag of our html file. Go ahead and add that script tag now.

### The core function

* In your entry file, create a new function and add it to the window as `window.$l`.
* The function should take one argument (more on this later).

## Phase 1: DOM Manipulation and Traversal

In this phase we are going to create a class to hold DOM nodes and offer
convenient methods for traversal and manipulation. We will implement
`empty`, `remove`, `attr`, `addClass`, `removeClass`, `html`, `find`,
`children`, and `parent`.

#### `$l(selector)`
* The core function, as we know, recieves one argument. If that argument
  is a string, it is expected to be a `CSS` selector that we can use to
  identify nodes in the page.
* Use [this method][querySelectorAll] to get an *array like* object
  (specifically a `NodeList`) that matches the selector using the native
  JavaScript API.
* Once we have our `NodeList` we want to convert it into an actual
  `Array` so we can pass it as an argument to the class we will define
  next.

Make sure you successfully test your function before moving on! 
Use `window.$l = $l;` to interact with it in the browser console. 
Open `index.html`.

#### `DOMNodeCollection`

* Create a file in `/lib` called `dom_node_collection.js`. We'll define our class here and assign it to `module.exports` in order to use it back in our main file.

* Create a new class, call it `DOMNodeCollection`. It should receive an
**array** of [`HTMLElements`][htmlelement] as its only argument. Store
this array as an instance variable.

* All the methods we implement will be applied to every node in the
  internal array.
* The core function should return an instance of DOMNodeCollection.
* Back in `main.js`, require your DOMNodeCollection file and store it in a variable.

#### `$l(HTMLElement)`
* We are now going to modify the core `$l` function. It will recieve one argument, 
  but let's make it flexible.
* If the argument received is a jQuery object, (i.e. an `instanceof`
  `HTMLElement`), you should put it into an array and return an instance of
  DOMNodeCollection.
* This will allow a HTMLElement native element to be 'wrapped' in jQuery
  lite goodness.
* So: our core function can receive either a single HTMLElement or a
  string with a CSS selector and in either case the return value will be a
  DOMNodeCollection.

#### `DOMNodeCollection.prototype` methods
##### `html`
* Let's write the method `html` first. It can optionally receive a
  string as a parameter.
* If it receives an argument, this will become the `innerHTML` (hint
  hint) of the each of the nodes. If it does **not** receive an
  argument, it should return the `innerHTML` of the **first** node
  in the array.

##### `empty`
* This method clears out all nodes in the internal array. I set the
  `html` of all nodes to an empty string.

##### `append`
* Take a look [here.][append] This method should accept either a jQuery-lite wrapped collection, an HTML element, or a string. Append the `outerHTML` of each element in the argument to the `innerHTML` of each element in the `DOMNodeCollection`. Don't worry about converting strings into HTML elements; just pass them straight through to the elements' `innerHTML`.

##### other methods
* I will leave it up to you to figure out ways to implement `attr`,
  `addClass`, and `removeClass`. All the information for how to change
  nodes is available in [this resource][htmlelement].

#### traversal
##### `children`
* `children` is a method that should return a `DOMNodeCollection` of
  **ALL** children of all nodes in the array.
* Each node in the array will natively have a `children` attribute. Look
  [here][children] for more information.
* Make sure the return value of this method is an instance of
  `DOMNodeCollection`.

##### `parent`
* Return a `DOMNodeCollection` of the `parent`s of each of the nodes

##### `find`
* Returns a `DOMNodeCollection` of all the nodes matching the selector
  passed in as an argument that are descendants of the nodes.
  [This might come in handy][elementqueryselectorall].

##### `remove`
* This should `remove` the html of all the nodes in the array from the DOM
* It should also remove all nodes from the array.

## Phase 2: Event Handling
Now, we are going to add `on` and `off` methods to the
`DOMNodeCollection` prototype. These methods should add and remove event
handlers, respectively. You should find [this resource
helpful][addeventlistener]. Note that this event handler should be
registered for every element in the node array!

Don't worry about event delegation.  In other words, you don't have to handle cases
like:
```javascript
  $("ul").on("click", "li", () => {...})
```

You only have to handle:
```javascript
  $("ul").on("click", () => {...})
```

## Phase 3: Document Ready
```javascript
$( () => alert('the document is ready'));
//$(document).ready(someCallback); would have the same effect
```

The above snippet of code should look quite familiar. Its function is to
pop up a helpful alert when the HTML has finished rendering; when the
`document` is `ready`.

For this phase of the project we will be adding this functionality to
our core `$l` function. We will need to change the code inside of our
main function, the one we used to create an instance of
`DomNodeCollection`.

* Change the `$l` function so that if it receives a function, it will push
  that function into an array (queue) of functions to be executed when the document is ready.
  - If the document is already ready, trigger the function immediately.
* See if you can find a way (using your Google skillz) to check if the
  document is ready using Vanilla JavaScript. There are some VERY simple
  solutions.
* Once the document has become ready, trigger all your callbacks!

## Phase 4: AJAX
### `$l.extend`
Let's implement a super simple function to merge JavaScript objects. The
arguments will be two or more objects.

For example:

```javascript
const objA = {a: 'a', b: 'a', c: 'a'};
const objB = {b: 'b', c: 'b'};
const objC = {c: 'c'};
$l.extend(objA, objB, objC); //=> {a: 'a', b: 'b', c: 'c'}
objA //=> {a: 'a', b: 'b', c: 'c'}
```
### `$l.ajax`

* Add an `ajax` function to the `$l` function object. It should receive
  one options object argument.  
* It will help to know what you expect the behavior to be.
  * Reference a [sample ajax request][sample-ajax-request] to know what your inputs are and when you expect functions to run.  
  * Test out your `$l.ajax` code using the same endpoint as the sample request.
* Make a `defaults` object. Check [the jQuery `ajax` API document][jquery_ajax]
  to get a sense of what the defaults should be. Provide defaults for
`success`, `error`, `url`, `method`, `data`,  and `contentType`.
* Merge the `options` onto the `defaults`
* Review [this reading][vanilla_ajax] to learn how
  to implement an AJAX request using the native JavaScript API. It's
  actually quite easy!
* Using the options supplied by the user, make the request. Be sure to
  deliver the proper response to the success/error callback.  This response
  should be an object (use JSON.parse) and not a string.

## SUPER Bonus Phase (do this after the rest of the day's exercises)
* Have your `ajax` function return a `Promise`
* Use a [`Promise`][promise-reading] to pretty up the usage of your AJAX
  function. [Read about promise usage here][promise_doc].

[append]: http://api.jquery.com/append/
[promise-reading]: ../../readings/promises.md
[promise_doc]: http://www.2ality.com/2014/09/es6-promises-foundations.html
[htmlelement]: https://developer.mozilla.org/en-US/docs/Web/API/element
[children]: https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/children
[elementqueryselectorall]: https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelectorAll
[queryselectorall]: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
[addeventlistener]: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
[sample-ajax-request]: ../../readings/simple-ajax-example.md
[jquery_ajax]: http://api.jquery.com/jquery.ajax/
[vanilla_ajax]: ../../readings/vanilla_ajax.md
