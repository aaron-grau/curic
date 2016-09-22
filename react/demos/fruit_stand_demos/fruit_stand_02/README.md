# Fruit Stand App
## Phase 02 - React/Redux

This is a simple **React/Redux** application with a Redux `store`, reducers,
actions, and *connected* React components.

[Live Demo][live-demo]

---

Let's start by looking at the code you just walked through in the [video demo][video-demo].

+ Notable libraries used - `react`, `react-dom`, `react-redux`, `redux`.
+ Action creators are defined in the [`frontend/action`][actions] folder.
  + Action creators and types concerning the `fruit` slice of our state live in `frontend/actions/fruit_actions.js` and `farmers` `frontend/actions/farmers/actions.js`.
+ The app's `reducer` (i.e. reducing function) is defined in [`frontend/reducer.js`][reducer-code].
+ The app's Redux store is instantiated in [`frontend/store.js`][store-code].
  + The Redux store constructor `createStore` is imported from `redux`.
  + The app's `reducer` is imported from `frontend/reducer.js`.


Check out `entry.js` (this demo's entry file):
+ Import `React` and `ReactDom` to use React in our app.
+ Check out the app's `store` defined in `frontend/store.js`.
+ Check out the app's actions defined in `frontend/sactions.js`.
+ Check out our app's React component `FruitStand` defined in `frontend/components/fruit_stand.jsx`.
  + This React component gets passed the app's `store` as a `prop`. Inside of its constructor, `store.subscribe(this.forceUpdate.bind(this))` is called so whenever the store's state changes because of triggered actions, the component re-renders. Thereby, `FruitStand` always renders the current state.

---

If you want to run the source code yourself, follow these instructions:
  1. Download [zip][zip].
  2. Unzip and cd to the app's root directory.
  3. Run `npm install` to install the React/Redux npm packages.
  4. Run `webpack` to compile `bundle.js`.
  4. `open index.html` to see the app in the browser.
  5. Open Dev Tools to see the app's Redux store in action.
    + Available for testing on the `window` are the app's Redux `store`, and actions `addOrange` and `addApple`.

[zip]: ./fruit_stand_02.zip
[live-demo]: http://appacademy.github.io/curriculum/react/fruit_stand_02/index.html
[video-demo]:
