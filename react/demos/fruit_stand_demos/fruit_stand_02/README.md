# Fruit Stand App - Part 2

An intro **Redux/React** app with a Redux `store`, `reducer`, actions, and a *subscribed* React component.

---
Let's look at and run the code that you just walked through in our Redux store
reading.

1. Download [zip][zip].
2. Unzip and cd to the app's root directory.
3. Run `npm install` to install the Redux/React npm packages.
4. Run `webpack` to compile `bundle.js`.
4. `open index.html` to see the app in the browser.
5. Open Dev Tools to see the app's Redux store in action.
  + Available for testing on the `window` are the app `store`, and actions `addOrange` and `addApple`.
  + Try `store.dispatch(addOrange)` in the console. How did the DOM change in *reaction*?
  + Try `store.dispatch(addApple)` in the console. How did the DOM change in *reaction*?

Check out `entry.js` (this demo's entry file):
+ Import `React` and `ReactDom` to use React in our app.
+ Check out the app's `store` defined in `frontend/store.js`.
+ Check out the app's actions defined in `frontend/sactions.js`.
+ Check out our app's React component `FruitStand` defined in `frontend/components/fruit_stand.jsx`.
  + This React component gets passed the app's `store` as a `prop`. Inside of its constructor, `store.subscribe(this.forceUpdate.bind(this))` is called so whenever the store's state changes because of triggered actions, the component re-renders. Thereby, `FruitStand` always renders the current state.

[zip]:./fruit_stand_with_react.zip
