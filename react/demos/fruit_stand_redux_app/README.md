# Fruit Stand App - Part 1

An intro **Redux** app with a `store`, `reducer` and actions.

NB: No React components.

---
Let's look at and run the code that you just walked through in our Redux store
reading.

1. Download zip.
2. Unzip and cd to the app's root directory.
3. Run `npm install` to install the Redux npm packages.
4. Run `webpack` to compile `bundle.js`.
4. `open index.html` to see the app in the browser.
5. Open Dev Tools to see the app's Redux store in action.

Check out `frontend/store.js`:
+ The Redux store constructor `createStore` is imported from `redux`.
+ Check out the app's `reducer` (e.g. reducing function) defined in `frontend/reducer.js`.
+ Check out the app's actions defined in `frontend/sactions.js`.
+ Store methods `getState()` and `dispatch(action)` are called on the app's store.

Bonus:
+ Try creating a couple of new actions (i.e. `addLychee` and `addPlum`). Don't forget to export and import appropriately.
+ Dispatch these new actions and see how they update the app's state.
