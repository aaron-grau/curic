# My First Component

### Getting the library from a CDN

Start by requiring the React and ReactDOM libraries using the following 
script tags:
```javascript
<script src="https://fb.me/react-0.14.2.js"></script>
<script src="https://fb.me/react-dom-0.14.2.js"></script>
```
Put this in the document `<head>`. Now, every time we load this page,
before evaluating the body, the browser will download the file pointed
to by the script tag. Therefore: we should be able to use the react
components immediately in the body. 

*NB:* This is great for getting up and running quickly, but once we 
start using JSX, we're going to use Node Package Manager instead of 
CDNs to get these libraries.

### Make a space for it in the body

In the `body`, make an empty div and give it the `id` of `my-component`.
All of our React stuff will go into this div. We give it an id so that
we can easily find it later.

### Render with React and ReactDOM

Make a script tag beneath your empty div. Inside the script tag add the
following:

```javascript
ReactDOM.render(
    React.createElement('div', {}, 'Hello from React!'),
    document.getElementById('my-component')
);
```

Refresh your browser, you should see the div where it belongs! 

### What's going on?

We are using two of React's core methods:
[`React#createElement`][createElement-doc] and
[`ReactDOM#render`][render-doc].
The `document.getElementById` bit returns a reference to the DOM node 
we created. Did you know you can get these without jQuery?

Please read both links in the paragraph above. See? React isn't so
scary!

What's the difference between `React` and `ReactDOM`? They're in
charge of different pieces of logic in the React world. At a basic
level, the `React` library helps us create custom components and
describe how they should be rendered, and the `ReactDOM` library
helps us actually put them in the DOM.

When we `ReactDOM.render` something, it creates a version in React's
virtual DOM. Then, React compares its virtual DOM with the real DOM
and makes incredibly quick and efficient changes. In traditional JS
front end frameworks, we are blowing up DOM elements and creating new
ones. React does a much faster job with its 'virtual DOM'.

React's `createElement` method creates an instance of a React element.
This is NOT a DOM element. It is closer to a POJO than a DOM node, so
don't even think about trying to jQuery it into the DOM. The first
argument is the type of element/component that React will create. This
can be either a string, like `'div'` or a reference to a component
created using `React.createClass`. The second argument to
`createElement` is the properties that will be passed to that
component. As an argument, `{className: 'my-div'}` will give the
component a `class` of `my-div` when it is rendered in to the DOM. We
can also use props to set event handlers. `{onClick: myCallback}`,
will cause `myCallback` to be triggered when a click event occurs.

`createElement` also takes an optional third argument. This is the
_children_ of the component. It can be empty, or contain other React
components, or contain strings.

[render-doc]: http://facebook.github.io/react/docs/top-level-api.html#reactdom
[createElement-doc]: http://facebook.github.io/react/docs/top-level-api.html#react.createelement

### Take it to the next level

In this section, let's make a more interactive component. Let's put a
button into the div. When the button is clicked, let's increment a
counter. We will put the value of that counter into a `span`.

Since we are describing a component that has behavior and state it makes
sense to use a class, right? Indeed. React provides a helpful
[`createClass`][create-class] method for this purpose.

```javascript
var ClickCounter = React.createClass({
  render: function(){
    return (
    React.createElement('div', {}, 
      React.createElement(
        'button', 
        {},
        "CLICK ME"
      )
    )
   );
  } 
});
```

So here is an early version of our fancy new React component. All it
contains is a `div` holding a `button` html element. The button element
is passed no properties.

On its own, this component will not make its way into React's virtual
DOM or the actual DOM. We need to use `ReactDOM.render` to get it in.

```javascript
ReactDOM.render(
  React.createElement(ClickCounter, {}, ""),
  document.getElementById('my-component')
);
```

The snippet above is what we need to get the button into the DOMs. As we
discussed above, the first argument to `createElement` can be either a
string with an html tag name or an existing React `class`. Try this and
make sure it works.

[create-class]: http://facebook.github.io/react/docs/top-level-api.html#react.createclass

### Giving our component state

So we want this component to keep track of how many times the button has
been clicked. Therefore, the initial state should be a count of 0. We
can write a `getInitialState` method to define this.

```javascript
var ClickCounter = React.createClass({
  getInitialState: function(){
    return {count: 0};
  },
  render: function(){
    return (
      React.createElement('div', {}, 
        React.createElement(
          'button', 
          {},
          "CLICK ME"
        ),
        React.createElement('span', {}, this.state.count)
      )
    );
  } 
});
```

`getInitialState` seen above defines the initial state. This is used in
the components' render method. The object returned from `getInitialState` 
will become the `this.state` object. We can define as many key/value 
pairs in our initial state object as we want, but here we only need one.
We can modify this `state` object throughout the lifecycle of the 
component using `this.setState`. `render` dictates how the component 
should appear on the page. This is not the same method as 
`ReactDOM.render`. Every React component must implement a `render` method.

### Clicky clicky

Finally, we need to set up a `click` event that will update the
component's state and induce a re-render. To install a click event 
handler on a component, give it an `onClick` property in the `render` 
method. The value for `onClick` should be a function.

When the button is clicked we can use 
`this.setState({count: this.state.count + 1})` to update the state. This
has the side effect of *automatically* re-rendering the component. So,
we should just see it update before our very eyes!

```javascript
var ClickCounter = React.createClass({
  getInitialState: function(){
    return {count: 0};
  },
  click: function(event){
    event.preventDefault();
    this.setState({count: this.state.count + 1});
  },
  render: function(){
    return (
    React.createElement('div', {}, 
      React.createElement(
        'button', 
        { onClick: this.click },
        "CLICK ME"
      ),
      React.createElement('span', {}, this.state.count)
    )
   );
  } 
});
```

Now you've made your very first interactive component. Wasn't that
fun?
