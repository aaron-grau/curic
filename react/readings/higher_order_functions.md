# Higher-order Functions

Functions that operate on other functions, either by taking them as arguments or by returning them, are called **higher-order functions**.

Functions, in JavaScript and several other programming languages, can be passed around as parameters (we call them 'callbacks'). This perspective makes it especially easy to abstract over the actions they represent.

## Closure

Closure, also known as **lexical scoping**, is when inner functions get access to all of the variables defined in an outer function. Closure tends to come in handy when writing higher-order functions. Consider the following program:

```js
const noisy = (f) => {
  return (arg) => {
    console.log("calling with", arg);
    const val = f(arg);
    console.log("called with", arg, "- got", val);
    return val;
  };
}

const newLog = noisy(console.log.bind(console));
// we bind console because log needs its context to be console instead of window
newLog("test");
// calling with test
// test
// called with test - got undefined
```

The above function receives a function as an argument and calls that function in the function it returns. The function would not work if the inner function could not close over `f`.

## Composing functions

Composing functions is an idea that you probably first ran into in math class. A function that composes two functions might look like the below code:

```js
const compose = (f, g) => {
  return (x) => {
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

This pattern applies to more than just mathematical functions, of course -- we can use this pattern more generally.

## Currying functions

We've already written `Function.prototype.curry` that takes as an argument a total number of arguments to get passed in and collects arguments until their count reaches that number. At that point, it calls the original function. This pattern allows us to write functions that can take arguments as they become available and, in the meantime, get passed around between other functions.

## ES6 Syntax

ES6 makes it easy to write higher-order functions. The two examples below illustrate the same function:

```js
// es-5:
function outerLevel(args1) {
  return function(args2) {
    return function(args3) {
      console.log(`${args1} came before ${args2} and ${args3} came last`);
    };
  };
}

// es-6:
const outerLevel = args1 => args2 => args3 => {
  console.log(`${args1} came before ${args2} and ${args3} came last`);
};
```

## Examples of higher-order functions

+ Functions that create functions.
  + i.e., the metaprogramming you did in the ActiveRecord and Rails Lite projects.
+ Functions that use callbacks.
  + i.e., `each`/`forEach`, `$.ajax`.
+ Functions that return functions.
  + i.e. the `outerLevel` and `innerLevel` functions in this reading.
