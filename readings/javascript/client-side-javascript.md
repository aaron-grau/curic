# Client-side JavaScript

We've written JavaScript source files for Node.js, but we want to start
writing JavaScript for the browser to execute.

Let's start with how to instruct a browser to load and execute JS code:

```html
<!-- index.html -->
<html>
  <head>
    <title>A page for you!</title>
  </head>

  <body>
    <div id="content"></div>

    <!-- first load the jQuery library hosted by Google -->
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.2.3/jquery.js"></script>

    <script>alert("This is inline code!");</script>

    <!-- then load our own app.js code -->
    <script type="application/javascript" src="./app.js"></script>
  </body>
</html>
```

Each script tag tells the Browser to load and execute some JavaScript
code. If the `src` attribute is given, the browser fetches the code.
If the `script` tag has a body (called **inline JavaScript**), it is
treated as JavaScript code and executed. Inline JavaScript is
considered poor style and is hard to keep organized, so use inline JS
at a minimum.

In this example, we would first fetch and execute the jQuery library
from Google, then run the inline alert code, then fetch and run our
`app.js` file.

## Environment

We call programs like the browser (Chrome, Safari, Firefox, Internet
Explorer) and Node.js **JavaScript runtimes**, or **environments**.
Calling these an **environment** emphasizes that the browser or Node.js
exposes functionality that the JavaScript program can access through
**APIs**.

For instance, Node.js lets us read files in code we can import through
the `require("fs")` module. On the other hand, we can use the browser's
DOM API (for instance, `document.getElementById("...");`) to find and
modify HTML elements in a web page.

Neither File IO or DOM manipulation is part of "JavaScript the
language", per se. Instead, these are functionalities provided by the
environment (Node.js, web browser), and accessed through a JavaScript
API.
