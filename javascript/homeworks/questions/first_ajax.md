# Your First AJAX Request

You're going to dive more into AJAX in a bit, but we need to give you a taste before building jQuery lite.

## Part 1: Up and Running

Download [the skeleton][skeleton].  Open `index.html` in the browser and pop open the console (command + option + J).  You should see a welcome message.

## Part 2: AJAX of One Trade

Write an [AJAX request][simple-ajax-example] underneath the top `console.log`. Some guidelines:

- It should be a GET request.
- It should get the New York weather from this url: `http://api.openweathermap.org/data/2.5/weather?q=NY,NY&appid=bcb83c4b54aee8418983c2aff3073b3b`
    - If the request fails, sign up for your own API key [here][weather-api-signup] and stick that key in place of `bcb83c4b54aee8418983c2aff3073b3b`.
- It should take a success callback
    - In the success callback, `console.log` out what the weather is.


Write another console.log at the bottom of the file (outside of the ajax request).  Your file should have this rough structure:

```js
    console.log("HELLO FROM THE JAVASCRIPT CONSOLE!");

    // the ajax request you wrote
        // console.log for the data in the success callback

    // another console.log down here

```

Notice the order that the `console.log`s run.

Make sure you can answer the following questions:

1.  When does the request get sent?
2.  When does the response come back?
3.  What's the current weather in New York?
4.  Did the page refresh?
5.  How could we use different HTTP methods in our request?

[weather-api-signup]: http://home.openweathermap.org/users/sign_up
[simple-ajax-example]: ../../readings/simple-ajax-example.md
[skeleton]: ./first_ajax_skeleton.zip?raw=true
