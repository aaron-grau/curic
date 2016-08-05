# React SyntheticEvents (a.k.a. Event Handlers)

SyntheticEvents are the React equivalent of the vanilla DOM's
`addEventListener()`. Using SyntheticEvents, you can pass event listeners
directly to your components via props.

```js
handleClick = event => {
	event.preventDefault();
	alert("clicked!")
};

<input type="submit" onClick={handleClick}>Click Me! </input>
```

Whenever the above component is clicked, it will call `handleClick()` before
doing any of the normal things a submit button would do (like issue a POST
request). The click `event`, which represents the vanilla DOM event, is passed
in. By calling `event.preventDefault()`, we are disabling the button from trying
to submit as it normally would. Most of your event handlers will
`preventDefault()`, since you almost always want to halt the normal HTTP request
and dispatch an asynchronous javascript request instead.

A complete list of SyntheticEvents is [available here][react-events].
