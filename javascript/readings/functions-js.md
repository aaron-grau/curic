# JavaScript Functions
Functions in JavaScript are just a special type of JS objects. In other words, you can do anything to a function that you can do to an object.

## Assigning a function to a variable

```javascript
var fun = function (name) {
  console.log(`Hi ${name}!`);
};
```

Short-hand assignment:
```js
function fun(name) {
 // ...
}
```

**NB**: There is a slight functional difference to how the two assignments, but
we'll get to that later.

## Assigning properties to a function

```javascript
var fun = function () {
  console.log("So much fun");
};

fun.amount = 100;
console.log(fun.amount);
// => 100
```

This seems like a bizarre thing to do at first, but the ability to treat
functions like any other object is fundamental to JavaScript. We will learn more
and see a more practical example of this when we  discuss [Object-Oriented
Programming][oop] in JavaScript.

[oop]: object-oriented-js.md

## Passing a function as an argument to another function

```javascript
function logIfEven(num) {
  if (num % 2 == 0) {
    console.log(`${num} is an even number!`);
  }
}

[1, 2, 3].forEach(logIfEven);
```

Here we pass the function `logIfEven` to `Array`'s [`forEach`][for-each] method.
`forEach` will call `logIfEven` for each element in the array, passing in the
value. `forEach` is a function that takes another function (ie. a *callback*) as
an argument.

Let's write our own `forEach`:

```javascript
function myForEach(array, cb) {
  for (var i = 0; i < array.length; i++) {
    cb(array[i]);
  }
}

myForEach([1, 2, 3], logIfEven);
```

It is very common to pass *anonymous functions* as arguments:

```javascript
// **Notice the formatting!**
[1, 2, 3].forEach(function (num) {
  if ((num % 2) == 0) {
    console.log(num);
  }
});
```

The key difference between a function and an object in JavaScript is that
functions can be invoked with the `()` operator while regular objects cannot.

[for-each]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

## JS functions in Ruby

In Ruby you can accomplish a similar thing by create a `Proc` from a `block`, but the importance of functions as first class objects is greater in JavaScript.

```ruby
# a Proc is an object oriented version of a function
my_proc = Proc.new { |name| puts "Hi #{name}!" }
```
