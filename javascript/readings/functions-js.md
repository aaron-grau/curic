# Functions

Functions in JavaScript are actually just a special type of object. In other words, you can do anything to a function that you can do to an object.

## Assigning a function to a variable

```javascript
var num = 42;
var fun = function (name) {
  console.log("I'm sorry, " + name + ", I can't do that");
};


// short-hand for previous variable definition. There is a
// slight functional difference to how the two work, but we don't care
// right now.

function fun(name) {
 // ...
}
```

## Assigning Properties to a function
```javascript
var fun = function () {
  console.log("So much fun");
};
fun.amount = 100;
console.log(fun.amount);
// => 100
```

This seems like a bizarre thing to do at first blush, but the ability to treat functions like any other object is fundamental to JavaScript. We will learn more and see a more practical example of this when we  discuss [Object-Oriented Programming][oop] in JavaScript.

## Passing Around a Function as an Argument to Another Function

```javascript
function logIfEven(num) {
  if ((num % 2) == 0) {
    console.log("Found an even number!");
  }
}

[1, 2, 3].forEach(logIfEven);
```

Here we pass the function `logIfEven` to `Array`'s `forEach`
method. `forEach` will call `logIfEven` for each element in the array,
passing in the value. Let's write our own `forEach`:

```javascript
function forEach(array, fun) {
  for (var i = 0; i < array.length; i++) {
    fun(array[i]);
  }
}

forEach([1, 2, 3], logIfEven);
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

As you can see the difference between a function and an object in JavaScript is that functions can be invoked with the `()` operator while regular objects cannot.

## Comparing JS to Functions as Objects in Ruby

In Ruby you can accomplish a similar thing by create a `Proc` from a `block`, but the importance of functions as first class objects is greater in JavaScript. 

```ruby
# a Proc is an object oriented version of a function
my_proc = Proc.new { |name| puts "I'm sorry, #{name}..." }
```

[oop]: object-oriented-js.md