# Promises

Promises are essentially a useful design pattern to follow when working with asynchronous functions. Previously, several third-party libraries were available to use when working with promises, but -- since ES6 -- they have been included natively in Javascript.

[API Documentation][documentation]

---

### The Problem
Sometimes we need to chain several asynchronous functions in a row. For example, maybe we want to find our user's latitude / longitude, then make a GET request to some API for the name of the surf town the user is closest to, then use a third API to get the surf conditions in that town. Jeez!

  __getLocation()__ --> then --> __getBeachTown()__ --> then --> __getSurfConditions()__

To solve this without promises, we would have to define the success callback of one function to invoke the next, and each would have to handle its own errors. Sounds messy..

### The Solution

With `Promises`, we can write:

```javascript
  getLocation.then(getBeachTown).then(getSurfConditions)
```

Wow! To catch all the errors that could get thrown during this chain, we can add:

```javascript
  getLocation.then(getBeachTown).then(getSurfConditions).catch(handleErrors)
```

Let's learn how to do this...

---

## Functionality and Vocabulary

First let's define a couple terms:

  * _action_ --> the primary purpose or functionality of a promise (ie, fetch data from an api)

Promises can exist in one of three states:

  * _fulfilled_ --> the promise's action has succeeded
  * _rejected_ --> the promise's action has failed
  * _pending_ --> the promise has been neither fulfilled nor rejected.. yet!

For discussion purposes, we will often use a fourth state:

  * _settled_ --> the promise has been fulfilled or rejected

A few notes about functionality before moving on:

  * A promise can only succeed or fail once -- callbacks will not be invoked multiple times
  * A promise can not change it's state from fulfilled to rejected or vice-verse
  * If a promise has already been settled and a callback is added that matches the promise's state, then callback will be invoked immediately

---

## Creating a Promise

We can create a new promise using the promise constructor function:

  ```javascript
    new Promise()
  ```

The constructor function accepts a single argument --> a function that takes up to two parameters: resolve and reject. Let's see an example:

```javascript
  const p = new Promise( (resolve, reject) => {
    //Do something asynchronous
    if ( /* all is well */ ){
      resolve( /* success info */ )
    } else {
      reject( /* error object */ )
    }
  });
```

It's important to note that `resolve()` and `reject()` should not be invoked until after the asynchronous functionality has finished.

---

### resolve and reject

`resolve` and `reject` are responsible for telling the promise what information to pass on once the promise has been settled. __Both parameters are optional__

    ```javascript
      somePromise = new Promise( resolve => {  
        resolve( 'success message' )
      });

      somePromise.then( asyncFunctionTwo )
    ```

Above, `asyncFunctionTwo` is invoked with 'success message' passed as a parameter

---

### #then and #catch

Promise objects have two important methods: `then` and `catch`. Both `then` and `catch` return _a new promise object_, this makes them chain-able!

  * `then` accepts two parameters:
    * `success` --> the function to invoke if the promise is _fulfilled_
    * `failure` --> the function to invoke if the promise is _rejected_

    ```javascript
      somePromise.then(success) // this *might* run
      somePromise.then(success, failure) // one of these *will* run
    ```

  * `catch` accepts a single parameter:
    * `failure` --> the function to invoke if anything in the promise chain fails

    ```javascript
      somePromise.then(success).then(success2).catch(failure)
    ```

    * the failure function will be invoked if somePromise, success, or success2 reject the promise.

You should try to remember:

  ```javascript
    somePromise.then(success, error) != somePromise.then(success).catch(error)
  ```
In the former, _either_ success or failure _will_ run. In the later _both_ success and failure _could_ run.

---

## Advanced Topics

We have only covered the very basics of what promises are and how they work. Here are a few more advanced topics and links for more info:

* [Implicit rejection][so] --> promises can be implicitly rejected if the constructor function throws an error
* [Promise.all][all] --> Accepts an array of promises, and creates a single promise that only fulfills if every promise in the array fulfills
* a [polyfill][polyfill] is required for consistent functionality across older browsers

Also, check out a [really well written article][rwwa]


[documentation]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[so]: http://stackoverflow.com/questions/28703241/promise-constructor-with-reject-call-vs-throwing-error
[all]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
[polyfill]: https://github.com/stefanpenner/es6-promise
[rwwa]: http://www.html5rocks.com/en/tutorials/es6/promises/
