# Dollar Store

Today, we're going to finish building out the architecture for a React currency-conversion widget to use a Redux store. For this assignment, we won't be using `Provider` or `connect()`. We will be using the store's three built-in methods: `subscribe`, `dispatch`, and `getState`.

Take a look at the [live demo][live-demo] to see the app in action.  Try clicking on a currency to see its conversion rates.   

[live-demo]: https://appacademy.github.io/curriculum/currency_demo/

## Phase 0: Setup

To get started download the [project skeleton][currency-skeleton].  Make sure to run `npm install` to get all the required node modules.  To see the app, open `index.html` in your browser, and make sure to run `webpack --watch` to keep your code up to date.

[currency-skeleton]: ./currency_demo.zip?raw=true

Poke around the `Widget` component's file and get acquainted with it. Notice where we call the store's built-in methods throughout:

- `subscribe` in the constructor
- `dispatch` in the AJAX's success callback
- `getState` in the render function

Now we need to make the actual store so our `Widget` can successfully call all of those!

## Phase 1: Build A `store`

Following the Redux pattern, a store should keep track of our application's state. This means that when we make our AJAX request to fetch the currency rates, it should update the store with its results. This is exactly what the `success` callback in our `Widget`'s `$.ajax`' call is trying to do. But right now, we don't have a store to dispatch to!

To make a fully-functional store, we need a reducer function, actions, and the store itself. Let's start with the reducer, which is most central to how a store holds and changes state.

### Phase 1A: `reducer`

As you know from the [reducers reading][reducers-reading], a reducer takes in the current state and an action, and should return an updated state based on the action type.

[reducers-reading]: ../../readings/reducers.md

For our currency widget, our state needs to keep track of two things: a base currency and a collection of corresponding rates. We need to pass some initial/default values in the case that state is not passed in. Here are some reasonable defaults:

```js
const initialState = {baseCurrency: "Please select", rates: {}};
```

Now we can start to build our reducer function. It's going to look something like this:

```js
  const reducer = (state = initialState, action) => {  
    switch(action.type) {
      default:
        return state;
    }
  };

  export default reducer;
```

Don't forget the export statement!

Right now, we're just automatically return the same state that was passed in. What we want to do is see if the `action.type` matches something we expect (e.g. `SWITCH_CURRENCY`) and return an updated version of the state correspondingly. Add a `case` statement to check for this action type. It should return a new object with correct properties. We can grab those off the action (`action.rates`, `action.baseCurrency`).

At this point, we've written enough code to test. We can put the reducer on the window (`window.reducer = reducer`) and then test it out in the browser console. Pass a test case to the reducer and make sure it returns what we're expecting:

```js
reducer({}, {type: "SWITCH_CURRENCY", baseCurrency: "test", rates: {"AUD": 3, "USD": 2, "JPY": 5}})
--> Object {baseCurrency: "test", rates: Object}
```

Perfect! Make sure to remove the reducer from the window once you're done testing it.

Now we need an action creator that will build the action object we pass to `store.dispatch`. Look in the `Widget` component again. You can see in the AJAX's success callback that we're using the `selectCurrency` function to create the action passed to the store's `dispatch` call. Time to write that function/file.

### Phase 1B: `action.js`

Make a new file `action.js` in the `frontend` folder. This will define and export our action creator function, `selectCurrency`. It will take in a `baseCurrency` string and a `rates` object, and should return an object with the following keys:

- `type` (needs to match the `type` we are expecting in our reducer's `switch` statement)
- `baseCurrency`
- `rates`

Once again, set it temporarily on the window and make sure it's working properly before moving on.

### Phase 1C: `store`

Finally, the time has come to create our store! This one is actually the simplest. Create a `store.js` file within the `frontend` folder. We will need to import `createStore` from `redux` and our `reducer` function from its own file. Then, all we have to do is call `createStore`, passing in the reducer function, and export it!

We should be good to go now. The entry file already requires our `store` and passes it as a prop to the `Widget` component. If you refresh the `index.html` page, you should have a working currency converter!

## Phase 2: Bonus!

Add another component that uses the data in the rates `store`.  
