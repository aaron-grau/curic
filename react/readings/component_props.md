# Props and State

React components keep track of data via two important instance variables: `this.props` and `this.state`. Both are objects representing

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

# State

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


