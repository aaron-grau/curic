# Variables

There are a few different ways to declare variables and constants in JavaScript. Let's go over the use cases for each.

1. **`var`**
2. **`let`** (ES6+)
3. **`const`** (ES6+)
4. **`window.`** and **`global.`**

Note: the subsections below talk a great deal about scoping in JavaScript. Some things will make more sense after you have learned about scope, so reread as necessary!

## Declaration

In JavaScript, in order to use a variable or constant, we must declare it by prepending the variable's name with `var`, `let`, or `const`. Such a **variable declaration** introduces it to the environment. 

## `var`

To declare a function-scoped variable, use the `var` keyword.

```javascript
var myVar;
```

To declare a variable and assign it a value: 

```javascript
var myVar = 5;
```

Now it is time to experiment. Open your Terminal/Command Prompt and type the following:

```javascript
$ node
> myVar;
```

Since we have not declared myVar, you'll see an error message.

```javascript
> var myVar;
undefined

> myVar; 
// We now can use myVar without error because we declared it.
undefined 
// Evaluates to undefined because we did not initialize myVar to any value.

> myVar = 5;
5

> myVar + 2; // What will this evaluate to?
```

Notice that when I declare or initialize a variable, node prints out something underneath it. That is the return value. Everything is javascript has a return value, even declaration and initialization. `undefined` is the default return value.

We can also declare and initialize a variable on the same line.
```javascript
> var myOtherVar = "Anthony";
"Anthony"

> "Hello " + myOtherVar; // What will this evaluate to?
```

A note on style: `var` is not the preferred means of declaring a variable in ES6. Prefer `let` or `const`.

## `let`

`let` is a new feature in ES6.

We can use `let` to declare block-scoped variables, like in Ruby blocks. How are block-scoped variables different than function-scoped variables? Consider the following:

```javascript
function blockScope() {
  if (true) {
    var x = 'var';
    let y = 'let';
    console.log(x); // 'var'
    console.log(y); // 'let'
  }
  console.log(x); // 'var'
  console.log(y); // Reference error, y is undefined
}
blockScope();

console.log(x); // Reference error, x is undefined
console.log(y); // Reference error, y is undefined
```

Examples of blocks in javascript include `if` statements, `while` loops, `switch` statements, and `for` loops (more on these later).

One note: JavaScript will raise a `SyntaxError` if you try to declare the same `let` variable twice in one block.

For a more detailed description of `let`, please refer to the [MDN Documentation][mdn-let].

## `const`

`const` is a new feature in ES6.

We use `const` to declare constants. Constants should be used for constructs that will not be redeclared or reassigned.

Properties of constants:
* They are block-scoped like `let`.
* Unlike Ruby constants, JavaScript will actually enforce constants by raising an error if you try to reassign them.
* Trying to redeclare a constant with a `var` or `let` by the same name will also raise an error.

A quick example:

```javascript
const favoriteFood = "Cheeseboard pizza";

const favoriteFood = "Some inferior food"; // this will raise an error

var favoriteFood = "Some other inferior food"; // this will also raise an error

favoriteFood = "Cardboard middle school pizza"; // this will fail silently but won't raise an error

if (true) {
  const favoriteFood; // this will also raise an error
  console.log(favoriteFood); // outputs "Cheeseboard pizza"

  const favoriteDrink = "coffee"; // this is scoped to the block
  console.log(favoriteDrink) // outputs coffee
}

const favoriteDrink = "Harmless Coconut Water"; // declared after block, works fine

console.log(favoriteDrink) // outputs "Harmless Coconut Water"
```

One note - constants are not immutable. Only the binding is immutable. For example, if we set a constant equal to an object, we can still modify that object:

```javascript

const animals = {};
animals.mammals = ['hippo', 'lemur', 'possum']; // this is okay

```

## Globals

**If you leave off a declaration when initializing a variable, it will become a global. Never do this.**

```js

function good(){
  let x = 5;
}

function bad(){
  y = "something i wasn't expecting";
}

function why() {
  x; // undefined
  y; // "something i wasn't expecting"
}

```

Unintended global variables create confusing, unpredictable errors. If you intentionally want to create a global variable (i.e. to define a library such as JQuery or Underscore), explicitly add it to your environment's global context: 

```js
// node
global.myGlobal = "it's a small world, after all";

// browser
window.myGlobal = "it's a small, small world";

```

## Linting is your friend

 **Linting** your code (discussed [here][linter]) can help you enforce this.

[linter]: linting-js.md
