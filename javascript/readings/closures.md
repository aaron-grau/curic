# Closures and scope

## Scope

The **scope** of a method is the set of variables that are available
for use within the method. Scope in JS is nested:

```javascript
function sum(nums) {
  var count = 0;

  function addNum(num) {
    // `count` here refers to the outside defined count variable.
    // We can access it in here, because at the point where `addNum`
    // is defined, `count` was "in scope".
    count += num;
  }

  // run the addNum function for each num
  nums.forEach(addNum);

  return count;
}

sum([1, 3, 5]) // => 9
```

The variables available when we call a function include:

0. the arguments
0. any local variables declared inside the function
0. **any variables that were declared when the function was first
   defined**.

Scopes are nested. A new, inner scope is created each time a function
is called. The function can refer to this new, current scope, or
anything from the enclosing scope.

Not only can we access the outside variables, we can even reset
them. This is what lets the `addNum` method modify the outside `count`
variable.

In JavaScript, every function has access to the variables from
enclosing scopes. Functions that use (or **capture**) these variables
(called **free variables**) are called **closures**. `addNum`, which
captures `count`, is a closure.

## Examples

Lots of helper code (for instance, `_.times`) will take a function and
call it later. A typical limitation is that the passed function may
not take any arguments. To get around this problem, we introduce an
anonymous closure which takes no arguments, but references variables
from outside its definition.

```javascript
function greetTenTimes(name) {
  _.times(10, function () {
    // captures `name` from outside.
    console.log("Hello, " + name + "!");
  });
}
```

In JavaScript, this kind of thing happens **all the time**. This is a
very, very common JS technique, so become familiar with it :-)

### Private state

Another major use of closures is to create some private state. For
example:

```javascript
function makeCounter() {
  var count = 1;

  return function () {
    return count++;
  };
}

var counterFn = makeCounter();
console.log(counterFn()); // => 1
console.log(counterFn()); // => 2
```

By **closing over** (or **capturing**) the `count` variable, the
returned function is more object-like. Calling it repeatedly with the
same (zero) arguments gives different results, because it references
private, mutable state (the `count` variable).

The returned counter closure is sort-of like an object, in that it has
its own state. That's a cool technique, and it's a good fit for
something simple like this.

However, a more straightforward solution using a class is probably the
better solution:

```javascript
function Counter () {
  this._count = 0;
}

Counter.prototype.fire = function () {
  this._count += 1;
  return this._count;
};

var counter = new Counter();
counter.fire(); // => 1
counter.fire(); // => 2
```

One advantage of the closure way is that the count is **truly
private**. In the second example, a foolish user might set
`counter._count` inadvertently. In the first example, there is no way
anyone beside the closure can access the state.

True privacy is overrated. As you recall, nothing is truly private in
Ruby; we can always call `send` to defeat privacy protections. A good
compromise in JavaScript is to name "private" attributes with a
leading underscore: `_count` should indicate to the user that they
ought not mess with this variable. This is good enough.

## Global Scope

JavaScript also has a global scope that is available to all code
running. Global variables can be accessed and altered by any code.
They're held in a special object called the global object. In the
browser, this object is called `window`. In Node.js, it's called
`global`. While useful on occasion, global variables are usually best
avoided, as they give too much code access to their values, increasing
the likelihood of bugs. So you should strive to create as few global
variables as possible. A general pattern is to create one global
variable to represent your program, assign an object to it, then store
all the components of your program in that object. This is called
namespacing. You'll learn more about this pattern soon.

### `"use strict";`

A common mistake new JS developers commit is to unintentionally create
global variables. This happens if you declare a variable without the
`var` keyword anywhere in your code, and can lead to strange behavior.
Thankfully, modern JS runtimes support *strict mode*, a state in which
the runtime disallows dangerous practices like declaring variables
without `var`.

Simply place `"use strict";` at the start of your file or function,
and Node or the browser will throw a helpful error whenever you forget
`var`:

```javascript
"use strict";
var test = function() {
  something = 'hello';
  console.log(something);
}

test(); // Produces "ReferenceError: something is not defined"
```

## References

**Read these!**

* [JavaScript Closures for Dummies][closures-for-dummies]
* [SO: How Do JS Closures Work][so-closures] (the first answer)

[closures-for-dummies]: http://web.archive.org/web/20080209105120/http://blog.morrisjohns.com/javascript_closures_for_dummies
[so-closures]: http://stackoverflow.com/questions/111102/how-do-javascript-closures-work
