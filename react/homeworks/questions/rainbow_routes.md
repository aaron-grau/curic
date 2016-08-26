# Rainbow Routes

Today we're going to get our first experience using the React Router. The goal is to create a basic app that displays the colors of the rainbow. This rainbow, however, has something special about it - some of the colors are nested within others.

## Phase 0: Setup

Download the [zip file][zip-skeleton] of the skeleton. Poke around to get familiar with the setup; it should look pretty familiar. Run `npm install` to get it setup. Then make sure webpack is watching (`webpack --watch`), and start up the `http-server`.  

Navigate to `http://localhost:8080` in your browser and verify you can see "Rainbow Router" header.  Currently there's no functionality - we'll fix that asap!

## Phase 1: Basic Routing Structure

Our first step is to build up the router structure we want.  Ultimately, we want our router to look like this:

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


To start, let's add our first level of routes (i.e. red, green, blue, & violet).  Scroll to the bottom of `entry.jsx` and you'll see the basic framework of a router has already been set up.  

Now it's our job to add more routes.  For each desired route (red, green, blue, & violet), set the path attribute equal to the color name and assign the corresponding component.  Refer to tonight's readings on [Route Configuration][route-config-reading] for guidance on how to build routes.

**N.B.** All the color components have already been imported at the top of the page.  

Test that your code works!  Manually type in all the URLs we just created, and you should see the color component pop up on the right-hand side.  Remember, these are React Routes, so the paths we created will come after the `#`.  For example, our red route will look like `localhost:8080/#/red`.

## Phase 2: Hash History / `router.push`

Manually navigating to our newly created routes is tiresome, so let's add functionality to take care of this process for us. Notice that our router in `entry.jsx` was declared with its history property set to `hashHistory`. Now, we can use [withRouter][with-router] to make our router and its history available in any components that need it (i.e. the ones that are responsible for changing the route).

Take a look at the `rainbow` component in `entry.jsx` - you'll see that each `<h4>` has a click listener and corresponding method already created. To make each of these click handlers change the path for us, we're going to call `push` on the router, which should be available as `this.props.router` in each component, as long as we export each component `withRouter`. Using this `push` method allows us to dynamically change the hash portion of our url. Our router will then match that hash portion and render the corresponding component(s).

For example, our `addRed` method might look as follows:

```js
  addRed() {
    this.props.router.push('/red');
  }
```

Fill out the remaining `addColor` methods.  Test that your code works by clicking on the color names in your browser and seeing that you are rendering components correctly.  

## Phase 3: Nested Routes

Now let's add those nested routes (i.e. orange, yellow, & indigo).  No step-by-step instructions here - you got this!  

Once you've added the nested routes, the next step is set up the click handlers to so we can actually get to these routes. You probably noticed text below the red and blue square, prompting you to add another color.  Our job now is to make those links work!

Open up the `red.jsx` and `blue.jsx` files within the components folder.  You'll again see that click handlers and callbacks have already been set up.  Go ahead and add code to all the click handler callbacks.  When you push the new route into our hash fragment, make sure it's appropriately nested!  The nested colors should show up on top of the base color (i.e. we'll see a small orange square overlapping a larger red one).

Test that your code works by navigating through all the routes.  Time to celebrate! :tada: :rainbow: :tada:

[route-config-reading]: https://github.com/reactjs/react-router/blob/master/docs/guides/RouteConfiguration.md
[with-router]: https://github.com/reactjs/react-router/blob/master/docs/API.md#withroutercomponent-options
[hash-history]: https://github.com/reactjs/react-router/blob/master/upgrade-guides/v2.0.0.md#using-history-with-router

[live-demo]: /
[zip-skeleton]: ./rainbow_routes.zip?raw=true
