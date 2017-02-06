# Redux Homework: Intro to Middleware

## Overview

In this homework, you will modify the Todo project's `dispatch` function
so that it does more than just dispatch actions to the store. You will use this
pattern again tomorrow in a more sophisticated way.

Download the provided [skeleton](../../projects/todos/solution_1.zip?raw=true).

**You will be updating `todo_redux.jsx` and `store/store.js`**

Test your code at each step using the provided test cases.

## Setup

+ Install the node packages with `npm install`
+ Use webpack to bundle your javascript files
  + The config file is already written; you should be able to run `webpack -w` and have it work
+ open `index.html` in your browser

**Test the skeleton**: Does it work?

## Logging

In this section, we'll be adding a simple logger to our store's `dispatch` function. It will log the old state, the action, and the new state.

In `todo_redux.jsx`, do the following steps:
+ Write a new function `addLoggingToDispatch` that receives the store as an argument
  + Save `store.dispatch` as a local variable
  + Return a function that receives an action as an argument
    + Log `store.getState()` - this is the old state
    + Log the `action`
    + Call your local copy of `store.dispatch`, passing it the action
    + Log `store.getState()` again - this is the new state
+ Inside the `"DOMContentLoaded"` callback reassign `store.dispatch` to your new function, passing in the `store`

**Test your code**: If you interact with the app, can you see the old state, action, and new state in the console?

## Refactoring

Now let's refactor the code the we just wrote. The functionality of it is great, but overwriting `store.dispatch` is an [anti-pattern][anti-pattern] that we'd really like to avoid.

What we're going to do instead is write a generalized `applyMiddlewares` function that will run either a single middleware or a group of middlewares. `applyMiddlewares` will give the middlewares access to the store's `dispatch` function, as well as the `action` that is being dispatched.

In order to do this, we'll have to turn our `addLoggingToDispatch` function into a middleware:

1. `addLoggingToDispatch` should return a function that receives the `next` middleware as an argument.
1. This inner function will return yet another function that receives the `action`
1. Inside all of this we will need to do the logging and invoke the `next` middleware with the `action`

This might seem confusing at first glance, but it's not so bad. Your code should now look something like the following:

```javascript
function addLoggingToDispatch(store) {
  return function (next) {
    return function (action) {
      // your code here
    };
  };
};
```
which you can refactor using ES6 fat arrow notation to:

```javascript
const addLoggingToDispatch = store => next => action => {
  // your code here
}
```
This is a great real-world example of currying (remember that problem on the Javascript assessment?) - a function collecting arguments across consecutive calls.

Now let's write an `applyMiddlewares` function that receives the store and the list of middlewares as arguments:
+ Create a variable `dispatch`, setting it equal to `store.dispatch`
+ `forEach` middleware in the list of middlewares,
  + Reassign `dispatch` to the result of `middleware(store)(dispatch)`
+ Return `Object.assign({}, store, { dispatch })`

To use this function, let's replace our reassignment of `store.dispatch` inside the `DOMContentLoaded` callback with:
+ A reassignment of `store` to the result of calling `applyMiddlewares`
  + We need to pass in the `store` and each middleware that we want to apply

**Test your code**: If you interact with the app, your logging middleware should still send information about the state and actions to the console.

## Redux `applyMiddleware`

I know what you're thinking - didn't somebody else write code for this? It turns
out that there is! It's called `applyMiddleware`, and it's part of the `redux`
npm package.

To implement it, in `store/store.js`:
+ Import `applyMiddleware` from `redux`
+ Move your logging middleware function into this file
+ Add a call to `applyMiddleware` in your call to `createStore`
  + Pass in your logging middleware as an argument to `applyMiddleware`

Then, restore `todo_redux.jsx` to its original state.

**Test your code**: Everything that worked before should still work!

[anti-pattern]: https://en.wikipedia.org/wiki/Anti-pattern
