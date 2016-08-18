# Using `onEnter` Hooks

The React Router API provides route hooks that we can use to trigger callbacks 
whenever our routes change. Read the official documentation [here][documentation]. 
As the docs indicate, there are several of these route hooks, but we will concern ourselves with **`onEnter`** today.

We can use `onEnter` hooks to accomplish things like:
  * Redirecting anonymous users to a sign-in page if they try to access certain 
  pages.
  * Initiating a new AJAX request when a route's query parameters change.

These tasks could be accomplished -- to some degree -- with lifecycle methods, but route hooks help simplify our components.

## Syntax

Route hooks are passed as props to the `Route` they are concerned with: 

```javascript
  <Route path="/path" component={ someComponent } onEnter={ someCallback } />
```

In this example, `someCallback` will fire whenever our Router first matches the `"/path"` route.

## Parameters

When an `onEnter` callback function is invoked by the React Router, it is passed 3 arguments:
  * **`nextState`:** the next [router state][router-state].
  * **`replace`:** a function that, when invoked, tells the `Route` to navigate 
  to the path passed to `replace` instead of the original `path`:

    ```javascript
      replace('/go/here/instead');
    ```
  * **`asyncDoneCallback`:** This argument is optional and **completely changes** how the callback is executed. Read on below.

### The `asyncDoneCallback`

If your callback function's signature contains 2 or fewer parameters, then the `Route` will render asynchronously.

  ```javascript
    <Route path="/path" onEnter={someCallback} component={Page}/>

    function someCallback(nextState, replace){
      asyncTask();
    }

    // Navigate to '/path'
    // Page renders while asyncTask() is running
  ```

If, however, your function's signature contains all 3 parameters, then the
`Route` will wait until `asyncDoneCallback` is invoked before rendering. In
other words, we will **block rendering** until our `onEnter` callback says to
continue.

  ```javascript

    function someCallback(nextState, replace, asyncDoneCallback){
      asyncTask({
        success: asyncDoneCallback
      })
    }

    // Navigate to '/path'
    // Rendering is blocked until asynTask.success() is invoked
  ```

This behavior makes it important to be very careful when defining parameters 
for your `onEnter` callbacks.

### Example:

Check out React's official [auth-flow][auth-flow] example.

[auth-flow]: https://github.com/reactjs/react-router/tree/efac1a8ff4c26d6b7379adf2ab903f1892276362/examples/auth-flow

[documentation]: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback

[router-state]: https://github.com/reactjs/react-router/blob/master/docs/Glossary.md#routerstate
