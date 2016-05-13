# Arguments in Javascript

Arguments in JS behave differently than they do in other languages.
Namely, JavaScript functions will happily take fewer arguments than
specified (in which case the unspecified arguments have value
`undefined`), or extra arguments (they will be available in a special
`arguments` array).

## Fewer Arguments

JS functions can take fewer arguments than expected. In that
case, unspecified arguments have the value `undefined`.

```javascript
function id(arg) {
  return arg;
}

id(5); // => 5
id(); // => undefined
```

Occasionally this can be annoying to debug if you expect a function to
throw an error when it doesn't receive as many arguments as it
requires to return the correct output. Always keep in mind that a
function will still run even if it has been passed no arguments at
all.

## More Arguments

JS functions will also accept more arguments than are asked for. You
have access to all of the arguments through a special array called
`arguments`. Like the `this` keyword, `arguments` is set each time you
call a function. It contains the values of all the arguments: ones
that were anticipated in the function definition, plus the extras.

```javascript
function logArguments() {
  for (var i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
};

logArguments("boop", "candle", 3);
```

One very annoying thing about `arguments` is that it is not a true
`Array` object. It is only **Array-like** in that it can be indexed
with integers and has a `length` property.

This is infuriating: we can't use any of our favorite
`Array` methods. We can, however, use `Array#slice` to create a copy
of `arguments`:

```javascript
// `arr.slice() == arr.slice(0, arr.length)` makes a copy of `arr`.
var args = Array.prototype.slice.call(arguments);
args.forEach(function (i) { console.log(i) });
```

Holy cow. This works because `arguments` is `Array`-like enough for
the `slice` method to work. Wow.

## Exercises

### `sum`

Write a `sum` function. This should take any number of arguments:

    sum(1, 2, 3, 4) == 10
    sum(1, 2, 3, 4, 5) == 15

### `bind` with args

Rewrite your `myBind` method so that it can optionally take some args
to be partially applied.

For example:

```javascript
function Cat(name) {
  this.name = name;
};

Cat.prototype.says = function (sound, person) {
  console.log(this.name + " says " + sound + " to " + person + "!");
  return true;
}

markov = new Cat("Markov");
breakfast = new Cat("Breakfast");

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

var notMarkovSays = markov.says.myBind(breakfast);
notMarkovSays("meow", "me");
// Breakfast says meow to me!
// true

```

Within your `myBind` method, you'll have to define a new, anonymous
function to be returned. Be careful: using `arguments` inside the
anonymous function will not give you the `arguments` passed to
`myBind`, because `arguments` is reset on every function invocation
(just like `this`).

That makes sense, because there are two arrays of `arguments` you care
about: the extra `arguments` passed to `myBind`, and the `arguments`
passed when the bound function is called.

### `curriedSum`, `curry`

**Functional programming** is another style of programming; it's an
alternative to object-oriented programming, though the two styles can
also be mixed. We'll learn more about it later, but in (very) brief,
functional programming focuses on passing functions around, rather
than objects.

In functional programming, a common pattern is **currying**. Currying
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
var f1 = sumThree.curry(3);
var f2 = f1(4);
var f3 = f2(20);
var result = f3(6); // = 30

// or more briefly:
sumThree.curry(3)(4)(20)(6); // == 30
```

Note that the curried version returns functions at each step until it
has the full number of arguments it needs. At this point it actually
runs `sumThree` and returns the result.

As a warmup, write a `curriedSum` function that takes an integer (how
many numbers to sum) and returns a function that can be successively
called with single arguments until it finally returns a sum. That is:

```javascript
var sum = curriedSum(4);
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

Intuitively, the `_curriedSum` function keeps collecting arguments and
returning itself until it has enough arguments, at which point it
actually does the required work of summing.

Now that you're all limbered up, write a method
`Function#curry(numArgs)`. This should return a function that will:

* Collect up arguments until there are `numArgs` of them,
* If there are too few arguments still, it should return itself.
* When there are `numArgs` arguments, it should call the original
  function. You'll want to use `apply`.
