# Asynchronous Client-side Code

When your JavaScript code is being run in the browser, it blocks the
browser from doing other things. This includes running other JS code,
but also making new browser requests, rendering HTML, or even
scrolling. For instance, try this:

```html
<html>
  <body>
    <script>
      while (true) {
        console.log("Help! I'm stuck in a loop!");
      }
    </script>

    <h1>This heading never appears!</h1>
  </body>
</html>
```

Your tab should be entirely locked up; you'll have to close it. Notice
the `h1` tag is never rendered, because the browser stopped rendering
the HTML to run the script, but the script never finished!

There is one thing that you won't be able to do: execute a traditional
game loop:

```javascript
while (true) {
  // in many other languages (including Ruby), we can `sleep` to pause
  // the game for a second and then resume. In JS there is no `sleep`.
  sleep(1); // wrong

  // take a game step once per sec
  game.advanceState();
}
```

There is no sleep method in JS; it wouldn't make sense anyway, because
you mustn't write code that won't return promptly. However, JS and the
browser give you a way around this:

```javascript
window.setInterval(function () {
  // call this once per second
  game.advanceState();
}, 1000);

console.log("Timer set!");
```

The `window.setInterval` method schedules a timer that fires once
every 1000 milliseconds. When the timer fires, our function is
called. This approximates a loop, but it is
non-blocking. `setInterval` runs in the blink of an eye; it merely
schedules a timer, to be fired by the browser later. So
`console.log("Timer set!")` is called instantly.

If you wonder how you could possibly write `window.setInterval` in
pure JS, the answer is that you can't. The browser needs to provide
that functionality. This is an example of a browser API that allows us
to do things that pure JavaScript can't express. We can **ask** the
browser to set a timer through the JavaScript API, but we couldn't
write it ourself in JavaScript.

For even better animation performance, try using `requestAnimationFrame`
instead of `setInterval`. This function takes a single callback as an argument
and executes that function when the browser is ready. Inside that callback you
should render then make an additional call to `requestAnimationFrame`.

```javascript
  function animate() {
    game.advanceState();
    game.clearScreen();
    game.drawEverything();
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
```

Even though it might look like `animate` will get triggered instantly, it won't.
Instead, the browser intelligently calls `animate` around 60 times per second,
perfect for animations. You can read more about `requestAnimationFrame`
[here](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame).


## Callbacks and event handlers

An idiom from our Ruby game code is to enter a loop, request user
input, and then pass the input to the game. In JS, we can do this with
the synchronous `prompt` command:

```javascript
// wait for input
var userInput = window.prompt();

game.makeMove(userInput);
```

**Don't use prompt**. This pops up an input box for the user to type
in text. But because the `prompt` waits for user input, it blocks the
**entire** page. Nothing at all can happen (they can't even
scroll). This is bad.

Let's consider a better alternative. What if we want to enter text
into a normal text input field and press a button to submit it? Code
should run after the button is clicked.

Input in JavaScript is typically handled **asynchronously**: we will
register (or **bind**) a function (called a **handler**) to be called
by the browser when an **event** occurs. Here's an example:

```html
<html>
  <head>
    <title>A page for you!</title>

    <script type="application/javascript"
             src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js">
    </script>
  </head>

  <body>
    <input type="text" id="text-field" value="">
    <button id="submit-button">Submit me!</button>

    <script type="application/javascript">
      // uses jQuery to find HTML elements by id.
      var $submitButtonEl = $('#submit-button');
      var $textFieldEl = $('#text-field');

      // installs a "click handler" on the submit button; the callback
      // gets run when the button is clicked.
      $submitButtonEl.on('click', function () {
        // grab input text from the text field.
        var input = $textFieldEl.val();
        // reset text field to blank
        $textFieldEl.val("")

        // Build a new `p` tag with the input content and append it to
        // the body.
        var $parEl = $("<p></p>");
        $parEl.text(input);
        $("body").append($parEl);
      });
    </script>
  </body>
</html>
```

JavaScript lets us ask the browser to notify us of **events**. Here,
we're asking the browser to listen for a `click` event on the
`$submitButtonEl`. When a user presses the mouse while it is hovered
over the `$submitButtonEl`, the browser interprets this as a "click"
occurring on the button. The browser then calls any JavaScript code
that has been **registered** as a **handler** for the event.

Our handler extracts the value of the `$textFieldEl`, resetting it. We
then build and append a `p` tag with the input contents.

This is all accomplished through jQuery's `on` method, which asks the
browser to **register** the **handler** to call later when the
**event** is **triggered**.

Paste this in the browser and try it out!

## Resources

* https://developer.mozilla.org/en-US/docs/DOM/window.setInterval
* http://recurial.com/programming/understanding-callback-functions-in-javascript
* https://developer.mozilla.org/en-US/docs/DOM/window.prompt
* http://api.jquery.com/on/
