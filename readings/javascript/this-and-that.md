# `this` and that

We've learned about the special `this` variable. When we call a
function "method style" (`object.method()`), the special variable
`this` gets set to `object`. `this` is a lot like `self` in Ruby.

There is one evil thing about `this`, and it comes up when we pass
callbacks. Observe, dear reader:

```javascript
function times(num, fun) {
  for (var i = 0; i < num; i++) {
    fun(); // call is made "function-style"
  }
}

var cat = {
  age: 5,

  ageOneYear: function () {
    this.age += 1;
  }
};

cat.ageOneYear(); // works

times(10, cat.ageOneYear); // does not work!
```

The first call to age the cat works. But the calls to increment the
cat's age ten times don't.

```
~$ node test.js
{ age: 6, ageTenYears: [Function] }
```

The `ageOneYear` method uses the special `this` variable. But the
`this` variable **will not be set properly unless we call a function
"method-style"**.

```javascript
obj.method(); // called method style; `this` set properly

var m = obj.method;
m(); // called function style; `this` not set properly
```

In the example, we pull out the `cat.ageOneYear` method and pass it
to `times`. `times` calls the method, **but it calls it
function-style**. When we call a function "function-style", `this` is
set to `window`, which is the top-level JavaScript object. Global
variables are defined on `window`.

More simply, `this` will not be set to `cat` if we call `ageOneYear`
function style.

There are two ways around this problem. The first is to introduce a
closure to capture `cat`:

```javascript
// `times` is the same:
function times(num, fun) {
  for (var i = 0; i < num; i++) {
    fun(); // call is made "function-style"
  }
}

var cat = {
  age: 5,

  ageOneYear: function () {
    this.age += 1;
  }
};

// Function argument is different:
times(10, function () {
  cat.ageOneYear();
});
```

`times` will still call the passed function function-style, so `this`
will still be set to `window`. But the closure doesn't care, **because
inside it explicitly calls `ageOneYear` method style on `cat`**.

This is a very common pattern, so there is another, less verbose
alternative:

```javascript
times(10, cat.ageOneYear.bind(cat));
```

`bind` is a method you can call on JS functions. JS functions are
objects, too! Methods of `Function` objects live in
`Function.prototype`.

`bind` creates the anonymous function we had made by hand, in which
the function `cat#ageOneYear` is called method style on the `cat`
object. The function returned by `cat.ageOneYear.bind(cat)` will
still be called function style, but inside it will call `ageOneYear`
on `cat` method style.

Note that we could do crazy things like this:

```javascript
var crazyMethod = cat.ageOneYear.bind(dog);
```

Here, `crazyMethod()` will call the `Cat#ageOneYear` method, but
`this` will be bound to the object `dog`. You don't want to do this,
but I want to illustrate how the `bind` method works.

We'll soon define our own `Function#myBind` method. Soon!

## More trouble

Let's see the same problem in another context:

```javascript
function SumCalculator() {
  // scope 0
  this.sum = 0;
}

SumCalculator.prototype.addNumbers = function (numbers) {
  // scope 1
  numbers.forEach(function (number) {
    // scope 2
    this.sum += number; // noooo!
  });

  return this.sum;
};
```

For the same reason as before, the use of `this` in scope 2 will not
work. Because the anonymous function will not be called method style
by `Array#forEach`, the special `this` variable will not be set
properly. That makes sense if you think about it: the anonymous
function is not even a method of `SumCalculator`!

This problem can be hard to spot, because even though we are using
`this` in a method of `SumCalculator`, we're also inside an anonymous,
nested function which will be called function style. **That makes the
problem hard to spot**. In particular, the correct use of `this` in
scope 1 will mean something different than the incorrect use in scope
2.

This sort of runs counter to the philosophy of closures: that they can
access variables defined in the enclosing scope. `this` is special
because **it doesn't get captured; it gets reset everytime a function
is called**.

The typical solution is to introduce a normal variable to hold `this`
in a way that can be captured:

```javascript
function SumCalculator() {
  // scope 0
  this.sum = 0;
}

SumCalculator.prototype.addNumbers = function (numbers) {
  var sumCalculator = this;

  numbers.forEach(function (number) {
    sumCalculator.sum += number; // will work as intended
  });

  return this.sum;
};
```

Because `sumCalculator` is a normal local variable (as opposed to the
special `this` variable), it can be captured and used by the closure
in the usual way. Later, when the closure is called function style, it
won't matter, because instead of using `this` (which would have been
reset to `window`), we instead use `sumCalculator`, which holds the
old reference to the `SumCalculator` object that `addNumbers` was
called on.

Instead of `sumCalculator`, you may often see people name a variable
like this `that`. `that` is just a conventional name, there is no
magic to it. A somewhat less common name is `self`. I prefer a less
abstract name like `sumCalculator`, but it is a matter of personal
code style.

To repeat: the reason this solution works is because `sumCalculator`
is a normal variable captured according to typical rules, while `this`
is a special variable **which is never captured and is reset on every
function call**.

Some people consider the error-prone nature of `this` to be a bad part
of JavaScript and a mistake. I'm not sure if I agree with them: the
existing behavior is (with practice!) easy to understand, even if it
is error-prone. I'm not sure a more complicated solution would have
really been better. People debate this.
