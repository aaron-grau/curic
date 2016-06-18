# Modals

Checkout the [screencast][screencast] for a live demo!

Modals are used to interrupt the normal flow of interactivity on your website and bring special attention to:

* **Errors / warnings**
  * Form validation errors
* **Information requests**
  * Sign in / sign up
  * Verify credit card
* **Confirmations**
  * Confirm purchase of ...?
  * Are you sure you want to leave our mailing list?

## Modal Design Features

Modals *should*...

1. be triggered on some user action
2. prevent the user from interacting with with the original web page
3. dim or blur the background
4. require a specific, obvious action to return to the normal page

[Check out some examples][modal_examples]

------------------

# Modals in React

React has a lovely library we can use when building modals. It takes care of a lot of the boiler-plate functionality for us.

### Setup

First, let's `npm install --save react-modal`

Then, let's require the library in the file we use the modal in.

```javascript
  var Modal = require("react-modal");
```

Finally, we have to tell the modal what content to disable when the modal is open. Let's disable everything by setting it to the body tag:

```javascript
document.addEventListener("DOMContentLoaded", function(){
  var container = document.getElementById("root");
  Modal.setAppElement(document.body); // Add this line
  ReactDOM.render(<App/>, container);
});
```

### Let's Build a Modal

We can instantiate a modal like any other react component using: `<Modal/>`. The Modal component accepts up to 5 props:

* `isOpen` --> boolean --> toggels showing/hiding the modal
* `onRequestClose` --> function --> fn to call when exiting modal
* `afterOpenModal` --> function --> fn to call after opening modal
* `closeTimeoutMS` --> number --> # of ms to delay before closing modal
* `style` --> POJO --> objecting containing styling info

#### Simple Example

```javascript
var App = React.createClass({
  getInitialState: function(){
    return({ modalOpen: false });
  },
  closeModal: function(){
    this.setState({ modalOpen: false })
  },
  openModal: function(){
    this.setState({ modalOpen: true })
  },
  render: function(){
    return(
      <button onClick={this.openModal}>Open Me!</button>

      <Modal
        isOpen={this.state.modalOpen}
        onRequestClose={this.closeModal}>

          <h2>Im a modal!</h2>
          <p>modal modal modal modal modal</p>
          <p>mooooooooodal!</p>

      </Modal>
    );
  }
});
```

#### The Style Object

The style object passed as a prop to the `<Modal/>` component must contain two keys:

* overlay --> styling for the "screen" behind the modal
* content --> styling for the modal container

An example might look like:

```javascript
var style = {
  overlay : {
    position        : 'fixed',
    top             : 0,
    left            : 0,
    right           : 0,
    bottom          : 0,
    backgroundColor : 'rgba(255, 255, 255, 0.75)',
    z-index         : 10
  },
  content : {
    position        : 'fixed',
    top             : '100px',
    left            : '150px',
    right           : '150px',
    bottom          : '100px',
    border          : '1px solid #ccc',
    padding         : '20px',
    z-index         : 11
  }
}
```

Note that this is somewhat of an *antipatern* we're creating a js object that contains styling information, instead of creating a modal.css file and including our styling there. The problem with the later is we don't necessarily know what react is going to call it's overlay and container elements, so the selectors we choose to use may be fragile. I'll let you choose which type of styling to use.

---------

# Other Resources
* [npm][npm_example]
* [react's github][react_example]


[modal_examples]: http://ui-patterns.com/users/1/collections/modal-windows/screenshots/16780

[npm_example]: https://www.npmjs.com/package/react-modal

[screencast]: https://vimeo.com/164336429

[react_example]: https://github.com/reactjs/react-modal
