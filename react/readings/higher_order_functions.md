# Higher-order Functions

** Functions that operate on other functions, either by taking them as arguments or by returning them, are called "higher-order functions." **

If that made perfect sense to you, then skip ahead to the "examples" part of this reading.

Functions, in JavaScript and several other programming languages, are just normal values. This perspective makes it especially easy to abstract over the actions they represent.

## Lexical Scoping

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

## Composing functions

Composing functions is an idea that you probably first ran into in math class. A function that composes two functions might look like the below code:

```js
const compose = (f, g) => {
  return function(x) {
    return f(g(x));
  }
}
```

This would allow us to do the following:

```js
const timesTwo = (num) => num * 2;
const plusSix = (num) => num + 6;

const plusThenTimes = compose(timesTwo, plusSix);

plusThenTimes(3); // 18

const timesThenPlus = compose(plusSix, timesTwo);
timesThenPlus(3); // 12
```

This pattern applies to more than just mathematical functions, of course - we can use this pattern more generally.

## Currying functions

We've already written `Function.prototype.curry` that takes as an argument a total number of arguments to get passed in and collects arguments until their count reaches that number. At that point, it calls the original function. This pattern allows us to write functions that can take arguments as they become available and, in the meantime, get passed around between other functions.

## ES6 Syntax

ES6 makes it easy to write higher-order functions. The two examples below illustrate the same function:

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