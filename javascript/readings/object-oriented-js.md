# Object-oriented JavaScript

## JavaScript is functional

JavaScript treats functions like other values:

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

Ruby sort-of supports functional programming through blocks:

```ruby
# a method can not be stored in a variable or passed to another method.
def my_method(name)
  # ...
end

# a Proc is sort-of an object oriented version of a method.
my_proc = Proc.new { |name| puts "I'm sorry, #{name}..." }
```

However, in Ruby there is a world of difference between a `Proc` and a
method, which is not an object at all.

In JavaScript, it is idiomatic to pass functions to other functions:

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

It is very common to pass function-arguments as *anonymous
functions*:

```javascript
// **Notice the formatting!**
[1, 2, 3].forEach(function (num) {
  if ((num % 2) == 0) {
    console.log(num);
  }
});
```

## JavaScript is Object-oriented

The JavaScript equivalent to a Ruby `Hash` is called (somewhat
confusingly) an **object**:

```javascript
var cat = {
  name: "Breakfast",
  age: 8
};

console.log(cat['name']); // => Breakfast
// can also use dot-notation as a shortcut for bracket notation.
console.log(cat.age); // => 8

cat.name = "Earl";
cat['age'] += 1;
```

Like Ruby hashes, JavaScript objects are good for collecting up
packages of data. Unlike Ruby, we can also assign functions as the
values inside a JavaScript object. These functions are JavaScript's
version of *methods* (which are, strictly speaking, functions called
on an object).

```javascript
var cat = {
  name: "Breakfast",
  age: 8,

  purr: function () {
    console.log("meow!");
  },

  ageOneYear: function () {
    // more about `this` momentarily
    this.age += 1;
  }
};

cat.purr(); // logs 'meow!'
cat.ageOneYear(); // ages cat one year
```

`cat.purr()` should be pretty non-magical to you. Let me write it this
way:

```javascript
// extract the function from the object
var catPurrFunction = cat['purr'];
// call the function
catPurrFunction();
```

This pulls out the value in cat associated with the key `purr`. This
is a function, so in the next line we call it. We can write this more
succinctly as merely `cat.purr()`, of course.

### `this`

Now comes the magic. When we call a function like `cat.purr()` or
`cat.ageOneYear()`, a magical variable named `this` gets
set. Through the `this` variable, the method can access the object it
was called on. `this` is a lot like `self` in Ruby.

We do not use `this` in the `purr` method, but we will in
`ageOneYear`. In `ageOneYear`, we use `this` to access the
object the method was called upon, and modify the `age` attribute.

Unlike Ruby, `this` is not optional if you want to access attributes
of the object a method is called on. Here's another example:

```javascript
var cat = {
  purr: function () {
    console.log("meow");
  },

  purrMore: function () {
    for (var i = 0; i < 10; i ++) {
      // using just `purr` without `this` won't work
      this.purr();
    }
  }
};
```

If you used `purr` instead of `this.purr`, the function will look for
a **variable** named `purr` in the enclosing scope. There is no such
variable; the only variable is `cat`. However, `cat` is an object with
two **keys**: `purr` and `purrMore`. So by using `this.purr`,
`purrMore` can access another method.

**Note the difference between a variable and a key.**

Methods are always called like so: `object.method(arguments, ...)`. It
is because we use the dot notation that the `this` variable gets set
properly (with `object`).

Calling a function in the traditional **function style** (`f(a, b,
c)`) **does not** set `this` properly. It's only if we call a function
**method style** (`obj.method(a, b, c)`) that `this` gets set to
`obj`.

## Classes in JavaScript: constructor functions

JavaScript does not have a traditional class system like Ruby
does. Instead of declaring classes in JS, you instead define a
constructor function:

```javascript
function Kitten(name, age) {
  this.name = name;
  this.age = age;

  this.meow = function () {
    console.log(this.name + ' says "meow!"');
  };
}

var kitten = new Kitten("Earl", 2);
```

Invoking a function with the special `new` keyword calls the function
with `this` set to a new blank object. This blank object will be
returned by the constructor as the new `Kitten` instance.

We can set attributes inside the constructor with `this.key =
value`. Note that we don't declare any variables with `var`; those
would be temporary and thrown away at the end of construction. Instead,
we persist data by saving it to object attributes.

Notice that `Kitten` **does not return anything**. Like `initialize`
in Ruby, *constructor functions* in JS shouldn't return a
value.

Because constructor functions are invoked differently than normal
functions, make sure to name constructor functions in CamelCase, so
they're clearly different than normal functions. A common mistake is
to call constructor functions without the `new`. If you do that,
`this` will not be set properly, and no new object will be created.

## Methods and Prototype

Our previous example added a `meow` method to our `Kitten` object by
saving a function to the `meow` attribute of the newly constructed
`Kitten` object. This is OK, but each time you build a `Kitten`
object, you'll create a new function object to save as `meow`.

This is redundant, all the `Kitten` objects should share a single
`meow` method. In particular, it will take more and more memory as we
create more-and-more objects. We can eliminate the redundancy by using
the constructor's `prototype`.

```javascript
function Kitten(name, age) {
  this.name = name;
  this.age = age;
}

Kitten.prototype.meow = function () {
  console.log(this.name + ' says "meow!"');
};

k1 = new Kitten("Earl", 2);
k2 = new Kitten("Houdini", 1);
```

Every function object has an attribute, `prototype`. We set instance
methods on the `prototype`.

Whenever we construct a new `Kitten` instance, a special property
`kitten.__proto__` is set to `Kitten.prototype`. This links instances
of the `Kitten` class to the `Kitten.prototype` that stores the
instance methods.

```javascript
k1 = new Kitten("Earl", 2);
k2 = new Kitten("Houdini", 1);

// `Object.getPrototypeOf` is the portable, preferred way to access
// the `__proto__` property.
Object.getPrototypeOf(k1); // == Kitten.prototype
Object.getPrototypeOf(k2); // == Kitten.prototype
```

Later, we may try to access a property of a `Kitten` instance
(`kitten.meow`, for instance). JavaScript first looks for `meow`
amongst the instance's own properties. In our example, these are
`name` and `age`.

Since it doesn't find the `meow` property in the `Kitten` instance,
the rule is that JavaScript will search in `kitten.__proto__`. Here we
do have a value for the `meow` property, so the search is complete and
the value is returned.

Let's see this illustrated a bit more:

```javascript
// error, purr is not defined!
k1.purr();

Kitten.prototype.purr = function () {
  console.log("Purr on, kitten!");
};

// all of a sudden it works! Because `Kitten.prototype` now has a
// `purr` property, `k1` can purr via its `k1.__proto__` reference to
// `Kitten.prototype`.
k1.purr();
```

In this way, even though the `meow` method is only defined once,
because it is stored in `Kitten.prototype`, every `Kitten` instance
can access it via the `__proto__` property.

## Class Methods

We can mimic Ruby class methods and class variables by defining attributes on the constructor itself.

```javascript

Kitten.caboodle = [k1, k2, new Cat('Flying Merkel', 3)];

Kitten.parade = function() {
  Kitten.caboodle.forEach( kitten => {
    kitten.meow();
  });
}; 

Kitten.parade();
// 'Earl says "meow!"'
// 'Houdini says "meow!"'
// 'Flying Merkel says "meow!"'
```

## Constructor Steps: Recap

Say we call `var cat = new Cat()`. Here's what JS does:

1. JavaScript creates a new blank object.
2. JavaScript sets a special `cat.__proto__` property to
   `Cat.prototype`. This way the instance of the class is connected to
   a prototype where all the instance methods are defined.
4. JavaScript runs the code in the body of the `Cat` function. It sets
   `this` to the blank object. The constructor presumably sets some
   attributes of the object.
6. JavaScript ignores the return value of the constructor function.
   Instead, the new `Cat` instance is returned, and set to `cat`.

## Method calling: Recap

Later, when a `cat.meow()` is requested

0. JavaScript looks in the `cat` object for the `meow` property.
0. It doesn't find it, so it accesses the `cat.__proto__` property.
0. This references `Cat.prototype`, JS searches for `meow` in the
   prototype.
0. `Cat.prototype.meow` is defined, so this is returned.
0. The `meow` method is called method style on `cat`, so `this` is set
   to `cat`.

## References

* http://stackoverflow.com/questions/4886632/what-does-var-that-this-mean-in-javascript
