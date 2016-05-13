In the course, we will primarily be using the JQuery library to make all of our AJAX requests. The reason for this is two-fold:

1. The JQuery that is included in Rails will automatically handle the CSFR token behind the scenes for us.
2. JQuery will automatically transform the JSON (from an JSON API request) to a JavaScript object. If we use vanilla JavaScript, we have to handle this ourselves.

Although we will be relying on JQuery, you may be asked how to make an AJAX request for question during an interview or have to work with a stack that doesn't rely on JQuery. Therefore it is important to know how to make an AJAX request with vanilla JavaScript.

## XMLHttpRequest

The functionality of AJAX is accomplished though something called an XMLHttpRequest object (aka XHR). The steps to make an ajax request are:

1. Create a XHR object
2. Tell it where to go and what verb to use ('Get', 'Post', etc)
3. Tell it what to do when it's finished loading (register a callback)
4. Send off the request (with optional data)

Let's see an example:

```js
//step 1 - create xhr object
var xhr = new XMLHttpRequest();

// step 2 - specify path and verb
xhr.open('POST', 'api/path/to/resource');

// step 3 - register a callback
xhr.onload = function () {
  console.log(xhr.status) // for status info
  console.log(xhr.responseType) //the type of data that was returned
  console.log(xhr.response) //the actual response. For json api calls, this will be a json string
}

// step 4 - send off the request with optional data
var optionalData = { name: "User1", password : "123456" };
xhr.send(optionalData);
```
