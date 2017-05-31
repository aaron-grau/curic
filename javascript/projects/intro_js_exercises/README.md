# Intro JavaScript exercises

## Learning Goals

* Be able to write the same types of functions you were able to write in Ruby
* Know how to pass functions as arguments to other functions and call them as callbacks
* Know how closures work
* Know how JavaScript's prototypical inheritance works
  * Know how to monkey-patch new methods onto a class in JavaScript

**NB**: Remember that in JavaScript we use `camelCase` for variable names. And don't forget your semicolons!

## Phase 0: Setup

Download the [`skeleton`][skeleton] and fill in the corresponding file with each phase.
The `index.html` file already has each of the `.js` script files included, so you need not worry about editing it.
Simply `open index.html` and your code should be available from the Chrome Console (`CMD-ALT-i` to open).

[skeleton]: ./skeleton.zip

## Phase 1: Arrays

### Overview

Let's take a little while to create a few (hopefully familiar) functions.
These should give you some experience iterating over and mutating arrays.

### Instructions

Monkey-patch the following methods to the `Array` class. Remember, we want to use `prototype` here.

* `uniq` - receives an array and returns a new array containing only the unique elements of the original array
  * the unique elements should be in the order in which they first appear
  * should not mutate the original array
* `twoSum` - receives an array and returns an array of position pairs where the elements sum to zero
* `transpose` - receives a two-dimensional array representing a matrix and returns it's [transpose][transpose]
  * should not mutate the original array

### Recap

That was super fun, right?

[transpose]: https://en.wikipedia.org/wiki/Transpose

## Phase 2: Enumerable

### Overview

JavaScript enumerates over arrays differently than Ruby; rather than taking a block, they take a _callback_ function, which is invoked for each element of the array. Take a look at the [MDN Array Documentation] if it is unclear how

### Instructions

Write the following functions in that swell new language we've been learning. We will hold off on monkey-patching for now, so make sure to pass the array as the first argument.

* `myForEach(arr, callback)` - receives an array and callback function and executes the callback for each element in the array
* `myMap(arr, callback)` - receives an array and callback function, returns a new array of the results of calling the callback function on each element of the array
  * should use `myForEach` and a closure
* `myReduce(arr, callback, [initialValue])` - (like Ruby's `Array#inject`) receives an array, callback function, and optional initial value, returns an accumulator by applying the callback function to each element and the result of the last invocation of the callback (or initial value if supplied)
  * `initialValue` is optional and should default to the first element of the array if not provided
  * examples:
    ```js
    // without initialValue
    myReduce([1, 2, 3], function(acc, el) {
      return acc + el;
    }); // => 6

    // with initialValue
    myReduce([1, 2, 3], function(acc, el) {
      return acc + el;
    }, 25); // => 31
    ```
  * should also use `myForEach`

### Recap

Closures and callbacks are part of the foundation of JavaScript and provide us with a lot of flexibility and modularity in our code.
Thanks to closures we can create higher order functions and "hide" private variables.

## Phase 3: Iteration

### Overview

Let's do a few slightly more involved problems with arrays.
These should be pretty familiar.

### Instructions

Write the following functions:

* `bubbleSort(arr)` - receives an array, returns a sorted array by implementing [`bubble sort`][bubble sort] sorting algorithm
* `substrings(str)` - receives a string, returns an array of all substrings

### Recap

These implementations should be almost identical to those we created in Ruby.
Sadly, there is no parallel assignment in JavaScript, _but_ we do get that really cool `++` operator.

[bubblesort]: https://en.wikipedia.org/wiki/Bubble_sort

## Phase 4: Recursion

### Overview

Thought you were done with recursion, eh?
Recursion is not only an important method of destructuring problems, but also form the basis of many of the interview questions you may be asked while job hunting.
Let's get some more practice with recursion in JavaScript!

### Instructions

Write the following functions:

* `range(start, end)` - receives a start and end value, returns an array from start up to end
* `sumRec(arr)` - receives an array of numbers and recursively sums them
* `exponent(base, exp)` - receives a base and exponent, returns the base raise to the power of the exponent (`base ^ exp`)
  * write two versions:

  ```
  # this is math, not Ruby methods.

  # version 1
  exp(b, 0) = 1
  exp(b, n) = b * exp(b, n - 1)

  # recursion 2
  exp(b, 0) = 1
  exp(b, 1) = b
  exp(b, n) = exp(b, n / 2) ** 2             [for even n]
  exp(b, n) = b * (exp(b, (n - 1) / 2) ** 2) [for odd n]
  ```

* `fibonacci(n)` - receives an integer, `n`, and returns the first `n` Fibonacci numbers
* `bsearch(arr, target)` - receives a sorted array, returns the index of the target or `-1` if not found

>#### :bulb: Aside: Why `-1`?
>
>In case you are wondering, returning `-1` is a common practice when returning the index of an element that does not exist.
>The reasoning behind this is to return the same type (`-1` is also a number) as if the element was found; that way we can still bracket into the array, but will get `undefined` back.
>Though this was not the case with Ruby, you will likely see this in other programming languages.
>Try this on your own if you are curious.

*

## Phase 5: Create a `Cat` Class

* Define a `Cat` class
    * The constructor method should take a name and owner.
    * It should save these in attributes of the object.
    * Write a `Cat.prototype.cuteStatement` method that returns "[owner] loves
      [name]".
    * `cuteStatement` method should be defined on the prototype.
* Prototypes example:
    * Create several `Cat`s, test out their `cuteStatement` method.
    * Reassign the `Cat.prototype.cuteStatement` method with a function
      that returns "Everyone loves [name]!"
    * Run the `cuteStatement` method on your old cats; the new method should
      be invoked.
* Add a `meow` method to the `Cat` prototype. You can now call
  `meow` on your previously constructed `Cat`s.
* Take one of your cats and set the `meow` property **on the instance**
  (`cat1.meow = function () { ... }`. Call `meow` on this `Cat`
  instance; call `meow` on any other cat. The other cats should
  continue to use the original method.
    * Note that it is pretty unusual to add a method directly to an
      instance like this; normally we would add methods to the
      prototype.
    * This exercise is more to help you understand the idea of the
      **prototype-chain** and how JS recursively searches for methods.

## Phase 6: Students and Courses

Do [Students and Courses][students-courses].

[students-courses]: exercises/classes.md

## Phase 7: Prototypical Monkey-patching

If you haven't already, go back and redo the relevant exercises by
defining a method on the object's prototype (i.e. define `myEach` on
the `Array` prototype, `substrings` on the `String` prototype, etc.).
