# Component Declaration

There are several ways to declare a component in React.

## Inheriting from `React.Component`

A component can be defined as a JS class that [`extends`][extends]
`React.Component`. This declaration style gives you the most
functionality because it allows you to set component state and use
lifecycle methods. It also requires more boilerplate code, so you should
prefer functional components when you don't need the extra power.

```jsx
class List extends React.Component {
  constructor() {
    super();
    this.state = { items: [] };
  }

  componentDidMount() {
  // this method is called after the component is rendered onto the DOM
  // and fetches items from the API to be rendered as a list
    $.ajax({
      url: '/items',
      success: items => this.setState(items: items);
    });
  }

  render() {
    return (
      <h1>{this.props.title}</h1>
      <ul>
      {
        this.state.items.map(item =>(<li>{item}</li>))
      }
      </ul>
    );
  }
}
```

[extends]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends

## `React.createClass()`

You may see this syntax out in the wild, since it was the most common
ways to declare components prior to the introduction of functional
components and ES6 class inheritance. This method allows you to do the
same things as inheriting from `React.Component`.

```jsx
const List = React.createClass({

  getInitialState() {
    return { items: [] };
  },

  componentDidMount() {
    $.ajax({
      url: '/items',
      success: items => this.setState(items: items);
    });
  },

  render() {
    return (
      <h1>{this.props.title}</h1>
      <ul>
      {
        this.state.items.map(item => <li>{item}</li>)
      }
      </ul>
    );
  }
});
```

**NB**: Though you will probably encounter code using
`React.createClass` and should know what it does, you should not use it
because it will mostly likely be deprecated soon.

## Purely Functional Components

Purely functional components are the simplest,
but least versatile, way to declare a component. If a component has no
state and needs no lifecycle hooks, it can be written as a pure function
that accepts a `props` parameter and acts as the component's `render`
method.

**NB**: A *pure function* is a function whose output is solely
determined by its input and that has no side effects.

Here is an example:

```jsx
const Message = (props) => {
  return <div>{props.text}</div>
};
```

This is equivalent to
```jsx
class Message extends React.Component {
  render() {
    return (
      <div>{this.props.text}</div>
    );
  }
};
```

We can further simplify `Message` by using object de-structuring. Prefer
this syntax:

```jsx
const Message = ({ text }) => (
  <div>{text}</div>
);
```

Functional components are the most common type of component that you
will see in Redux applications, which you will learn more about later
this week.
