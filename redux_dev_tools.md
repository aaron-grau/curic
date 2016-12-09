# Redux Developer Tools

Redux has its own special set of developer tools. They allow you to do things
like inspect your application state in real time as you use your app, or cancel
an action to see a live recalculation of the state as if that action had never
been dispatched. They require only a few minutes of setup, and can be well
worth the effort.

The redux dev tools are contained in a custom React component. In the past one
had to add this component to an app in order to use them. Fortunately, the dev
tools are now included in a chrome extension which allows them to open in a
separate window. 

There are two steps to the setup:

1) Install the chrome extension by visiting [this url][chrome_extension] and following the instructions.

2) Add custom middleware to your store that allows the dev tools to track the state of your app and log any actions you dispatch.

## Redux DevTools Middleware

We will use the [fruit stand app][fruit_stand] as an example.
The Redux dev tools don't work if you are simply viewing a local file in your browser; your site needs to be running on an HTTP server.
We could make the fruit stand into a Rails app, but that sounds like overkill just to get it on a server.
To install a simple server, run `npm install -g http-server`.
Then open the root directory of the fruit stand app and run `http-server`.
In your browser, navigate to `localhost:8080` to see the fruit stand app.

To give the Chrome extension access to our Redux state we need to add some middleware to our store.
The store.js file in the fruit stand app looks like this.

```
import { createStore } from 'redux';
import reducer from './reducer.js';

const store = createStore(reducer);

export default Store;
```

To make it accessible to the Redux dev tools, we simply change `createStore` to

```
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
```

Suppose that instead of just a reducer we were also using preloaded state and middleware.
Then without dev tools we would have something like this

```
const store = createStore(
  reducer,
  preloadedState,
  middleware
);
```

To add dev tools we would change it to

```
import { compose } from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  preloadedState,
  composeEnhancers(middleware)
);
```


## Use

Now that we've set up the Redux dev tools, let's try them out.
You should see an atom (a nucleus with electrons) icon on your Chrome toolbar, and if you've set up the dev tools correctly it should now be green.

Click on it.

When the dev tools open, click one of the buttons on the very bottom left to open them in a new window.

Now try adding some fruit.

This will cause actions to be dispatched.
You should see those actions popping up in the dev tools.
You can click on them to cancel them and you should see the state recalculated in real time.
The dev tools have some other handy features, so click around and explore!


## Resources

* [Chrome extension][chrome_extension]

* [Dev tools react component][react_component]


[fruit_stand]: https://github.com/appacademy/curriculum/tree/master/react/demos/fruit_stand_demos/fruit_stand_02
[chrome_extension]: https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
[react_component]: https://github.com/gaearon/redux-devtools
