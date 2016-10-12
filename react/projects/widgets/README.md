# React Widgets

[**Live Demo!**](https://appacademy.github.io/curriculum/widgets/)

As an introduction to React, we're going to build some simple
interactive widgets. Before we get started, however, we need to set up
our project with `npm`.

Build a new React NPM project from scratch like you did in the  
['Getting Started'][getting_started] homework, but change your
webpack entry point to be `widgets.jsx`.

Your `widgets.jsx` should look have `DOMContentLoaded` listener that calls
`ReactDOM.render()` with a `Root` component and a `main` DOM element as the
hook.

Note: we won't be using `jQuery` for this project. If you're not sure
how to do something without it, use Google as a resource and ask a TA
if needed.

[getting_started]: ../../homeworks/getting_started

## Running a Simple Server

For this project, we're going to use a lightweight HTTP server that we
can get using `npm`. In your project directory, run the following
command to install the package on your machine:

```
npm install -g http-server
```

We can now load the server by simply running `http-server`. Do this in
another terminal tab, then navigate to `http://localhost:8080` and
ensure you can still see your `Widgets` component.

**Tricky Bug**: If you change your javascript code and the sourcemap doesn't change in the browser, check out [this stackoverflow][sourcemap-cache-fail].

[sourcemap-cache-fail]: http://stackoverflow.com/questions/15505311/how-to-get-chrome-to-reload-source-maps

## Tabs

### Goal

Make a `Tabs` component. `Root` should pass `Tabs` an array of Javascript
objects (the data for the tabs) that have `title` and `content` as keys. Display
all the titles, but have the selected title in **bold** font. Below, it should
display only the contents of the selected tab. The content pane should update
when the user selects different headers.

### Steps

* Keep track of the selected tab's index in your `Tabs` component's
  state. Set it initially to zero.

* In the render method of `Tabs`, render a collection of `<h1>`s (with titles) in a `<ul>` and the content of the selected tab in an `<article>`.

* Consider creating a `Header` subcomponent.

* Add a click handler to each header that updates the selected index in
  the `Tabs` component.

* Remember that JSX interpolation is just syntactic sugar for passing an
  argument to a function, which means that it only supports
  _expressions_, so you can't use `if`/`else` inside `{ }`. (This is
  also why you can't end with a semicolon.)

* Create an `index.css` file and add it to the head of your `index.html`
  file. Remember to include your CSS resets.

* Add a border around each tab header and the whole section. Use
  `border-radius` to add nicely curved corners to the top of your tabs.

* Use a flexbox to ensure that the tabs all take up the same amount of
  space. Add `display: flex` to your CSS for your tab headers.

* Center the tab content, both horizontally and vertically.

* Add a hover effect to change the background color of the tab that's
  being moused over. Change the `cursor` to be a `pointer` when you're
  mousing over the tabs to make it clear that the tabs are interactive.

* Add a background. Use the `background-image` or `background-color`
  property to change the background. Feel free to do this for every widget.

## Weather Clock

### Goal

Make a weather clock. This should have two components. One should
display the current time, updating every second. The second should
display the current weather based on the user's location.

You'll use the `navigator.geolocation` API to get the user's current
location,  and the [open weather API][weather] to get the current
weather.

### Steps

#### Clock Widget

* Set the initial state of your clock using `new Date()`.

* You'll need to `setInterval` to ensure that the clock updates, but you
  should wait until the component is actually on the page. For this, you
  can define a [`componentDidMount`][componentDidMount] function.

* Be sure to [store that interval's id][clearInterval] so you can cancel
  it in [`componentWillUnmount`][componentWillUnmount], which gets
  called just before the component is removed. Don't store this in the
  component's `state` since it doesn't affect the UI. Instead, just
  store it directly on `this`.

* Use the `toDateString()` method on your date object to render your clock.

* Go to [Google Fonts][google-fonts] and select a nice font for your
  clock. Take the font embed code and paste it into the `<head>` of your HTML page. Your `<head>` should look something like this right now:

  ```html
  <head>
    <title>React Widgets</title>
    <link rel="stylesheet" href="index.css"/>
    <link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
    <script src="bundle.js"></script>
  </head>
  ```

  To use the font, set the `font-family` of your element to the font name.

  * Set the time and date headers to be on one side and the actual time
    and date to the other. Refer to the live demo to see what your end
    goal is. You can achieve this easily with a flexbox. Take a look at
    the [`justify-content`][justify-content] property. Which one do you
    want to use? Try all of them to understand what they do.

[justify-content]: https://css-tricks.com/almanac/properties/j/justify-content/
[google-fonts]: https://fonts.google.com/

#### Weather Widget

* Review the [open weather API][weather] documentation. We'll use this
  API to get the weather based on our current location

  - In order to get the API to accept your HTTP requests, you'll need
    an API key. [Read up on how to use the API key and sign up for one here.][api-key] After signing up, click on the API keys tab to get your key.

    **NB:** In the real world, you should be very careful about placing
    API keys in frontend JavaScript or anywhere else they are publicly
    available and can be scraped (this includes public Git repos).
    Stolen keys can cost you. _You have been warned._

* To get your current location, add a call to `navigator.geolocation`
  when the component mounts. Read through the [documentation][navigator]
  to figure out how to get your current position. (Make sure you have
  [location services enabled][location-services] in your browser, or
  this won't work.)

* When the location is received, query the weather API using a raw
  `XMLHttpRequest`.

  - See [here][vanilla-ajax] and [here][nojquery] if you need help.
    For more in-depth details, look [here][xmlhttpdocs]

  - Common pitfall: You need to include `http://` in your request URI

  - Hint: pass a callback to your location query

* Render the current weather and temperature on the page.

* Give the weather box a nice border and make sure the elements inside are
  spaced evenly.

[api-key]: http://openweathermap.org/appid
[clearInterval]: http://stackoverflow.com/questions/5978519/setinterval-and-how-to-use-clearinterval#answer-5978560
[componentDidMount]: https://facebook.github.io/react/docs/component-specs.html#mounting-componentdidmount
[componentWillUnmount]: https://facebook.github.io/react/docs/component-specs.html#unmounting-componentwillunmount
[nojquery]: http://youmightnotneedjquery.com/#request
[xmlhttpdocs]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[navigator]: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation
[location-services]: https://support.google.com/chrome/answer/142065?hl=en
[weather]: http://openweathermap.org/current
[vanilla-ajax]: http://stackoverflow.com/questions/8567114/how-to-make-an-ajax-call-without-jquery

## Autocomplete Input

### Goal

Make an `Autocomplete` component that filters a list of names by the
user's input. Match only names that start with the search input. When
a user clicks on a name, the input field should autocomplete to that
name.

### Steps

* Start by creating a new file `autocomplete.jsx` and defining your
  `Autocomplete` class there. You will require this class from
  `widgets.jsx` and incorporate it into `Root#render`. This is the
  pattern you will follow for all the widgets.

* Because your `Autocomplete` widget should be reusable, it mustn't
  define its own list of names. Instead create a list of names in
  `widgets.jsx` and pass them into `Autocomplete` as a prop.

* Build your widget in the `render` method.

  - Create a [semantic][html5-flowchart] root element.

  - It should contain an input field and an unordered list.

  - Create an `<li>` inside the `<ul>` for every name that begins with
    the value in the input box.

  - You'll need to pass a [unique `key` property][react-keys] to each
    `<li>` or React will grumble to all your console-reading users about
    its unfair working conditions. "How is one supposed to efficiently
    diff the DOM when one doesn't even know which list items match up
    with which!?"

* Set your initial state as an empty string using `getInitialState`.

* When a user types something into the input, use an event handler to
  update the widget's state. Remember, no jQuery!

* Add a click handler to the `<li>`s you've created for each name using
  onClick. In the click handler, use `setState` to update the widget's
  search string. You will need to turn your `<input>` into a [controlled
  compenent][controlled-component-docs] for this to work.

* Give your component a border and make sure all the `<li>`s are nicely
  padded inside the box. Change the `cursor` property to display a
  pointer when hovering over one of the `<li>`s.

* Center all your widgets using flexboxes. Which `justify-content` property
  would you use for this?

### Bonus: React-Transitions

Right now, the matched names instantly appear on the screen and the filtered names instantly disappear. This is abrupt and ugly. We want the names to fade out or in when they are entering or leaving the page. How can we achieve that with React? With the [ReactCSSTransitionGroup][react-transitions]!

* First we need to import the `ReactCSSTransitionGroup` module into our project. In the console, run `npm install --save react-addons-css-transition-group`.

* Then you need to require the module in the file. At the top of `autocomplete.jsx`, write `const ReactCSSTransitionGroup = require('react-addons-css-transition-group');`.

* In your `render` method, you will need to wrap the group of elements that will be entering and leaving the screen with the `<ReactCSSTransitionGroup>` element. In the case of the autocomplete widget, those are the `<li>`. **You are not wrapping each individual `li`, but rather the entire group.**

* `<ReactCSSTransitionGroup>` has three necessary attributes. Read what they are below and make sure to include them:
  - `transitionName` - This is the name that's used to create all of the transition classes. I set this equal to `"auto"`, but you can pick any name you like.
  - `transitionEnterTimeout` - Specifies how long (in ms) the transition should last when the element enters the page. This needs to be a number, so you'll have to interpolate the javascript number, otherwise it'll be read as a string. (i.e `{500}` instead of `500`).
  - `transitionLeaveTimeout` - Same as above, except for when an element is leaving the page.

* Finally the css. Create a new css file and paste in the code below.
  - Be sure to make a `link` tag in your `index.html` page so the transitions are applied.
  - The css below assumes you've given the `transitionName` attribute to `auto`. If you gave it a different name, just replace every `auto` with the name you gave.

```css
/* AutoComplete */

 .auto-enter {
   opacity: 0.01;
   transform: translateY(500%);
 }

 .auto-enter.auto-enter-active {
   opacity: 1;
   transform: translateY(0);
   transition: opacity 500ms, transform 500ms;
 }

 .auto-leave {
   opacity: 1;
   transform: translateY(0);
 }

 .auto-leave.auto-leave-active {
   opacity: 0.01;
   transform: translateY(500%);
   transition: opacity 500ms, transform 500ms;
 }
```

* Go play with the widget. You'll notice that when names appear, they fade in from the bottom. When they leave, they fade out and fall to the bottom. Let's break down the css file:
  - `.[transitionName]-enter` - Specifies the initial state of an element that is entering the page. Since I want the names to start invisible and at the bottom, I've given it the `opacity` and `transform` properties the appropriate values.
  - `.[transitionName]-enter.[transitionName]-enter-active` - Specifies the final state of an element that has entered the screen. Looking at the css, we can see that I expect the element to be completely opaque and in it's original y-position when it is done entering. This is where you also specify the `transition` property.
  - `.[transitionName]-leave` - Specifies the initial state of an element that is leaving the page. In almost all cases, the values of this class with match the values in the `[transitionName]-enter.[transitionName]-enter-active` class.
  - `.[transitionName]-leave.[transitionName]-leave-active` - Specifies the final state of an element that has left the screen. This is where you also specify the `transition` property.

* Now play around with the css file. What kind of interesting transitions can you create?


[react-transitions]: https://facebook.github.io/react/docs/animation.html
[html5-flowchart]: http://html5doctor.com/downloads/h5d-sectioning-flowchart.pdf
[react-keys]: https://facebook.github.io/react/docs/reconciliation.html#list-wise-diff
[controlled-component-docs]: https://facebook.github.io/react/docs/forms.html#controlled-components
