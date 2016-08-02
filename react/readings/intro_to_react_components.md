# Introduction to React Components

## What are Components?

React Components are the building blocks of a React view-layer. They are Javascript functions that return HTML to be rendered onto a document. Because they are typically written in JSX (more on that later), components often look like HTML dropped into a Javascript file. 

## A Simple Example

Open [this example][simple_component] in another tab and read along below. 

Start with `index.html`. It's a normal HTML document that contains a <div id='root'/>. This `#root` element will serve as the hook onto which we insert our React component. Don't worry about the script tags for now.

Now, take a look at `index.js`. Look at `React.createClass()` and `ReactDOM.render()`. These two functions allow you to create components and render them onto the DOM, respectively.



## Dependencies

In order to create React components, you will need to require the `react` and `react-dom` packages from `npm`. 





## How are Components used?

## 

Components are the fundamental packages of React logic. 


Their most
important duty is their `render` method, which should aways return a
tree of React elements that reflects the values of their `state` and
`props`.

## Props

`props` is one of the main instance variables available inside a
component. It is, essentially, the properties of the component. For
example: if we had a `Dog` component, it might have `this.props.breed`
and `this.props.name`. When it comes time to `render` this dog, the
values of these properties would be included in the element tree.

```javascript
const Dog = React.createClass({
  render () {
    return (
      <div>Name: {this.props.name}, Breed: {this.props.breed}</div>
    );
  }
});
```
### Where do props come from?

`props` are assigned when instances of the component are created. Using
JSX, `props` are assigned like this:

```javascript
<Dog name='fido' breed='greyhound'></Dog>
```

The instance of `Dog` created was passed `name` and `breed` properties,
which can be read using `this.props.breed` and `this.props.name`.

### But what if the props change?

If the props have changed, there should have been something higher up
the tree that caused a re-render that included this component. It is not
the duty of the component to detect changes to its `props`.

## State

The second key piece that determines the output of a component's
`render` is its `state`. **Most components don't need state**, the
output of their `render`, should instead be a function of their `props`.

If a component has event handlers that can change a value, that value is
probably `state`. For example, if a component has an `input` who's value
is controlled, that value is most likely part of the component's
`state`. This is demonstrated below.

**NB: using `this.setState` will cause the component to re-render.**

```javascript
const Input = React.createClass({
  getInitialState () {
    return ({word: ""});
  },
  handleChange (event) {
    this.setState({word: event.currentTarget.value});
  },
  render () {
    return (
      <div>
        <input onChange={this.handleChange} value={this.state.word}/>
        The word is: {this.state.word}
      </div>
    );
  }
});
```

In this example we have an initial state of `{word: ""}`. There is an
event handler that can change this value. This is a perfect candidate
for state.

### What isn't state?

* values that are derived from properties
* other React components
* pieces of data from `props`

## Events

Event handling in the React world is very convenient and easy. Have a
second look at the `input` example above. We have registered an event
`onChange` of the `input`. We did this by passing in a prop with the
key `onChange`. The value for this must be a callback that will be
executed when the event occurs. Every event I can think of is supported.
A comprehensive list is [available here][react-events].

## Lifecycle Methods

Often, we want to do something once a component has successfully been
mounted in the DOM or when it is about to be removed.
Luckily there is a handy callback we can harness to
run our code at this time.

```javascript
const MyAjaxComponent = React.createClass({
  getInitialState () {
    return {items: []};
  },
  componentDidMount () {
    const that = this;
    $.ajax({
      url: "/items",
      success: function(response){
        that.setState({items: response});
      }
    });
  },
  render: //...
});
```

Above, we use the `componentDidMount` method to fire our AJAX request.
This method is invoked when the component has been rendered into the
DOM. There are several more [_lifecycle_ methods][lifecycle-methods]
available to React programmers:

* componentWillMount
* componentDidMount
* componentWillReceiveProps
* shouldComponentUpdate
* componentWillUpdate
* componentDidUpdate
* componentWillUnmount


[react-events]: http://facebook.github.io/react/docs/events.html
[lifecycle-methods]: http://facebook.github.io/react/docs/component-specs.html#lifecycle-methods

## Mixins

The concept of a mixin in the world of React is quite similiar to a
`module` in Ruby. It allows us to share groups of functions between
components. We can even include lifecycle methods in our mixins! We can
even include multiple mixins in one component. This functionality is
essential for keeping our code DRY.

Creating a mixin is quite simple. All one needs to do is create a plain
old JavaScript object where the values are functions. To _mix in_ the
mixin, include a key of `mixins` and a value of an array of all the
mixins you would like to include in your component.

I would come up with a great example, but the good folks at Facebook
have provided a [fantastic one for me][mixins].

[mixins]: http://facebook.github.io/react/docs/reusable-components.html#mixins



[simple_component]: ../demos/simple_component
