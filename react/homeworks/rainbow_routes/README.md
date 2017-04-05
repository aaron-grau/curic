# Rainbow Routes

Today we're going to get our first experience using React Router. The goal is to create a basic app that displays the colors of the rainbow. This rainbow, however, has something special about it - some of the colors are nested within others.

## Phase 0: Setup

Download the [zip file][zip-skeleton] of the skeleton. Poke around to get familiar with the setup; it should look pretty familiar. Run `npm install` to get it setup. Then run `npm start`. For information on the `webpack-dev-server` configuration, refer to the [webpack-dev-server reading](../../readings/webpack_dev_server.md).

Navigate to `http://localhost:8080` in your browser and verify you can see "Rainbow Router" header.  Currently there's no functionality. If you click the links, you'll just alerts. We'll make them active soon.

## Phase 1: Routes

First take a look at the entry file `entry.jsx`. Note that in the `Root` component we have wrapped the `Rainbow` component in `<HashRouter>` tags. This will make the router available to all its descendent components. Don't change the entry file - everything is already set up for you.

Now open the file `components/rainbow.jsx`. We're going to render some of our color components from here. Ultimately we want our routes to look like this.

URL                     | Components
------------------------|-----------
`/`                     | `Rainbow`
`/red`                  | `Rainbow -> Red`
`/red/orange`           | `Rainbow -> Red -> Orange`
`/red/yellow`           | `Rainbow -> Red -> Yellow`
`/green`                | `Rainbow -> Green`
`/blue`                 | `Rainbow -> Blue`
`/blue/indigo`          | `Rainbow -> Blue -> Indigo`
`/violet`               | `Rainbow -> Violet`

This means that the `Red`, `Green`, `Blue`, and `Violet` components need to render in the `Rainbow` component, but only when we are at the corresponding URL. We'll do this with `Route` components. (Refer back to the [reading][intro] for details.) Add the necessary `Route` components inside the `div` with `id="rainbow"` in the `Rainbow#render` method. For example, to render the `Red` component you will want

```js
  <Route path="/red" component={Red} />
```

Test that your code works!  Manually type in each URL we just created, and you should see the color component pop up.  Remember, these are React Routes, so the paths we created will come after the `#`.  For example, our red route will look like `localhost:8080/#/red`.

We want to nest the `Orange` and `Yellow` components inside the `Red` component, and the `Indigo` component inside the `Blue` component. You'll have to go add the corresponding `Route` tags to the `red.jsx` and `blue.jsx` files. Make sure to use the correct nested paths, such as `"/red/orange"` for the orange `Route`.

## Phase 2: HashRouter `history.push`

Manually navigating to our newly created routes is tiresome, so let's add functionality to take care of this process for us. We'll use the `history` object. We can use `withRouter` to make `history` available as a prop in any components that need it. In this case it will only be `Rainbow`. Go ahead and wrap `Rainbow` in `withRouter` when you export it. See the [withRouter][with-router] reading to see what this should look like.

Now let's look at the `<h4>` tags in the `Rainbow` component - you'll see that each `<h4>` has a click listener and corresponding method already created. Right now each of these methods just opens an alert. To make each of these click handlers change the path for us, we're going to call the `push` method on `history`, which should be available as `this.props.history`. Using the `push` method allows us to dynamically change the hash portion of our URL. Our router will then match that hash portion and render the corresponding component(s).

For example, our `addRed` method might look as follows:

```js
  addRed() {
    this.props.history.push('/red');
  }
```

Fill out the remaining `addColor` and `resetColor` methods.  Test that your code works by clicking on the color names in your browser and seeing that you are rendering components correctly. Make sure to also fill in these methods in the `red.jsx` and `blue.jsx` files.

*Note:* you don't need `withRouter` for `Red` or `Blue`. They already get `history` because they are rendered inside `Route` components.

Test that your code works by navigating through all the routes.  Time to celebrate! :tada: :rainbow: :tada:

[zip-skeleton]: ./skeleton.zip?raw=true
[with-router]: ../../readings/with_router.md
[intro]: ../../readings/intro_to_react_router.md
