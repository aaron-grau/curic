
# Warm-Up: Intro to JS, Part III - Arguments

### printChildren

Write a function `printChildren` that takes a parent's name and an unspecified number of children. It should loop through the children and print each of their names.

**Input**
* 1) A string for the parent's name
* 2) Any number of strings for the children's names

**Output**
* "**parent**'s children are:" followed by the names of their children

```javascript

> printChildren("George", "Cassie", "Jeff", "Roger");
Georges children are:
Cassie
Jeff
Roger
```

### addThree

Below is a function that takes three numbers and returns their sum.
Use the spread operator to pass in a three-item array to `addThree`.

```javascript
function addThree (a, b, c) {
  return a + b + c;
}

var arr = [1,2,3];
// How can we use the spread operator to pass in arr?
```

### dinnerTonightIs

Write a function that takes in a food and outputs "Dinner tonight is **food**". Caveat: if you don't specify a food, `dinnerTonightIs` should use the default argument "pizza".

```
> dinnerTonightIs('some inferior food')
Dinner tonight is some inferior food.

> dinnerTonightIs()
Dinner tonight is pizza.

```

# Object-Oriented JavaScript

Today we're going to practice many of the fundamentals of object-oriented programming in JavaScript.

### Callbacks

Write a function `sillyNames` that takes an array of names and a function (callback). `sillyNames` should use `Array.prototype.map` to create a new array full of silly-fied versions of each name - silly-fied meaning "Roger" should be made to read "Mx. Roger Sillypants". Then pass this new array of silly names to the callback, which should use `Array.prototype.forEach` to print out each silly name.

```js
> sillyNames(["Mary", "Brian", "Leo"], printCallback);
Mx. Mary Sillypants
Mx. Brian Sillypants
Mx. Leo Sillypants
undefined
```

### Constructors, Prototypes, and `this`

First write a constructor function for an elephant. Each elephant should have a name, height (in inches), and array of tricks in gerund form (e.g. "painting a picture" rather than "paint a picture").

Next write a few prototype methods that will be shared among all elephants:
- trumpet: should print "________(name) the elephant goes 'phrRRRRRRRRRRR!!!!!!!'"
- grow: should increase the elephant's height by 12 inches
- addTrick(trick): add a new trick to their existing repertoire
- play: print out a random trick, e.g. "____(name) is ______(trick)!"
  - hint: you might need to look up some JS `Math` methods!

### Function Invocation

First, let's make a few elephants so we have a small herd. Feel free to copy the code below, or to make your own with any attributes you like. Make sure to store all of our elephants in an array.

```js
let ellie = new Elephant("Ellie", 185, ["giving human friends a ride", "playing hide and seek"]);
let charlie = new Elephant("Charlie", 200, ["painting pictures", "spraying water for a slip and slide"]);
let kate = new Elephant("Kate", 234, ["writing letters", "stealing peanuts"]);
let micah = new Elephant("Micah", 143, ["trotting", "playing tic tac toe", "doing elephant ballet"]);

let herd = [ellie, charlie, kate, micah];
```

Now let's create a function called `paradeHelper` that we'll use to have an elephant parade. It should take a single elephant as an argument; this way, we can pass it as a callback to `forEach` when called on our herd. Make sure to store it as a property on the `Elephant` object. You can populate it with any `console.log` statement you want to build your parade (e.g. "_______ is trotting by!").

Once you have this function, call `forEach` on the herd and pass it in as the callback without invoking it. Elephants galore!

:elephant: :elephant: :elephant: :elephant:

### Closure

Let's make a function `dinerBreakfast`. It should initially set up `order` to be the string "I'd like cheesy scrambled eggs and bacon please." Within `dinerBreakfast` we're going to create and return a closure that captures `order` and makes it more delicious. This closure should be anonymous and take in a breakfast food as an argument. It should add this food to the end of the `order` and return the whole updated `order` string. Make sure you can call it multiple times and keep chaining on more breakfast foods!

```js
let bfastOrder = dinerBreakfast();
bfastOrder("chocolate chip pancakes"); // => "I'd like cheesy scrambled eggs and bacon and chocolate chip pancakes please."
bfastOrder("grits"); // => "I'd like cheesy scrambled eggs and bacon and chocolate chip pancakes and grits please."
```
