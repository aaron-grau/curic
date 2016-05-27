# JavaScript Introduction - Part I

Welcome to JavaScript! Make sure to follow along, type things in, and play with the new syntax as you make your way through this JS intro.

## JavaScript Environment

JavaScript runs in 2 main environments: the browser and Node. Using the browser involves more than just understanding JavaScript, but also HTML, CSS, and familiarity with the browser environment. Running our code in the Node environment will allow us to focus purely on learning JavaScript.

So what is Node exactly? The [website](https://nodejs.org/en/) has a pretty good description. But the gist is that it is a way of running JavaScript outside of the browser environment.

Head over to the [server side javascript reading][server-side-javascript] and download Node if you haven't already.

Got it working? Congratulations! Time to learn JavaScript.

[server-side-javascript]:./server-side-javascript.md

## ECMAScript Versions

ECMAScript is the standardized scripting language that forms the basis for JavaScript. From 2009-2015, the most recent stable version of ECMAScript was ECMAScript 5, or ES5 for short.

The new ES6 standard was released in June 2015 and has added a wide variety of new features to javascript. ES6 features have been widely adopted across most browsers, but a number of environments still lag behind. ([See Compatibility.](http://kangax.github.io/compat-table/es6/))

It is important to be aware of the features you're using, and whether or not they are ES5-compatible. Features that are new to ES6 have been clearly indicated in this reading and in the MDN Documentation (example: [documentation for `indexOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) - scroll down to the 'specifications' section for info on which ECMAScript versions the feature is compatible with. In this case, the feature `indexOf` is ES5-compatible.)

Later in the course when we write code that will run in the browser, we will be using tools such as `babel` to translate our ES6 to vanilla ES5.

## JavaScript Data Types

Before we start manipulating data, we first have to know what kinds of data we can manipulate. JavaScript provides 5 primitive data types for us:

* Numbers
* String (text)
* Boolean
* Undefined
* Null

## NaN

`NaN` stands for "not a number". This is the result of any illegal numerical
operations. Type the below in your console:

```javascript
> 20 * "happy"
NaN
```

## Falsey vs Truthy

In Ruby, the only falsey values are `nil` and `false`.

```ruby
if 0
  puts 'In Ruby, this will print'
end

```

In Javascript, zeros, empty strings, `undefined`, `null`, and `NaN` are all considered falsey values. Everything else is true.

```javascript
if(0) {
  console.log('In JavaScript, this will not print.')
}

```
Take care when writing conditional statements in JavaScript! Try testing out conditionals with the other falsey values in Node.


### Declaring Variables

There are a few different ways to declare variables and constants in JavaScript. We go over the use cases for each.

1. `var`
2. `let` (ES6+)
3. `const` (ES6+)

Note: the subsections below talk a great deal about scoping in JavaScript. More on this to come!

#### In the absence of `var`, `let`, or `const`

In JavaScript, in order to use a variable or constant, we must declare it. Variable
declaration is the act of introducing the variable to the environment. When we declare a variable, we will often initialize it to a value.

JavaScript won't raise an exception if you forget to use one of the above binding constructs - it'll just declare a global variable by default. As a general rule, we want to avoid declaring global variables because they can clutter up the global namespace and lead to unpredictable errors. For this reason, always make sure to declare your variables with a binding construct like `var`. Using a linter in your text editor (discussed in a later reading) can help you enforce this.

#### `var`

To declare a function-scoped variable, use the `var` keyword, followed by a space and then the name of the variable.

```javascript
var myVar;
```

To initialize it to a value, simply assign the variable to a value when you
declare it. Say, for instance, that we wanted `myVar` to equal the number 5:

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

> myVar; // We can use myVar without error because we declared it.
undefined // Evaluates to undefined because we did not initialize myVar to any value.

> myVar = 5;
5

> myVar + 2; // What will this evaluate to?
```

Notice that when I declare or initialize a variable, node prints out something
underneath it. That is the return value. Everything is javascript has a return
value, even declaration and initialization. `undefined` is the default return
value.

We can also declare and initialize a variable on the same line.
```javascript
> var myOtherVar = "Anthony";
"Anthony"

> "Hello " + myOtherVar; // What will this evaluate to?
```

#### `let`

`let` is a new feature in ES6.

We can use `let` to declare block-scoped variables, like in Ruby blocks. How are block-scoped variables different than function-scoped variables? Consider the following:

```javascript
function functionScoped() {
  var x = 'out of block';
  if (true) {
    var x = 'in block';  // same variable!
    console.log(x);  // 'in block'
  }
  console.log(x);  // 'in block'
}

function blockScoped() {
  let x = 'out of block';
  if (true) {
    let x = 'in block';  // different variable!
    console.log(x);  // 'in block'
  }
  console.log(x);  // 'out of block'
}
```

Examples of blocks in javascript include `if` statements, `while` loops, `switch` statements, and `for` loops.

One note: JavaScript will raise a `SyntaxError` if you try to declare the same `let` variable twice in one block.

For a more detailed description of `let`, please refer to the [MDN Documentation][mdn-let].

#### `const`

`const` is a new feature in ES6.

We use `const` to declare constants. Constants should be used for constructs that will not be redeclared or reassigned.

Properties of constants:
* They are block-scoped like `let`.
* Unlike Ruby constants, JavaScript will actually enforce constants by raising an error if you try to reassign them.
* Trying to redeclare a constant with a `var` or `let` by the same name will also raise an error.
* You should name constants in `SCREAMING_SNAKE_CASE` by convention.

A quick example:

```javascript
const FAVORITE_FOOD = "Cheeseboard pizza";

const FAVORITE_FOOD = "Some inferior food"; // this will raise an error

var FAVORITE_FOOD = "Some other inferior food"; // this will also raise an error

FAVORITE_FOOD = "Cardboard middle school pizza"; // this will fail silently but won't raise an error

if (true) {
  const = FAVORITE_FOOD; // this will also raise an error
  console.log(FAVORITE_FOOD); // outputs "Cheeseboard pizza"

  const FAVORITE_DRINK = "coffee"; // this is scoped to the block
  console.log(FAVORITE_DRINK) // outputs coffee
}

const FAVORITE_DRINK = "Harmless Coconut Water"; // declared after block, works fine

console.log(FAVORITE_DRINK) // outputs "Harmless Coconut Water"
```

## Useful Methods

You'll notice that many of these operators are very similar to Ruby! Give them a try in Node.

### Miscellaneous
* `console.log`

This is similar to puts in Ruby.

```javascript
> console.log('hello')
hello
```

* comments

```javascript
// this is a javascript comment
```

### Mathematical Operators

* `+`
* `-`
* `*`
* `/`
* `%`

### Comparison Operators

* `>`
* `<`
* `>=`
* `<=`
* `===`
* `!==`

__NB:__ Three equals signs? What's that about? There is a double equals operator (`==`)
in JS as well, but we'll mostly be sticking with `===`. The double equals sign does some
type conversion which can lead to confusing results. Learn more about it in *Effective Javascript*.

### Logical Operators

* `&&`
* `||`
* `!`

### String Methods

* `String.prototype.toLowerCase`
* `String.prototype.toUpperCase`
* `String.prototype.indexOf`
* `+`

*We will talk about this `prototype` later, but for now just now that a class's methods are defined on it*

### Template Literals

Template Literals are a new feature in ES6.

With ES6, we can now use string interpolation, much like in Ruby.

Ruby:
```ruby
  name = "Brooke"
  favorite_food = "pizza"

  puts "Hi, my name is #{name} and my favorite food is #{favorite_food}!"
```

Note that in order to use template strings, we must surround our string with the grave character (back tick).

Javascript:
```javascript
  var name = "Brooke";
  var favoriteFood = "pizza";

  console.log(`Hi, my name is ${name} and my favorite food is ${favoriteFood}!`);
```

We can also use template literals to create multiline strings:

```javascript

// Old way: insert \n for newline
console.log("line 1\n"+ "line 2");

// New way - use template literal
console.log(`string text line 1
string text line 2`);

```

### Array Properties

* `Array.prototype.length`

### Array Methods

* `Array.prototype.pop`
* `Array.prototype.push`
* `Array.prototype.unshift`
* `Array.prototype.shift`
* `Array.prototype.indexOf`

`Array.prototype.indexOf` is a useful one. It's similar to `Array#index` in Ruby,
but returns -1 when it does not find an item. Think about how you might write `Array.prototype.includes` in
JavaScript using `Array.prototype.indexOf`.

```javascript
> [1,2,3].indexOf(2)
1

> [1,2,3].indexOf(4)
-1

```

* Bracket notation (similar to Ruby)

`['a', 'b', 'c'][0] === 'a'`

* `Array.prototype.slice([start, [end]])`

Makes a copy of an array from the start index up to but not including the end index. Arguments optional.

Ruby:
```ruby
> ['a', 'b', 'c'][1..2]
['b', 'c']

 ```

JavaScript:
```javascript
> ['a', 'b', 'c'].slice()
['a', 'b', 'c']

> ['a', 'b', 'c'].slice(1)
['b', 'c']

> ['a', 'b', 'c'].slice(0, 2)
['a', 'b']
```
* `Array.prototype.splice(start, deleteCount)`

This one splices `deleteCount` elements out of the array, beginning at `start`.

```javascript
// myFish is ['angel', 'clown', 'drum', 'mandarin', 'surgeon']
// removes 1 element from index 3
removed = myFish.splice(3, 1);
// myFish is ['angel', 'clown', 'drum', 'surgeon']
// removed is ['mandarin']
```

## Syntax

### ;

Every statement needs a semi-colon at the end. This is like a period for the
computer. Although you may find that your programs will sometimes work without
them **leaving out semi-colons is a very bad practice because it makes your code
more error prone**.

### ( )

Functions are called a bit differently in JavaScript than in Ruby.
Parentheses are used when defining functions and calling functions. We will talk
more about defining functions below. When calling a function, if you forget to add
the parentheses, you'll see that it evaluates to `[Function]` - that is how node
represents function object. To actually run the function, you must add parentheses.
For an example, see below:

```javascript
> "Happy".toUpperCase
[Function]

> "Happy".toUpperCase()
"HAPPY"
```

### { }

Curly brackets are used in several programming constructs - function definitions,
loops, if-statements. They wrap around the block of code that belongs to that
construct.

Curly brackets also define `objects`, but more on that later :)

In Ruby:

```ruby
if x == 3
  puts 'YAY X IS 3'
elsif x == 4
  puts 'YAY X IS 4'
else
  puts 'OH NO, X IS NOT 3 OR 4!'
end
```

```javascript
if (x === 3) {
  console.log('YAY X IS 3');
} elsif (x === 4) {
  console.log('YAY X IS 4');
} else {
  console.log('OH NO, X IS NOT 3 OR 4!');
}
```

## Creating a Function

Let's say we wanted to create a function called `addThree`.
The specification of this function describes it as taking as an input any three
numbers and returning as the output the sum of those numbers. For example:

```javascript
> addThree(1, 1, 1);
3
> addThree(0, 1, -15);
-14
> addThree(5, 100, 30);
135
```

The syntax for defining a function is as follows:

```javascript
function nameOfFunction(param1, param2, param3, paramN){
  //function body...
}

OR

var nameOfFunction = function(param1, param2, param3, paramN){
  //function body...
}
```

Let's see how we would define our `addThree` function.

```javascript
function addThree(number1, number2, number3){
  return number1 + number2 + number3;
}
```

Note that in JavaScript, we must use `return`. There is no implicit return at
the end of methods like in Ruby.

## Practice Problems

Ready for some practice problems? Complete [homework part I][intro-js-homework] to get a handle on the syntax.

[intro-js-homework]: ../homeworks/questions/js_intro.md
[mdn-let]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
