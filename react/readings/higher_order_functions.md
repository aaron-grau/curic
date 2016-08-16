# Higher-order Functions

** Functions that operate on other functions, either by taking them as arguments or by returning them, are called "higher-order functions." **

If that made perfect sense to you, then skip ahead to the "examples" part of this reading.

Functions, in JavaScript and several other programming languages, are just normal values. This perspective makes it especially easy to abstract over the actions they represent.

### Lexical Scoping

Lexical scoping tends to come in handy when writing higher-order functions (as a reminder, lexical scoping is when inner functions get access to all of the variables defined in an outer function). Consider the following program:

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

The above function receives a function as an argument and calls that function in the function it returns. The function would not work if the function `f` was not lexically scoped.

## ES6 Syntax

ES6 makes it easy to compose higher-order functions. The two examples below illustrate the same function:

```js
function outerLevel(args1) {
  const middleLevel = (args2) => {
    const innerLevel = (args3) => {
      console.log(`${args1} came before ${args2} and ${args3} came last`);
    };
  };
}

const outerLevel = args1 => args2 => args3 => {
  console.log(`${args1} came before ${args2} and ${args3} came last`);
};
```

## Examples

+ Functions that create functions
  + i.e., the metaprogramming you did in the ActiveRecord and Rails Lite projects
+ Functions that use callbacks
  + i.e., `each`/`forEach`, `$.ajax`