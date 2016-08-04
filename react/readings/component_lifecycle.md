# Component Lifecycle

Components oftentimes need to dispatch methods or run other bits of code at
certain points during their lifecycle. For example, a component might need to
fetch data from the server once it has been mounted to the DOM. Code for these
actions live in a components **lifecycle methods**.

```javascript

class MyAjaxComponent extends React.Component {
  constructor() {
    this.state = {items: []};
    super();
  }
  componentDidMount() {
    $.ajax({
      url: '/items',
      success: response => this.setState({items: response});
    })
  }
  render() {
    ...
  }
};

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