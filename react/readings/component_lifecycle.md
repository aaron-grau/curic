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