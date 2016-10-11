# React Router Introduction

## Overview

React Router is a routing library that helps add views to an application, while
keeping the URL in sync with what's being displayed on the page.

## Routes

To use the React Router, import `<Router>`, `<hashHistory>`, and `<Route>` from
the `react-router` library.

* `<Router>` is the primary component of the router that keeps our UI and URL in sync.
* `<hashHistory>` listens to the browser's address bar for changes so the router
can match the URL to routes.
* `<Route>` contains a path and component used to define a route.

When a URL matches the path of a route, the router will display the corresponding
component. If we nest routes, the router will combine their paths, making it
possible to match longer URLs and render multiple components.

Let's look at an example.

```js
// root.jsx
// imported components...

import { Router, Route, hashHistory } from 'react-router';

const Root = () => {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route path="about" component={About} />
        <Route path="inbox" component={Inbox} >
          <Route path="messages/:id" component={Message} />
        </Route>
      </Route>
  </Router>
  );
}
```

This app would generate the following paths.

Path                    | Rendered Components
------------------------|-----------
`/`                     | `App`
`/about`                | `App -> About`
`/inbox`                | `App -> Inbox`
`/inbox/messages/:id`   | `App -> Inbox -> Message`

When a user visits `/` the router will render the `App` component.

When a user visits `/about` the router will render both `App` and `About` components.

It's also possible to nest multiple routes, as you can see with the path
`/inbox/messages/:id` that renders `App`, `Inbox`, and `Message`.

## Rendering Components

While the router figures out what components should be rendered based on the URL,
it does not determine how they are rendered. Instead, parent components have access
via `props.children` to children components nested one level below.

These are the components we created routes for in our `root.jsx` router example above.

```js
// message.jsx

const Message = () => {
  return (
     <h3>Message</h3>
  );
}

// inbox.jsx

import Message from './message.jsx'

const Inbox = ({children}) => {
  return (
    <div>
      <h2>Inbox</h2>
      {children}
    </div>
  );
}

// app.jsx

import Inbox from './inbox.jsx'

const App = ({children}) => {
  return (
    <div>
      <h1>App</h1>
      {children}
    </div>
  )
}
```
Because we nested `Inbox` under `App` in our router, we are given access to the
`Inbox` component in `App`'s props. All we have to do is call `children` in
`App` to render `Inbox`. We can similarly call `children` in `Inbox` to
render `Message`.

It's also possible to use [`Named Components`](https://github.com/ReactTraining/react-router/blob/master/docs/API.md#named-components) to give a route multiple children.

```js
// root.jsx
// imported components...

import { Router, Route, hashHistory } from 'react-router';

const Root = () => {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route path="groups" components={{main: Groups, sidebar: GroupsSidebar}} />
          <Route path="users/:userId" component={Profile} />
        </Route>
      </Route>
    </Router>
  );
}
```
In the `App` component `props.children.main` renders the `Group` component and
`props.children.sidebar` renders the `GroupSidebar` component.  

## URL Params

A component's props can also hold information about a URL's parameters.
The router will match route segments starting at `:` up to the next `/`, `?`,
or `#`. Those matched values are then passed to components via their props.

So in the case of `/inbox/messages/Jkei3c32`, the router matches the string
'Jkei3c32' to `:id`, grabbing that data and making it available in the props
of the `Message` component.

We can use this id to fetch the corresponding message from the server and
display it to our users.

```js
// message.jsx

class Message extends React.Component {
    componentDidMount() {
    const id = this.props.params.id

    fetchMessage(id, function (err, message) {
      this.setState({ message: message })
    })
  },

  // ...
}
```

We're not just limited to matching params though. Because route paths are just
strings, we can also use symbols to[dynamically match routes to different URLs](https://github.com/ReactTraining/react-router/blob/master/docs/guides/RouteMatching.md#path-syntax).

## Resources

* [React docs](https://github.com/ReactTraining/react-router/)
* [Route matching](https://github.com/ReactTraining/react-router/blob/master/docs/guides/RouteMatching.md)
* [More on histories](https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md#hashhistory)
