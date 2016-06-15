## Why not JQuery?

In the course, we will primarily be using the JQuery library to make all of our AJAX requests. The reasons for this are:

1. The version of JQuery that is included in Rails will automatically handle CSRF tokens for us.
2. JQuery will automatically transform JSON (which is a string) into JavaScript objects. If we use XHR (the vanilla-DOM way), we have to handle this ourselves.
3.  JQuery's API is much more user-friendly than XHR.

Although we will be relying on JQuery, you may be asked about non-JQuery AJAX requests in interviews or end up working with a stack that doesn't rely on JQuery. Therefore it is important to know how to use vanilla DOM.

## XMLHttpRequest

The functionality of AJAX is accomplished though something called an XMLHttpRequest object (aka **XHR**). The steps to make an XHR request are:

1. Create a XHR object.
2. Tell it where to go and what verb to use ('Get', 'Post', etc).
3. Tell it what to do when it's finished loading (register a callback).
4. Send off the request (with optional data).

Let's see an example:

```js
//step 1 - create xhr object
const xhr = new XMLHttpRequest();

// step 2 - specify path and verb
xhr.open('POST', 'api/path/to/resource');

// step 3 - register a callback
xhr.onload = function () {
  console.log(xhr.status) // for status info
  console.log(xhr.responseType) //the type of data that was returned
  console.log(xhr.response) //the actual response. For json api calls, this will be a json string
}

// step 4 - send off the request with optional data
const optionalData = { name: "User1", password : "123456" };
xhr.send(optionalData);
```

Check out the [MDN Documentation][xhr-docs] for more information.

[xhr-docs]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
