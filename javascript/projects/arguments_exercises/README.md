# Exercises

## `sum`

Write a `sum` function that takes any number of arguments:

```js
    sum(1, 2, 3, 4) === 10
    sum(1, 2, 3, 4, 5) === 15
```

Solve it first using the `arguments` keyword, then rewrite your solution to use the `...` rest operator.

## `bind` with args

Rewrite your `myBind` method so that it can take both bind-time arguments and call-time arguments.

For example:

```javascript
class Cat {
  constructor(name) {
    this.name = name;
  }

  says(sound, person) {
    console.log(`${this.name} says ${sound} to ${person}!`);
    return true;
  }
}

const markov = new Cat("Markov");
const breakfast = new Cat("Breakfast");

markov.says("meow", "Ned");
// Markov says meow to Ned!
// true

markov.says.myBind(breakfast, "meow", "Kush")();
// Breakfast says meow to Kush!
// true

markov.says.myBind(breakfast)("meow", "a tree");
// Breakfast says meow to a tree!
// true

markov.says.myBind(breakfast, "meow")("Markov");
// Breakfast says meow to Markov!
// true

const notMarkovSays = markov.says.myBind(breakfast);
notMarkovSays("meow", "me");
// Breakfast says meow to me!
// true

```

Solve it first using the `arguments` keyword.

Within your `myBind` method, you'll have to define a new, anonymous
function to be returned. Be careful: using `arguments` inside the
anonymous function will not give you the `arguments` passed to
`myBind`, because `arguments` is reset on every function invocation
(just like `this`).

That makes sense, because there are two arrays of `arguments` you care
about: the extra `arguments` passed to `myBind`, and the `arguments`
passed when the bound function is called.

Once you've done that, **write a second version using the `...` [rest][rest-op] operator.**

[rest-op]: ../../readings/arguments.md#rest-parameters

## `curriedSum`

**Functional programming** is another style of programming; it's an
alternative to object-oriented programming, though the two styles can
also be mixed. We'll learn more about it later, but briefly,
functional programming focuses on passing *functions* around instead of
*objects*.

One pattern seen in functional programming is **currying**. Currying
is the process of decomposing a function that takes multiple arguments
into one that takes single arguments successively until it has the
sufficient number of arguments to run. This technique is named after
the logician Haskell Curry (the functional programming language
Haskell is, too).

Here's an example of two ways to use a `sumThree` function. The first
is a typical version that takes 3 arguments; the second is a
**curried** version:

```javascript
function sumThree(num1, num2, num3) {
  return num1 + num2 + num3;
}

sumThree(4, 20, 6); // == 30

// you'll write `Function#curry`!
const f1 = sumThree.curry(3); // tells `f1` to wait until 3 arguments are given before running `sumThree`
f1 = f1(4); // [Function]
f1 = f1(20); // [Function]
f1 = f1(6); // = 30

// or more briefly:
sumThree.curry(3)(4)(20)(6); // == 30
```

Note that the curried version returns functions at each step until it
has the full number of arguments it needs. At this point it actually
runs `sumThree` and returns the result.

Write a `curriedSum` function that takes an integer (how many numbers to sum) and returns a function that can be successively called with single arguments until it finally returns a sum. That is:

```javascript
const sum = curriedSum(4);
sum(5)(30)(20)(1); // => 56
```

Hint: `curriedSum(numArgs)` should:

* Define an empty array, `numbers`.
* Defines a function, `_curriedSum` that:
    * Closes over `numArgs` and `numbers`.
    * Takes a single number as an argument.
    * Appends this to `numbers` each time.
    * If `numbers.length === numArgs`, it sums the numbers in the array
      and returns the result.
    * Else, it returns itself.
* Returns `_curriedSum`.

If you're confused, think of it this way: `_curriedSum` function keeps collecting arguments and returning itself until it has enough arguments, at which point it actually does the required work of summing.

## `Function.prototype.curry`

Write a method `Function.prototype.curry(numArgs)`. This should return a function that will:

* Collect up arguments until there are `numArgs` of them,
* If there are too few arguments still, it should return itself.
* When there are `numArgs` arguments, it should call the original function.
* Write a version that uses `Function.prototype.apply` and another one that uses the [spread][spread-op] `...` operator.

** Make sure to call a TA to check over your work if you haven't already! **

[spread-op]:../../readings/arguments.md#spread-parameters
