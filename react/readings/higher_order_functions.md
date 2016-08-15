# Higher-order Functions

** Functions that operate on other functions, either by taking them as arguments or by returning them, are called "higher-order functions." **

If that made perfect sense to you, then skip ahead to the "examples" part of this reading.

Functions, in JavaScript and several other programming languages, are just normal values. This perspective makes it especially easy to abstract over the actions they represent.

### Lexical Scoping

Lexical scoping (inner functions getting access to all of the variables defined in the outer function) tends to come in handy when writing higher-order functions. As an example, consider the following program:

```js
function noisy(f) {
  return function(arg) {
    console.log("calling with", arg);
    var val = f(arg);
    console.log("called with", arg, "- got", val);
    return val;
  };
}

const newLog = noisy(console.log.bind(console)); 
// we bind console because log needs its context to be console instead of window
newLog("this is a test");
// calling with test
// test
// called with test - got undefined
```

The above function receives a function as an argument and calls that function in the function it returns. The function would not work if the variable `f` was not lexically scoped.


## Examples

+ Functions that create functions
  + i.e., the metaprogramming you did in the ActiveRecord and Rails Lite projects
+ Functions that use callbacks
  + i.e., `each`/`forEach`, `$.ajax`