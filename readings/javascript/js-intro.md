# JavaScript Introduction - Part I

Welcome to JavaScript! Make sure to follow along, type things in, and play with the new syntax as you make your way through this JS intro.

## JavaScript Environment

JavaScript runs in 2 main environments: the browser and Node. Using the browser involves more than just understanding JavaScript, but also HTML, CSS, and familiarity with the browser environment. Running our code in the Node environment will allow us to focus purely on learning JavaScript.

So what is Node exactly? The [website](https://nodejs.org/en/) has a pretty good description. But the gist is that it is a way of running JavaScript outside of the browser environment.

Head over to the [server side javascript reading][server-side-javascript] and download Node if you haven't already.

Got it working? Congratulations! Time to learn JavaScript.

[server-side-javascript]:./server-side-javascript.md

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

In JavaScript, in order to use a variable, we must declare it. Variable
declaration is the act of introducing the variable to the environment. When we declare
a variable, we will often initialize it to a value.

To declare a variable, use the `var` keyword, followed by a space and then the name of the variable.

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

Note: You may have noticed that it is possible to assign a variable in JS without `var`, but beware! Assigning a variable without `var` puts it in the global scope. More on scope later.

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
} else if (x === 4) {
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

Ready for some practice problems? Try writing out these simple functions in JavaScript
to get a handle on the syntax.

### isOdd
**Input:** A Number.

**Output:** A Boolean. `true` if the number is odd, otherwise `false`

```javascript
> isOdd(2)
false

> isOdd(5)
true

> isOdd(-17)
true
```

### yell
**Input:** A String. Assume no punctuation.

**Output:** A String. A yelled version of the input.

```
> yell("I want to go to the store")
"I WANT TO GO TO THE STORE!!!"

> yell("Time to program")
"TIME TO PROGRAM!!!"
```

### isSubstring
**Input**
* 1) A String, called `searchString`.
* 2) A String, called `subString`.

**Output:** A Boolean. `true` is the `subString` is a part of the `searchString`.

```
> isSubstring("The cat went to the store", "he cat went")
true

> isSubstring("Time to program", "time")
true

> isSubstring("Jump for joy", "joys")
false
```

# Javascript Introduction - Part II

Keep on testing things out in Node as we go!

## Looping

Time to loop! The most common loops in JavaScript are the `for` loop and `while` loop.

### for loop

The structure of a `for` loop is as follows:

```javascript
for ([initialization]; [condition]; [incrementer]) {
  //do something...
}

for (var i = 0; i < 10; i += 1) {
  console.log(i)
}
```

* `[initialization]` - This is where you initialize a variable that will be used
as the counter. This counter will be updated in the incrementer and checked in
the condition.
* `[condition]` - If it evaluates to true, we do another loop. If false, we
don't.
* `[incrementer]` - This is evaluated after every iteration of the loop. **This
step should bring the counter that was created in the `[initialization]` closer
to a `[conditional]` that evaluates to false**

### while loop

```javascript
while([conditional]) {
  //do something...
}

var i = 0;

while(i < 10) {
  console.log(i);
  i += 1;
}
```

* `[conditional]` - If it evaluates to true, we do another loop. If false, we
don't.

Here's an example that prints the numbers 0 to n - 1.

```javascript
function printN(n) {
  var i = 0;

  while(i < n) {
    console.log(i);
    i += 1;
  }
}
```

Can you write this using a `for` loop?

### Looping Keywords

* `break` - Terminates the loop.

* `continue` - Skips the current loop iteration.

If we wanted to change our `printN` function so that it skipped multiples of 5,
we could write:

```javascript
function printNSkip5(n) {
  var i = 0;

  while(i < n) {
    if(i % 5 === 0) {
      i += 1;
      continue;
    }

    console.log(i);
    i += 1;
  }
}
```

If we wanted to change our `printN` function so that it stops as soon as it hits
a multiple of 5, we could write:

```javascript
function printNStop5(n) {
  var i = 0;

  while(i < n) {
    if(i % 5 === 0 && i !== 0) {
      break;
    }

    console.log(i);
    i += 1;
  }
}
```

## Practice Problems

Carry on! Know your loops!

### fizzBuzz
3 and 5 are magic numbers. Define a function `fizzBuzz(array)` that takes an array
returns a new array of every number in the array that is divisible
by either 3 or 5, but not both.

### isPrime

Define a function `isPrime(number)` that returns `true` if `number` is prime.
Otherwise, false. Assume `number` is a positive integer.

```javascript
> isPrime(2)
true

> isPrime(10)
false

> isPrime(15485863)
true

> isPrime(3548563)
false
```
### sumOfNPrimes

Using `firstNPrimes`, write a function `sumOfNPrimes(n)` that returns the sum of
the first `n` prime numbers.

```javascript
> sumOfNPrimes(0)
0

> sumOfNPrimes(1)
2

> sumOfNPrimes(4)
17
```
