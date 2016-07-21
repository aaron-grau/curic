# Promises

Promises are a tool for simplifying callbacks to asynchronous functions. Since the introduction of ES2015, they have been included natively in Javascript.

[API Documentation][documentation]

## The Problem

Sometimes we need to chain several asynchronous functions. For example, maybe we want to get our user's geolocation, then hit an API to `GET` the user's nearest surf spot, then hit a third API to get the surf conditions for that spot. 

To do this with traditional callbacks, we need to define the success callback of one function to invoke the next, and each function has to handle its own errors.

```javascript
// Warning: PSEUDO-CODE!!!

function getForecastForLocation(){
  locationRequest({
    success: spotRequest({
      success: forecastRequest({
        success: handleSuccess,
        error: handleError
      }),
      error: handleError
    }),
    error: handleError
  });
}
//Jeez!
```

To solve this without promises, we would have to define the success callback of one function to invoke the next, and each would have to handle its own errors. Nesting callbacks like this can only lead us to :fire: [callback hell][callback-hell] :fire: .

## The Solution

With promises, we can write:

```javascript
function getForecastForLocation(){
  locationRequest
  .then(spotRequest)
  .then(forecastRequest)
  .then(handleSuccess)
  .catch(handleError)
}
```

Let's learn how to do this...

## Functionality and Vocabulary

First let's define a couple terms:

  * _action_: the primary function of a promise (i.e., fetch data from an API)

Promises can exist in one of three states:

  * _Fulfilled_: The promise's action has succeeded.
  * _Rejected_: The promise's action has failed.
  * _Pending_: The promise has been neither fulfilled nor rejected.. yet!

For discussion purposes, we will often use a fourth state:

  * _Settled_: The promise has been fulfilled or rejected.

A few notes about functionality before moving on:

  * A promise can only succeed or fail once -- callbacks will not be invoked multiple times.
  * A promise cannot change it's state from fulfilled to rejected or vice-versa.
  * If a promise has already been settled and a callback is added that matches the promise's state, that callback will be invoked immediately.

## Creating a Promise

We can create a new promise using the promise constructor function:

```javascript
  new Promise(executor)
```

The constructor function accepts a single `executor` argument, which is a function that takes up to two optional parameters: `resolve` and `reject`. Let's see an example:

```javascript
let promise = new Promise( (resolve, reject) => {
  AsyncRequest({
    success: resolve,
    error: reject
  });
});
```

## `resolve` and `reject`

`resolve` and `reject` are responsible for telling the promise what arguments to pass on (via `then` or `catch`) once the promise has been settled. 

```javascript

let receiveResponse = msg => msg + '!!1one';

let request = new Promise( resolve => {  
  AsyncRequest({
    success: resolve( 'success message' )
    })
});

request.then( receiveResponse );
```

In the example above, `receiveResponse` is invoked with `'success message!!1one'` passed as an argument.

## `then` and `catch`

Promise objects have two important methods: `then` and `catch`. Both `then` and `catch` return __a new promise object__, making them chainable.

`then` accepts two parameters:
  * `onFulfilled`: the function to invoke if the promise is _fulfilled_
  * `onRejected`: the function to invoke if the promise is _rejected_

```javascript
  somePromise.then(onFulfilled) // this *might* run
  somePromise.then(onFulfilled, onRejected) // one of these *will* run
```

`catch` accepts a single parameter:
  * `failure`: the function to invoke if anything in the promise chain is rejected
  * `failure` will be invoked if `somePromise`, `success`, or `success2` are rejected in the example below.

```javascript
somePromise.then(success).then(success2).catch(failure)
```
### Quirks about `then` and `catch`

Consider these similar constructions: 
```javascript
somePromise.then(success, error) 
somePromise.then(success).catch(error)
```
In the first construction, `then` will always call either `success` or `failure`, but not both. In the later, both `success` and `failure` _could_ run if `somePromise` is fulfilled but `success` is rejected.

Also consider this example:

```javascript
somePromise.then(onFulfilled, onRejected).catch(error)
```

If `somePromise` is rejected, `onRejected` will run but `error` will not, because `then` will return a fulfilled promise.

## Advanced Topics

We have only covered the very basics of what promises are and how they work. Here are a few more advanced topics and links for more info:

* [Implicit rejection][so]: promises can be implicitly rejected if the constructor function throws an error.
* [Promise.all][all]: Accepts an array of promises, and creates a single promise that only gets fulfilled if every promise in the array fulfilled.
* A [polyfill][polyfill] is required for consistent functionality across older browsers.

Also, check out a [really well written article][rwwa].

[callback-hell]: http://callbackhell.com
[documentation]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[so]: http://stackoverflow.com/questions/28703241/promise-constructor-with-reject-call-vs-throwing-error
[all]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
[polyfill]: https://github.com/stefanpenner/es6-promise
[rwwa]: http://www.html5rocks.com/en/tutorials/es6/promises/
