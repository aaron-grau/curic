# Additional JS Intro Problems

Code up the following functions and run them in Node.

## Phase I: Callbacks

Write a function `jingle` that takes an array of `names` and a callback function `cb`.
+ `jingle` should use `Array.prototype.map` to create a new array
full of _jingled_ versions of each name.
  + _jingled_ meaning "Roger" should be return "Mx. Roger Jingleheimer Schmidt".
+ Then pass this new array of names to the `cb`.

```js
> const printCallback = function (names) {
    names.forEach(name => console.log(name));
  };

> jingle(["Mary", "Brian", "Leo"], printCallback);
Mx. Mary Jingleheimer Schmidt
Mx. Brian Jingleheimer Schmidt
Mx. Leo Jingleheimer Schmidt
undefined
```

Make sure it works before moving on!

## Phase II: Constructors, Prototypes, and `this`

:elephant: :elephant: :elephant:

First write a constructor function for an elephant. Each elephant should have:
+ a name (String),
+ a height (Number),
+ and a repertoire of tricks (Array)

For example, meet Dumbo:
```js
> const dumbo = Elephant.new("Dumbo", 20, ["painting a picture", "flying with his ears"]);
```

Next write a few prototype functions that will be shared among all elephants:
- `Elephant.prototype.grow`: should increase the elephant's height by 12 inches
- `Elephant.prototype.addTrick(trick)`: add a new trick to their existing repertoire
- `Elephant.prototype.play`: print out a random trick, e.g. "(name) is (trick)!"
  - Hint: look up some JS `Math` methods!

Make sure to create an elephant and test all of these functions out on it method style!

## Phase III: Function Invocation

Let's make a few elephants so we have a small herd. Feel free to copy the code below, or to make your own with any attributes you like. Make sure to store all of our elephants in an array.

```js
let ellie = new Elephant("Ellie", 185, ["giving human friends a ride", "playing hide and seek"]);
let kate = new Elephant("Kate", 234, ["writing letters", "stealing peanuts"]);
let micah = new Elephant("Micah", 143, ["trotting", "playing tic tac toe", "doing elephant ballet"]);

let herd = [ellie, kate, micah];
```

Now let's create a function called `paradeHelper` that we'll use to have an elephant parade. It should take a single elephant as an argument; this way, we can pass it as a callback to `forEach` when called on our herd. Make sure to store it as a property on the `Elephant` object. You can populate it with any `console.log` statement you want to build your parade (e.g. "_______ is trotting by!").

For example:

```js
> Elephant.paradeHelper(micah);
Micah is trotting by!
undefined
```

Once you have this function, call `forEach` on the herd and pass it in as the callback without invoking it. Elephants galore!

:elephant: :elephant: :elephant:

## Phase IV: Closures

Let's make a function `dinerBreakfast`. Ultimately, we want it to return an anonymous closure, which we will be able to use to keep adding breakfast foods to our initial order.

```js
> let bfastOrder = dinerBreakfast();
"I'd like cheesy scrambled eggs please"
> bfastOrder("chocolate chip pancakes");
"I'd like cheesy scrambled eggs and chocolate chip pancakes please."
> bfastOrder("grits");
"I'd like cheesy scrambled eggs and chocolate chip pancakes and grits please."
```

Hints:
- `order` should be initialized to a starting order (e.g. scrambled eggs and bacon) before the anonymous function can do its work.
- The closure should capture/close over `order`
- What should the return value of `dinerBreakfast` be?
- Which function should take in the additional food as an argument?

Make sure you can call it multiple times and keep chaining on more breakfast foods!
