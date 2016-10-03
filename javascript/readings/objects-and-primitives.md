# JavaScript Objects

## JS Data Types

Recall the different data types in JavaScript:
* 5 Primitive Types:
  * Numbers
  * String (text)
  * Boolean
  * Undefined
  * Null
* and **objects**.

Let's discuss the differences between JS primitives and objects.

## Primitives vs. Objects

A primitive type is data that is not an object and cannot have methods. This is
different from Ruby where everything is an object and we could do things like:

```ruby
(irb)> -5.abs
# => 5
```
This calls the method `abs` on the `-5` object.

In JavaScript, numbers are primitives and do not have object methods. Thus, the
equivalent would be:
```js
> Math.abs(-5)
// => 5
```

Here we are calling the method `abs` on the `Math` object and passing in the
number `5` as an argument.

It is important to understand not just the syntactic difference between these
two examples, but to also understand the fundamental difference between how the
two languages represent data:

+ in Ruby everything is an object;
+ whereas in JS there are primitive data types that are *not* objects.

## JS Objects
Objects in JavaScript are similar to objects in Ruby in that they can store both
state (Ruby instance variables) and behavior (Ruby methods).

In JavaScript you can construct a new object like so:

```js
var cat = {
  name: "Breakfast",
  age: 8,
  purr: function () {
    console.log("meow!");
  }
};
```

We say that `name`, `age`, and `purr` are the **properties** of the `cat`
object. We access the values of these properties using the dot or bracket
notation.

```js
// using Bracket-Notation
console.log(cat['name']); // => Breakfast
// using Dot-Notation
console.log(cat.age); // => 8

// calling a method
cat.purr(); // => 'meow!'

// reassigning properties
cat.name = "Earl";
cat['age'] += 1;
```

Similar to hashes in Ruby, objects in JS are just a collection of associated
properties and values.

**NB**: There is a key difference between Javascript objects and Ruby objects in terms of how state and behavior are treated.
* In **JavaScript**, state and behavior of the object are treated the same way. Both are accessible as properties of the object.
* In **Ruby**, state and behavior are separated into instance variables and methods which are accessed differently (ie. `@ivar`, vs `self.method_name`).
