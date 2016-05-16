# Mixins

## What is a Mixin?

A mixin is a way to share common functionality across different components. They keep your components DRY and maintainable.

Mixins are POJOs that define some functionality. Take this example mixin that defines a super log function.

```javascript
var ExampleMixin = {
  superLog: function(string){
    console.log.(string);
    console.log(string + "!");
    console.log(string + "!!");
    console.log(string + "!!!");
    console.log(string.toUpperCase() + "!!!");
  }
}
```

In order for several of our React components to be able to use this function, all we have to do is include our mixin in the `mixins` array when we define our component.

```javascript
var Component1 = React.createClass({
  mixins: [ExampleMixin],

  handleClick: function(){
    this.superLog("You clicked me");
  }

  render: function(){
    <button onclick={this.handleClick}>
      Click Me
    </button>
  }
});

/***********************************/

var Component2 = React.createClass({
  mixins: [ExampleMixin],

  getInitialState: function(){
    return { text: "" };
  },

  handleChange: function(e){
    this.superLog(e.target.value);
    this.setState({ text: e.target.value });
  },

  render: function(){
    <input value={this.state.text}
           onChange={this.handleChange}/>
  }
});
```

## When should I use Mixins?

1. When you have the same functionality occurring in various components, you should create a Mixin that defines that functionality and include it in the components' `mixins` array.

2. When you have a single component rendering itself in *substantially* different ways based on something like a route. Instead, just create different components for rendering and put all of their common functionality in a mixin.

## Useful Mixins

1. ReactRouter.History
  * Add the `history` object to a component's `props`. Useful if a non-Route component needs to push state.

2. React.addons.LinkedStateMixin
  * Automatic binding between input fields and component state. Save a lot of time and makes code a lot DRYer. A must-use for large forms. For more info, see the [docs.](https://facebook.github.io/react/docs/two-way-binding-helpers.html#reactlink-before-and-after)
