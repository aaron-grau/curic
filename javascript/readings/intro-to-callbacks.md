# Intro to Callbacks: File I/O

## What is a callback?

A callback is a function that is passed to another function and
intended to be called at a later time. The most common use of
callbacks is when executing asynchronous requests such as getting user input or requesting data over a network.


Consider this example that uses the `setTimeout` method:

```javascript
// wait 2000 milliseconds and then print 'hello':
window.setTimeout(function () {
  console.log('hello');
}, 2000);
```

`setTimeout` receives two arguments: the callback and the interval. 
Here the callback prints 'hello'. The `setTimeout` method
holds on to the function, and calls it after 2000 milliseconds. The callback is essential here, because `setTimeout` needs to
know what do at the end of the timeout.


## Callbacks and closures
The above function passes a **callback** to `setTimeout`. In this
case, the callback is not a **closure**, since it uses no outside
variables. That's because we've hard-coded the string 'hello'. Let's see an
example that illustrates why closures are so commonly used as
callbacks:

```javascript
function scheduleGreatMovieReminder(movie) {
  // remind in one min
  window.setTimeout(function () {
    console.log(`Remember to watch: ${movie}`);
  }, 60 * 1000);
  console.log(`Timer set for ${movie}`)
}

scheduleGreatMovieReminder("Citizen Kane");
scheduleGreatMovieReminder("Touch of Evil");
scheduleGreatMovieReminder("The Third Man");
```

Run the above code in your browser console and observe the timing of the outputs.

## JavaScript is Asynchronous

In Ruby programming, most of the methods we wrote are **not** like
`setTimeout`. `setTimeout` sets a timer in the background and then immediately returns, long before the callback is actually invoked.

`setTimeout` is called **asynchronous**. An asynchronous function does
not wait for work to be completed. It schedules work to be done in the
background. Asynchronous functions tend to be used when work may take
a variable amount of time:

* Timers
    * Waits a specified amount of time.
* Background web requests (AJAX)
    * Makes a possibly slow connection to a server that may live far
      away.
    * Will pass the fetched data to the callback when the response
      eventually comes in.
* Events
    * Example: there's a button on the page. We want to run a function
      when the user clicks it.
    * This is called a **click event**.
    * We **install** a **click handler**. A click handler is a
      callback that is invoked when a click occurs.
    * We don't know how long it will be before the click happens, but
      if and when a click actually occurs, the callback will have been
      stored and will be run.

The opposite of asynchronous is **synchronous**. For example, a
synchronous analogue to `setTimeout` would be Ruby's `sleep` method.
`sleep` pauses execution for a specified period of time. Likewise, if
AJAX requests were not asynchronous, calls to `$.ajax` (the `$` means
jQuery; we'll learn it soon!) would not return right away, but would
instead wait for the HTTP response. The response could then be
returned to the caller, so no callback would be necessary.

## Node I/O is Async

Ruby has the methods `puts` and `gets`. JavaScript has `console.log`
as an analogue to `puts`, but it doesn't have an exact analogue for
`gets`.

In a web browser, you may use the `prompt` method to pop up a message
box to ask for input from the user. When running server-side code in
the node.js environment, `prompt` is not available (because node is
not a graphical environment).

Instead, you must use the `readline` library when writing server-side
node.js programs. Here's the [documentation][readline-doc].

[readline-doc]: http://nodejs.org/api/readline.html

Here's a simple example:

```javascript
const readline = require('readline');

const reader = readline.createInterface({
  // it's okay if this part is magic; it just says that we want to
  // 1. output the prompt to the standard output (console)
  // 2. read input from the standard input (again, console)

  input: process.stdin,
  output: process.stdout
});

reader.question("What is your name?", function (answer) {
  console.log(`Hello ${answer}!`);
});

console.log("Last program line");
```

The `question` method takes a prompt (`"What is your name?"`) and a
callback. It will print the prompt, and then ask node.js to read a
line from stdin. `question` is asynchronous; it will not wait for the
input to be read, it returns immediately. When node.js has received
the input from the user, it will call the callback we passed to
`reader.question`.

Let's see this in action:

```
~/jquery-demo$ node test.js
What is your name?
Last program line
Ned
Hello Ned!
```

Notice that because `reader.question` returns immediately and does not
wait, it prints `"Last program line"` before I get a chance to write
anything. Notice also that I don't try to save or use the return value
of `reader.question`: that's because this method does not return anything. `reader.question` cannot return the input, because the function returns before I have actually typed in any input. **Asynchronous functions do not return meaningful values: we give them a callback so that the result of the async operation can be communicated back to us**.

One final note: note that our program didn't end when it hits the end
of the code. It patiently waited for our input. That's because Node
understands that there is an outstanding request for user input. Node
knows that the program may not be done yet: anything could happen in
response to that input. So for that reason, Node doesn't terminate the
program just because we hit the end of the source file.  If we want to
stop accepting input, we have to explicitly call `reader.close()`:

```javascript
const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

reader.question("What is your name?", function (answer) {
  console.log(`Hello ${answer}!`);

  // Close the reader, which will allow the program to end because it
  // is no longer waiting for any events.
  reader.close();
});

console.log("Last program line");
```

## Example #1

Let's see a more developed example:

```javascript
const readline = require('readline');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addTwoNumbers(callback) {
  // Notice how nowhere do I return anything here! You never return in
  // async code. Since the caller will not wait for the result, you
  // can't return anything to them.

  reader.question("Enter #1: ", function (numString1) {
    reader.question("Enter #2: ", function (numString2) {
      const num1 = parseInt(numString1);
      const num2 = parseInt(numString2);

      callback(num1 + num2);
    });
  });
}

addTwoNumbers(function (result) {
  console.log(`The result is: ${result}`);
  reader.close();
});
```

Notice the use of closures and callbacks:

1. `function (numString1) { ...`'s closure scope includes the
   `callback` variable. `numString1` is a regular argument.
2. `function (numString2) { ...`'s closure scope includes the
   `numString1` variable, as well as `callback`
   recursively. `numString2` is a regular argument.
3. `function (result) { ...`'s closure scope includes
   `reader`. `result` is a regular argument.

Note: `callback` is not a Javascript keyword. It is simply the name of
the parameter we are passing to `addTwoNumbers`.

## Example #2

Let's write a silly method, called `absurdTimes`:

```javascript
function absurdTimes(numTimes, fun) {
  let i = 0;

  function loopStep() {
    if (i == numTimes) {
      // we're done, stop looping
      return;
    }

    fun();

    // recursively call loopStep
    i += 1;
    loopStep();
  }

  loopStep();
}
```

Notice how this loops in a weird way. Of course, this is an absurd way
to implement `times`, and you wouldn't do this normally. But we're
going to build on this in a moment...

## Example #3

When we need to do a loop in code that is asynchronous, we can modify
the trick from above:

```javascript
function absurdTimes(numTimes, fn, completionFn) {
  let i = 0;

  function loopStep() {
    if (i == numTimes) {
      // we're done, stop looping
      completionFn();
      return;
    }

    i += 1;

    fn(loopStep);
  }

  loopStep();
}

const readline = require('readline');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addTwoNumbers(callback) {
  reader.question("Enter #1: ", function (numString1) {
    reader.question("Enter #2: ", function (numString2) {
      const num1 = parseInt(numString1);
      const num2 = parseInt(numString2);

      callback(num1 + num2);
    });
  });
}

let totalSum = 0;
absurdTimes(3, function (callback) {
  addTwoNumbers(function (result) {
    totalSum += result;

    console.log(`Sum: ${result}`);
    console.log(`Total Sum: ${totalSum}`);

    callback();
  });
}, function () {
  console.log(`All done! Total Sum: ${totalSum}`);
  reader.close();
});
```

A normal times method like so would not work:

```javascript
function times(times, fn) {
  for (let i = 0; i < times; i++) {
    fn();
  }
}
```

If `fn` is asynchronous, it will return immediately, even though its
work is not done. By passing a callback (`loopStep`) as the callback
to `fn` (as we do in `absurdTimes`), `fn` can call `loopStep` **after
`fn`'s work is completed**.

We also added an argument, `completionFn` so that we could call code
when all the iterations are completed. I use this to print the total
sum a final time, and close the reader so the program can end.
