# React Router Introduction

## Overview

[React Router](https://github.com/ReactTraining/react-router/) is a
routing  library that helps you add views to your React application,
while keeping the  URL in sync with what's being displayed on the page.

To use React Router in your projects `npm install --save
react-router-dom`. Then import `HashRouter` from `react-router-dom` in
your entry file.  

`HashRouter` is the primary component of the router that wraps our route
hierarchy.
It makes routing information available to all its descendent components.

The purpose of React Router is to allow you to selectively render
certain components based on the URL your browser is pointed at. The
component you'll use most often is


## `<Route>`

The `<Route>` component is used to wrap another component, causing that
component to only be rendered if a certain URL is matched. It is
controlled by the following props

* `path` The wrapped component will only be rendered when the path is
  matched. We say the path matches the URL when it matches some initial
  portion of the URL. For example, a path of `/users` would match both
  of the following URLs: `/users` and `/users/123`. If this prop is left
  out, the component will always render.

* `exact` This is a boolean prop that defaults to false. If it is set to
  true, the path will only match when it exactly matches the URL. For
  example, if we set `path={true}`, then `/users` will not match
  `/users/123` any more.

* `component` This prop takes a reference to the component to be
  rendered.

* `render` This optional prop takes a function to be called when the
  path matches. The return value of the function is rendered. Of course,
  one could also simply define a functional component inside the
  `component` prop, but this results in extra, unnecessary work for
  React, so the `render` prop is preferred. You should only use either
  the `component` prop, or the `render` prop.   If both are supplied,
  only   the `component` prop will be used.

  ```js
    // will work, but unnecessarily slow
    <Route path="/one" component={() => <span>One</span>} />

    // preferred
    <Route path="/one" render={() => <span>One</span>} />
  ```


Let's look at an example.

```js
// root.jsx

import { Route, HashRouter } from 'react-router-dom';

const Root = () => (
  <HashRouter>
    <Header />
    <Route exact={true} path="/" component={Feed} />
    <Route path="/users" component={Users} />
  </HashRouter>
);
```

With this root component we will always render the header, regardless of
the path. We will render the feed component only if the path exactly
matches `/` and the user index component if the path matches
`/users`.


## URL Params

A component's props can also hold information about a URL's parameters.
The router will match route segments starting at `:` up to the next `/`,
`?`, or `#`. Those matched values are then passed to components via
their props. Such segments are called _wildcards_.

Suppose we want to use the `Users` component to either render the users
index or the profile page for a particular user depending on the path.
We could do something like this

```js
const Users = () => (
  // render the index of no id is included
  <Route exact={true} path="/users" component={UsersIndex} />
  // otherwise render the profile page for that user
  <Route path="/users/:userId" component={Profile} />
);
```

Note that there's no need to use `HashRouter` again - as long as it
wraps our root file all of our `Route` components will be able to
connect to it.


## Location Props

In order to fetch the correct user from our database we will need to get
the id from the URL. React router passes that information to the profile
component as props. Here are the prop it makes available.

* `location` This is an object that makes the current URL available to
us. It's most important key is `pathname`, which returns the current
URL.

* `match` This is an object that contains important information about
how the current URL matches the route path. Here are some of the more
useful keys on the `match` object

  * `isExact` a boolean that tells you whether or not the URL exactly
matches the path

  * `url` the current URL

  * `path` the route path it matched against (without wildcards filled
in)

  * `params` the matches for the individual wildcard segments, nested
under their names

* `history` This prop lets you update the URL programatically. For example,
  suppose we want to push a new URL when the user clicks a button.
  It has two useful methods:

  * `push` This adds a new URL to the end of the history stack. That
    means that clicking the back button will take the browser to the
    previous URL.

  * `replace` This replaces the current URL on the history stack,
    so the back button won't take you to it. For example

    ```js
      const handleClick = () => this.props.history.push('/some/url');

      const redirect = () => this.props.history.replace('/some/other/url');
    ```

Let's use the `match` prop to fetch the correct user from the database
in the Profile component. Recall that our profile component was rendered
at the path `/users/:userId`. Thus we should have a `userId` param
available.

```js
class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const id = this.props.match.params.userId;
    fetchUser(id).then(user => this.setState(user));
  }

  render () {
    // ...
   }
}

```

## Resources

* [React Router
docs](https://reacttraining.com/react-router/web/guides/quick-start)
* [Route](https://reacttraining.com/react-router/web/api/Route)
* [HashRouter](https://reacttraining.com/react-router/web/api/HashRouter)
* [location](https://reacttraining.com/react-router/web/api/location)
* [match](https://reacttraining.com/react-router/web/api/match)
* [history](https://reacttraining.com/react-router/web/api/history)
