# Ways to Call a Function

Let's review the various ways to call a function that we have learned:

* Function-style (`fun(arg1, arg2)`)
    * `this` is set to `window`
* Method-style (`obj.method(arg1, arg2)`)
    * `this` is set to `obj`
* Constructor-style (`new ClassName(arg1, arg2)`).
    * Creates a new, blank object.
    * Sets its `__proto__` property to `ClassName.prototype`.
    * The `ClassName` function is called with `this` set to the
      blank object.
        * Your constructor function should setup the variables.
        * Implemented like the `initialize` method from Ruby
        * The return value is ignored.

Note that callbacks (that is, functions you pass to other functions)
are almost always eventually called function style, which makes `this`
the global object.  Make sure you either use an anonymous function
with the `var that = this` trick or `bind` to ensure that `this` is
set properly in your callback.

## Two last ways to call functions

Let me regale you with two more ways to call a function: `apply` and
`call`. You will not use these very commonly, but you will see them in
library code that you read. They are quite simple, but they take
practice.

### Apply

`Function#apply` takes two arguments: an object to bind `this` to, and
an array of arguments to be passed to the method `apply` is being
called on. This is what it looks like:

```javascript
obj = {
  name: "Earl Watts"
};

// weird function; how is `this` supposed to be set if we don't call
// `greet` method style?
function greet(msg) {
  console.log(msg + ": " + this.name);
}

greet.apply(obj, ["hello"]);
```

Okay, so what's going on here? Let's start with the first argument that
got passed, `obj`. `apply` wants to know what object to bind `this`
to. `apply` simulates calling `greet` as a method on `obj`. This is
sort of like saying `obj.greet("hello")`, except `greet` isn't an
attribute of `obj`, so we couldn't call it that way exactly.

Note that the second argument to `apply` is an array of arguments to
be passed to the function, `greet`.

### Call

`Function#call` is really similar to `apply`, but instead of taking in
an array of parameters, it takes them individually. For example:

```javascript
obj = {
  name: "Earl Watts"
};

function greet(msg1, msg2) {
  console.log(msg1 + ": " + this.name);
  console.log(msg2 + ": " + this.name);
}

greet.call(obj, "hello", "goodbye");
```

Why use `call` since `apply` seems more flexible? There is a slight
performance cost to using `apply` because the arguments need to be
unpacked. Don't worry about it; I just want you to understand why
there is such a similar method.

In general, `call` is more convenient when you know ahead of time what
arguments you want to pass. `apply` is more useful when someone is
going to give you an array of arguments to use.

## Exercises

Write your own `myBind(context)` method. Add it to
`Function.prototype`. You'll want to:

0. Capture `this` (which is the function to bind) in a variable named
   `fn`.
0. Define and return an anonymous function.
0. The anonymous function captures `fn` and `context`.
0. In the anonymous function, call `Function#apply` on `fn`, passing
   the `context`.

Assume the method you're binding doesn't take any arguments; we'll see
tomorrow how to use the special `arguments` variable to fix this.

How would you test your "bind" method out?  Try out this example code:

```js
function Lamp() {
   this.name = "a lamp";
}

var turnOn = function() {
   console.log("Turning on " + this.name);
}

var lamp = new Lamp();

turnOn(); // should not work the way we want it to

var boundTurnOn = turnOn.bind(lamp);
var myBoundTurnOn = turnOn.myBind(lamp);

boundTurnOn(); // should say "Turning on a lamp"
myBoundTurnOn(); // should say "Turning on a lamp"


```
