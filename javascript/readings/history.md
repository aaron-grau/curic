# History & Location

## History

`History` is a web api that allows us to manipulate the browser's session history. We can think of the session history as the stack of URLs that a user has visited within a given tab. In client-side javascript, we can access the History object by calling `window.history`.

The history interface provides us with a number of methods for manipulating the session history. A few useful methods are `window.history.back()` and `window.history.forward()`. These methods pop and push items onto the session history stack respectively. For more methods, see the [MDN history documentation][mdn-history].

[mdn-history]: https://developer.mozilla.org/en-US/docs/Web/API/History
