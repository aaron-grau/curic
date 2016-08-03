# Component State

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

