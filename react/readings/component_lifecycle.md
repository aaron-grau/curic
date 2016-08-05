# Component Lifecycle Methods

Components sometimes need to call certain functions or run other bits of code at
various points during their lifecycle. For example, a component might need to
fetch new data from the server once it has been mounted to the DOM. Code for
these actions live in a component's **lifecycle methods**.

```javascript

class MyAjaxComponent extends React.Component {
  constructor() {
    super();
    this.state = {items: []};
  }

  componentDidMount() {
    $.ajax({
      url: '/items',
      success: response => this.setState({items: response});
    })
  }

  render() {
    if (this.state.items.length === 0) {
      return (<div>Fetching Items...</div>);
    } else {        
    return (
      <ul>
      {
        this.state.items.map(item => <li>{item}</li>)
      }
      </ul>
      );
    }
  }
};

// `MyAjaxComponent` initially renders as `<div>FetchingItems</div>`.
// After items are received, it renders as `<ul>...</ul>`.

```

In the example above, `MyAjaxComponent` calls `componentDidMount()` once it has
successfully been rendered onto the DOM. `componentDidMount()` sends an
asynchronous request for the information `MyAjaxComponent` needs to display, and
calls `this.setState()` when that information is received, causing a re-
rendering with the updated information.

Check out [the official documentation][lifecycle-methods] for details on other component lifecycle methods that you may need. 

[lifecycle-methods]: https://facebook.github.io/react/docs/component-specs.html
#lifecycle-methods
