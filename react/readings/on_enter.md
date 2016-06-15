# Using `onEnter` Hooks

The `react-router` api provides us 3 hooks -- or event listeners -- that we can use to trigger callbacks whenever our front end routes change. They include:

  * `onEnter`
  * `onChange`
  * `onLeave`

Read the official documentation [here][documentation]

We might use these hooks in the following ways:
  * Check if a user is logged in before rendering a route
  * Initiate an ajax request when a route's query parameters change
  * Pop up a super annoying "Are you suuure!?" modal when the user tries to leave a page

These tasks could be accomplished - to some degree - with lifecycle methods, but the route hooks can simplify our components for us.

---

### Syntax

Using the hooks looks something like this:

```javascript
  <Route path="/path" component={ someComponent } onEnter={ someCallback } />
```

`someCallback` will fire whenever we enter the `/path` route

Note that hooks with nested routes will tigger accordingly:

```javascript
    <Route path="/" component={ someComponent } onChange={ someCallback }>
      <Route path="path1" component={ someComponent }/>
      <Route path="path2" component={ someComponent }/>
    </Route>
```

Here, `someCallback` will fire whenever we change from `path1` to `path2` (or vice versa)

Let's focus on the `onEnter` hook

---

### Parameters

the `onEnter` callback function can accept up to 3 arguments:
  * `nextState` --> the next [router state][router-state]
  * `replace` --> a function that, when invoked, will tell the router to redirect to the path passed to `replace`

      ```javascript
        replace('/go/here/instead');
      ```
      
  * `asyncDoneCallback` --> this one is optional, but important to understand. It **completely changes** how the callback is executed.

---

### The `asyncDoneCallback`

If your callback function's signature contains 2 or fewer parameters, then the route will render synchronously.

  ```javascript
    function someCallback(nextState, replace){
      ...
    }
  ```

If, however, your function's signature contains all 3 parameters, then the route will wait until `asyncDoneCallback` is invoked, before rendering.

  ```javascript
    function someCallback(nextState, replace asyncDoneCallback){
      doAsyncThing({
        success: asyncDoneCallback
      })
    }
  ```

If we want to do something asynchronous in our `onEnter` or `onChange` hooks, we need to supply the appropriate number of parameters in the function definition so that the `react-router` will know to wait before rendering.

---

### Example:

Check out React's official [auth-flow][auth-flow] example.


[auth-flow]: https://github.com/reactjs/react-router/tree/efac1a8ff4c26d6b7379adf2ab903f1892276362/examples/auth-flow

[documentation]: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback

[router-state]: https://github.com/reactjs/react-router/blob/master/docs/Glossary.md#routerstate
