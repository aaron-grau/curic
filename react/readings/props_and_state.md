# Props and State

React components keep track of data via two important instance variables: `this.props` and `this.state`. Both are objects representing data that the component needs in order to render.

## Props

Props are properties of a component that are assigned at the time of
initialization.

```js
<Dog name='fido' breed='greyhound'></Dog>

```

`this.props` are then accessible in a component's instance methods.

```js
class Dog extends React.component {
  render () {
    return (
      <div>Name: {this.props.name}, Breed: {this.props.breed}</div>
    );
  }
};

```

In the example above, a new instance of `Dog` is passed `name` and `breed`
properties, which can be read inside the component as `this.props.breed` and
`this.props.name`.

### Immutability of Props

`props` are immutable, i.e., they cannot be changed by a component itself. However, a component can receive new props if its parent re-renders. In that case, the component will re-render with the new props it received from the parent.

# State

Unlike props, `this.state` represents the properties of a component that can
change over the course of its life-cycle.

Although a component's state can be defined at initialization, it may also reset its own state at various points using `this.setState()`. Every time `this.setState()` is called, the component is re-rendered with the new state.

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


