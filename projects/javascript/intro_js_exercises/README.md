# Intro JS Exercises

**NB**: Remember that in JavaScript we'll use camelCase. And don't forget
 your semicolons!

## Array exercises

Do the [Array exercises][array-exercises] in JS.

* `uniq`
* `twoSum`
* `transpose`

[array-exercises]: https://github.com/appacademy/ruby-curriculum/tree/36166f57c3be3828a79cadf1ae3e6b952463c850/w1d1/data-structures/array.md

## Enumerable exercises

Do the [Enumerable][enumerable-exercises] and
[Blocks][blocks-exercises] in JS.

* `myEach`
* `myMap`
    * it must use your `myEach` function
    * Use a closure.
* `myInject`
    * your inject should take a function
    * As the exercise describes, start the accumulator variable with
      the first value. Iterate through the rest.
    * **It must also use your `myEach` function**

[enumerable-exercises]: https://github.com/appacademy/ruby-curriculum/tree/36166f57c3be3828a79cadf1ae3e6b952463c850/w1d1/data-structures/enumerable.md
[blocks-exercises]: https://github.com/appacademy/ruby-curriculum/tree/36166f57c3be3828a79cadf1ae3e6b952463c850/w1d4/blocks.md

## Iteration exercises

Do the [iteration exercises][iteration-exercises] in JS.

* `bubbleSort`
    * Your version can modify the original array.
* `substrings`

[iteration-exercises]: https://github.com/appacademy/ruby-curriculum/tree/36166f57c3be3828a79cadf1ae3e6b952463c850/w1d2/iteration.md

## Recursion exercises

Do the [recursion exercises][recursion-exercises] in JS. Do them all
except `deepDup`.

[recursion-exercises]: https://github.com/appacademy/ruby-curriculum/tree/36166f57c3be3828a79cadf1ae3e6b952463c850/w1d4/recursion.md


## Constructors and Prototypes

* Define a `Cat` class
    * The constructor method should take a name and owner.
    * It should save these in attributes of the object.
    * Write a `Cat#cuteStatement` method that returns "[owner] loves
      [name]".
    * `#cuteStatement` should be defined on the prototype.
* Prototypes example:
    * Create several `Cat`s, test out their `cuteStatement` method.
    * Reassign the `Cat.prototype.cuteStatement` method with a function
      that returns "Everyone loves [name]!"
    * Run `Cat#cuteStatement` on your old cats; the new method should
      be invoked.
* Add a `Cat#meow` method to the `Cat` prototype. You can now call
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

Do [Students and Courses][students-courses] from the Ruby curriculum.

[students-courses]: https://github.com/appacademy/ruby-curriculum/tree/36166f57c3be3828a79cadf1ae3e6b952463c850/w1d2/classes.md#students-and-courses
