## Objects and Primitives

Recall the different data types in JavaScript:
* 5 primitive types
  * Numbers
  * String (text)
  * Boolean
  * Undefined
  * Null
* and objects

Let's discuss the difference between primitives and objects

### Primitives vs Objects

A primitive type is data that is not an object and cannot have methods. This is
different from Ruby where everything is an object and we could do things like:
```ruby
(irb)> -5.abs
# => 5
```
This calls the method `abs` on the `-5` object.

In JavaScript, since Numbers are primitives and cannot have methods, the
equivalent would be:
```js
> Math.abs(-5)
// => 5
```
Here we are calling the method `abs` on the `Math` object and passing in `5` as
an argument.

It is important to understand not just the syntatic difference between these two
examples, but to also understand the fundamental difference between how the two
languages represent data: in Ruby everything is an object, whereas in JS there are
primitive data types that are not objects.


### Objects
Objects in JavaScript are similar to objects in Ruby in that they
can store both state (Ruby instance variables) and behavior (Ruby methods).

In JavaScript you can construct new objects like so:
```js
var cat = {
  name: "Breakfast",
  age: 8,
  purr: function () {
    console.log("meow!");
  }
};

console.log(cat['name']); // => Breakfast
// you can also use dot-notation as a shortcut for bracket notation.
console.log(cat.age); // => 8
cat.purr(); // logs 'meow!'

cat.name = "Earl";
cat['age'] += 1;
```

We say that `name`, `age`, and `purr` are the **properties** of the `cat` object and
we access the values of these properties using the dot or bracket notation. JS objects are just a collection of associated properties and values. (This is similar to a hash in Ruby).

**Note**: There is a  key difference between Javascript objects and Ruby objects in terms of how state and behavior are treated.
* In **JavaScript**, state and behavior of the object are treated the same way. Both are accessible as properties of the object.
* In **Ruby**, state and behavior are separated into instance variables and methods which are accessed differently. (@ivar, vs self.method_name)

