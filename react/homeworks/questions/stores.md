# Dollar Store

Tonight, we're going to build off of the currency demo from today's lecture by adding a store to keep track of conversion rates.  

As the code currently stands, we make an ajax request to the `fixer` api and store the currency rates object directly in the state of the `Widget` component.  But what if we want to access this information in another component?  To do that, we need a store.  

## Phase 0: Setup

To get started download the [skeleton][currency-skeleton].  Make sure to run `npm install` to get all the required node modules.  To see the app, open `index.html` in your browser, and make sure to run `webpack --watch` to keep your code up to date.  

[currency-skeleton]: ./currency_demo_skeleton.zip

## Phase 1: Build A `RatesStore`

Create a `ratesStore.js` file within the `frontend` folder.  This is where we will relocate the logic to fetch and store the currency rates.

To get started, use the below skeleton and fill out the logic for all the methods.  If you're not sure how to write these methods, refer to the [stores reading][stores-reading].

[stores-reading]: ../../readings/stores.md

```js
  // frontend/ratesStore.js

  let _callbacks = [];
  let _rates = {};

  const RatesStore = {
    addListener(callback) {
      // your code here...
    },

    executeListeners() {
      // your code here...
    },

    all() {
      // your code here...
    },

    fetchRates(currency) {
      // ajax request goes here...
    }
  };

  module.exports = RatesStore;
```

To test that your code works, throw your store on the window and call these methods directly from the devtools console
  * set `window.RatesStore = RatesStore` in `ratesStore.js`, then you can run `RatesStore.fetchRates("USD")` from the browser terminal

## Phase 2: Refactor `Widget` Component

Now that we have our store built, let's refactor our `Widget` component so that it gets rates information from the store.  This will require several steps:
  * require the `RatesStore` in the `widgets.jsx` file
  * on `componentDidMount`, register a listener on the `RatesStore`
  * write an `_onChange` method to update `this.state.rates` when the `RatesStore` changes
  * change the `setBaseCurrency` method to make a call to `RatesStore.fetchRates`
  * remove `Widget.fetchRates`

Play around with the app to verify that it still works as it previously did.   

Congrats, you've created your first store! :tada:

## Phase 3: Bonus!

Add another component that uses the data in the `RatesStore`.  
