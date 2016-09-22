# Fruit Stand App
## Phase 02 - React/Redux

This is a simple **React/Redux** application with a Redux `store`, reducers,
actions, and *connected* React components.

[Live Demo][live-demo]

---

Let's start by looking at the code you just walked through in the [video demo][video-demo].

+ Notable libraries used - `react`, `react-dom`, `react-redux`, `redux`.
+ Action creators and types are defined in the `frontend/actions` folder.
+ The app's `reducer` (i.e. reducing function) is defined in `frontend/reducers/root_reducer.js`.
  + `fruitsReducer` is defined in `frontend/reducers/fruits_reducer.js`. It handles
  and returns the `fruits` slice of our app's state.
+ The app's Redux store is instantiated in `frontend/store/store.js`.
  + The Redux store constructor `createStore` is imported from `redux`.
  + The app's `reducer` is imported from `frontend/reducers/root_reducer.js`.
+ The app's React components are defined in `frontend/components`.
  + The presentational component `<FruitstandList>` is defined in
  `frontend/compoments/fruit_stand/fruit_stand_lis.jsx`. It renders `fruits`
  stored in the application state.
  + The corresponding container `<FruitStandContainer>` is defined in
  `frontend/components/fruit_stand/fruit_stand_container.jsx` and *connects*
  the presentational component `<FruitStandList>` to the Redux store.
  + `<App>` is defined in `frontend/components/app.jsx` and wraps `<FruitStandContainer>`.
  + `<Root>` is defined in `frontend/components/root.jsx` and wraps `<App>`
  with the `<Provider>` from the `react-redux` library.
+ `frontend/entry.js` is the entry file.

---

If you want to run the source code yourself, follow these instructions:
  1. Download [zip][zip].
  2. Unzip and cd to the app's root directory.
  3. Run `npm install` to install the React/Redux npm packages.
  4. Run `webpack` to compile `bundle.js`.
  4. `open index.html` to see the app in the browser.
  5. Open Dev Tools to see the app's Redux store in action.

[zip]: ./fruit_stand_02.zip
[live-demo]: http://appacademy.github.io/curriculum/react/fruit_stand_02/index.html
[video-demo]:
