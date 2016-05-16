# Intro to Callbacks: File I/O

## What is a callback?

Closures are a very big part of JavaScript. One reason they are so
important is because they are often used as **callbacks**.

A callback is a function that is passed to another function and
intended to be called at a later time. The most common use of
callbacks is when a result will not be immediately available,
typically because it relies on user input.

Perhaps the simplest example is to ask JavaScript to wait a specified
period of time and then call a function. This uses the `setTimeout`
method:

```javascript
// wait 2000 milliseconds and then print great movie link:
window.setTimeout(function () {
  console.log("http://en.wikipedia.org/wiki/Out_of_Time_(2003_film)");
}, 2000);
```

Here the callback prints the movie title. The `setTimeout` method
holds on to the function, waiting to call it after the appropriate
period. The callback is essential here, because `setTimeout` needs to
know what do at the end of the timeout.

The above function passes a **callback** to `setTimeout`. In this
case, the callback is not a **closure**, since it uses no outside
variables. That's because we've hard-coded the URL. Let's see an
example that illustrates why closures are so commonly used as
callbacks:

```javascript
function scheduleGreatMovieReminder(movie) {
  // remind in one min
  window.setTimeout(function () {
      console.log("Remember to watch: " + movie);
    }, 60 * 1000
  );
}

scheduleGreatMovieReminder("Citizen Kane");
scheduleGreatMovieReminder("Touch of Evil");
scheduleGreatMovieReminder("The Third Man");

// Easter egg!
// http://en.wikipedia.org/wiki/Frozen_Peas
```

## JavaScript is Asynchronous

In Ruby programming, most of the methods we wrote are **not** like
`setTimeout`. `setTimeout` sets a timer (we'll talk about how later;
it turns out `setTimeout` is a special function) and then immediately
returns. `setTimeout` returns before the timeout is up, long before
the callback is actually invoked.

`setTimeout` is called **asynchronous**. An asynchronous function does
not wait for work to be completed. It schedules work to be done in the
background. Asynchronous functions tend to be used when work may take
an indeterminate amount of time:

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
var readline = require('readline');

var reader = readline.createInterface({
  // it's okay if this part is magic; it just says that we want to
  // 1. output the prompt to the standard output (console)
  // 2. read input from the standard input (again, console)

  input: process.stdin,
  output: process.stdout
});

reader.question("What is your name?", function (answer) {
  console.log("Hello " + answer + "!");
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
of `reader.question`: that's because this method does not return
anything. `reader.question` cannot return the input, because the
function returns before I have actually typed in any
input. **Asynchronous functions do not return meaningful values: we
give them a callback so that the result of the async operation can be
communicated back to us**.

One final note: note that our program didn't end when it hits the end
of the code. It patiently waited for our input. That's because Node
understands that there is an outstanding request for user input. Node
knows that the program may not be done yet: anything could happen in
response to that input. So for that reason, Node doesn't terminate the
program just because we hit the end of the source file.  If we want to
stop accepting input, we have to explicitly call `reader.close()`:

```javascript
var readline = require('readline');

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

reader.question("What is your name?", function (answer) {
  console.log("Hello " + answer + "!");

  // Close the reader, which will allow the program to end because it
  // is no longer waiting for any events.
  reader.close();
});

console.log("Last program line");
```

## Example #1

Let's see a more developed example:

```javascript
var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addTwoNumbers(callback) {
  // Notice how nowhere do I return anything here! You never return in
  // async code. Since the caller will not wait for the result, you
  // can't return anything to them.

  reader.question("Enter #1", function (numString1) {
    reader.question("Enter #2", function (numString2) {
      var num1 = parseInt(numString1);
      var num2 = parseInt(numString2);

      callback(num1 + num2);
    });
  });
}

addTwoNumbers(function (result) {
  console.log("The result is: " + result);
  reader.close();
});
```

Notice the use of closures and callbacks:

0. `function (numString1) { ...`'s closure scope includes the
   `callback` variable. `numString1` is a regular argument.
0. `function (numString2) { ...`'s closure scope includes the
   `numString1` variable, as well as `callback`
   recursively. `numString2` is a regular argument.
0. `function (result) { ...`'s closure scope includes
   `reader`. `result` is a regular argument.

Note: `callback` is not a Javascript keyword. It is simply the name of
the parameter we are passing to `addTwoNumbers`.

## Example #2

Let's write a silly method, called `absurdTimes`:

```javascript
function absurdTimes(numTimes, fun) {
  var i = 0;

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
  var i = 0;

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

var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addTwoNumbers(callback) {
  reader.question("Enter #1", function (numString1) {
    reader.question("Enter #2", function (numString2) {
      var num1 = parseInt(numString1);
      var num2 = parseInt(numString2);

      callback(num1 + num2);
    });
  });
}

var totalSum = 0;
absurdTimes(3, function (callback) {
  addTwoNumbers(function (result) {
    totalSum += result;

    console.log("sum: " + result);
    console.log("totalSum: " + totalSum);

    callback();
  });
}, function () {
  console.log("All done! totalSum: " + totalSum);
  reader.close();
});
```

A normal times method like so would not work:

```javascript
function times(times, fn) {
  for (var i = 0; i < times; i++) {
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

## Exercises

### Timing is Everything

Use [`setInterval`][setInterval-doc] to build a small clock in your
terminal. It should display the current time every second. However, you
can only query the system time once. Your clock must store that time,
increment it, and display it in `HH:MM:SS` (use 24hr format).

Make a `Clock` class. Calling `new Date()` will give us an object that
represents the current system time. The instructions say you can only do
this once, so do it in your `Clock` constructor. Don't bother keeping
this `Date` object around because you won't need it anymore. Just store
the hours, minutes, and seconds. Look at the [`Date` docs][date-docs]
for help here.

You'll also need to schedule a `#_tick` callback that updates the time
and calls `#printTime`. Don't worry about padding zeroes in the format.
Just focus on the basic logic and functionality.

We recommend building this piece by piece, one line at a time.  Start by only writing the first line of the constructor function.  Stop.  Poke around (using a debugger or console.logs).  Then write the next line and poke around again.

 Make sure you know what's going on line by line.  Once you start writing other functions, also go line by line and stop.  Poke around. Know *exactly what objects you're dealing with* at all times.



```javascript
function Clock () {
  // 1. Create a Date object.
  // 2. Store the hours, minutes, and seconds.
  // 3. Call printTime.
  // 4. Schedule the tick at 1 second intervals.
}

Clock.prototype.printTime = function () {
  // Format the time in HH:MM:SS
  // Use console.log to print it.
};

Clock.prototype._tick = function () {
  // 1. Increment the time by one second.
  // 2. Call printTime.
};

var clock = new Clock();
```

[setInterval-doc]: http://nodejs.org/api/globals.html#globals_setinterval_cb_ms
[date-docs]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#Date.prototype_Methods

### `addNumbers`

Let's write a function that will read several numbers, one after
another, and sum up the total. After each number, let's print out the
partial sums along the way, and pass the total sum to a callback when
done.

First off, use `readline.createInterface` to create a global variable,
`reader`. Use `process.stdin`/`process.stdout` like I do in my
examples.

Next, write a function, `addNumbers(sum, numsLeft,
completionCallback)`:

* If `numsLeft > 0`, then:
    * Prompt the user for a number (use `reader`).
    * Pass a callback that:
    * Uses `parseInt` to parse the input.
    * Increment the `sum` and `console.log` it.
    * Recursively calls `addNumbers` again, passing in:
        * the increased `sum`,
        * the decreased `numsLeft`,
        * and the same `completionCallback`.
* If `numsLeft == 0`, call `completionCallback(sum)` so that the total
  sum can be used.

To test, try out:

```javascript
addNumbers(0, 3, function (sum) {
  console.log("Total Sum: " + sum);
});
```

This should prompt for three numbers, printing out the partial sums
and then the final, total sum.

### `absurdBubbleSort`

In this exercise, we write a method called `absurdBubbleSort(arr,
sortCompletionCallback)`. Instead of using the traditional `>`, we'll
prompt the user to perform each comparison for us.

First, write a method `askIfGreaterThan(el1, el2, callback)` which
prompts the user to compare two elements. The user can type in `"yes"`
or `"no"`: if the user indicates that `el1 > el2`, `askIfGreaterThan`
should call `callback` with `true`. Else, it should call `callback`
with `false`.

You'll want to set up a global `reader` variable (use
`readline.createInterface`). `askIfGreaterThan` should use the `question`
method.

Test it out.  Make sure you can ask for input and that the input passes to the callback correctly.

Next, write a method `innerBubbleSortLoop(arr, i, madeAnySwaps,
outerBubbleSortLoop)`. This recursive function should:

* If `i < arr.length - 1`, it should call `askIfGreaterThan`, asking the
  user to compare `arr[i]` and `arr[i + 1]`.
* For a `callback` to `askIfGreaterThan`, pass in an anonymous helper
  function. This should:
    * Take in a single argument: `isGreaterThan`; `askIfGreaterThan`
      will pass either `true` or `false` as this argument.
    * Perform a swap of elements in the array if necessary.
    * Call `innerBubbleSortLoop` again, this time for `i + 1`. It should
      pass `madeAnySwaps`. Update `madeAnySwaps` if you did swap.
* Call `outerBubbleSortLoop` if `i == (arr.length - 1)`. It should
  receive `madeAnySwaps` as an argument.

This method should now perform a single pass of bubble sort.  Test out `innerBubbleSortLoop`, passing in dummy variables.  For example, instead of actually writing the `outerBubbleSortLoop` method, pass in a dummy method that console.logs "In outer bubble sort".

This idea (testing methods on their own by passing in dummy arguments) is *crucial* to understand larger chunks of code that you write.  Don't be embarrassed to test out methods after you've only written one line of them.  It's very bad software practice to write many lines of code before testing anything, especially if you're a junior developer.

Lastly, write a method `absurdBubbleSort(arr, sortCompletionCallback)`. Define a function `outerBubbleSortLoop`
inside of `absurdBubbleSort`. It should:

* If `madeAnySwaps == true`, call `innerBubbleSortLoop`. It should
  pass in `arr`, an index of `0`, and `false` to indicate that no
  swaps have been made. For a callback to `innerBubbleSortLoop`, pass
  `outerBubbleSortLoop` itself.
* If `madeAnySwaps == false`, sorting is done! call
  `sortCompletionCallback`, passing in `arr`, which is now sorted!

To kick things off, `absurdBubbleSort` should call
`outerBubbleSortLoop(true)`. This will call the first inner loop to be
run.

Here's a code skeleton:

```javascript
var readline = require("readline");

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Write this first.
function askIfGreaterThan(el1, el2, callback) {
  // Prompt user to tell us whether el1 > el2; pass true back to the
  // callback if true; else false.
}


// Once you're done testing askIfGreaterThan with dummy arguments, write this.
function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
  // Do an "async loop":
  // 1. If (i == arr.length - 1), call outerBubbleSortLoop, letting it
  //    know whether any swap was made.
  // 2. Else, use `askIfGreaterThan` to compare `arr[i]` and `arr[i +
  //    1]`. Swap if necessary. Call `innerBubbleSortLoop` again to
  //    continue the inner loop. You'll want to increment i for the
  //    next call, and possibly switch madeAnySwaps if you did swap.
}

// Once you're done testing innerBubbleSortLoop, write outerBubbleSortLoop.
// Once you're done testing outerBubbleSortLoop, write absurdBubbleSort.

function absurdBubbleSort(arr, sortCompletionCallback) {
  function outerBubbleSortLoop(madeAnySwaps) {
    // Begin an inner loop if you made any swaps. Otherwise, call
    // `sortCompletionCallback`.
  }

  // Kick the first outer loop off, starting `madeAnySwaps` as true.
}

absurdBubbleSort([3, 2, 1], function (arr) {
  console.log("Sorted array: " + JSON.stringify(arr));
  reader.close();
});
```
