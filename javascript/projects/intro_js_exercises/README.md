# Intro JS Exercises

**NB**: Remember that in JavaScript we'll use camelCase. And don't forget your semicolons!

## Array exercises

Do the [Array exercises][array-exercises] in JS.

* `uniq`
* `twoSum`
* `transpose`

[array-exercises]: exercises/array.md

## Enumerable exercises

Do the [Enumerable][enumerable-exercises] and
[Blocks][blocks-exercises] in JS.

* `myEach`
* `myMap`
    * It must use your `myEach` function.
    * Use a closure.
* `myInject`
    * Your inject should take a function.
    * As the exercise describes, start the accumulator variable with
      the first value. Iterate through the rest.
    * **It must also use your `myEach` function**.

[enumerable-exercises]: exercises/enumerable.md
[blocks-exercises]: exercises/blocks.md

## Iteration exercises

Do the [iteration exercises][iteration-exercises] in JS.

* `bubbleSort`
    * Your version can modify the original array.
* `substrings`

[iteration-exercises]: exercises/iteration.md

## Recursion exercises

Do the [recursion exercises][recursion-exercises] in JS.

[recursion-exercises]: exercises/recursion.md

## Constructors and Prototypes

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

## Prototype exercises

If you haven't already, go back and redo the relevant exercises by
defining a method on the object's prototype (i.e. define `myEach` on
the `Array` prototype, `substrings` on the `String` prototype, etc.).

## Class exercises

Do [Students and Courses][students-courses].

[students-courses]: exercises/classes.md
