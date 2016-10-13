# React Router Introduction

## Overview

React Router is a routing library that helps add views to an application.

To use the React Router, import `<Router>`, `<hashHistory>`, and `<Route>` from
the `react-router` library.

* `<Router>` is the primary component of the router that wraps our route hierarchy
* `<hashHistory>` listens to the browser's address bar for changes so the router
can match the URL to routes.
* `<Route>` contains a path and component used to define a route.

Let's look at an example.

```js
// root.jsx

import { Router, Route, hashHistory } from 'react-router';

const Root = () => (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="about" component={About} />
      <Route path="inbox" component={Inbox} >
        <Route path="messages/:id" component={Message} />
      </Route>
    </Route>
  </Router>
);
```

This app would generate the following paths and components.

Path                    | Rendered Components
------------------------|-----------
`/`                     | `App`
`/about`                | `App -> About`
`/inbox`                | `App -> Inbox`
`/inbox/messages/:id`   | `App -> Inbox -> Message`

Underneath the hood, the router converts the `<Route>` element 
hierarchy to an array of routes that are tried when the router attemps to 
match a URL. When a URL does match the path of a route, the corresponding 
component or components are displayed to the user.

As you can see in the table it's possible by nesting routes to build longer
paths the router will try to match. When a user visits `/about` both `App` 
and `About` are rendered. When a user visits `/inbox/messages/:id` `App`, 
`Inbox`, and `Message` are rendered.

## Rendering Components

While the router figures out what components to be rendered based on the URL,
it does not determine how they are rendered. Instead, parent components have 
access via `props` to children components nested one level below.

These are the components we created routes for in our `root.jsx` router 
example above.

```js
// message.jsx

const Message = () => (
  <h3>Message</h3>
);

// inbox.jsx

const Inbox = ({children}) => (
  <div>
    <h2>Inbox</h2>
    {children}
  </div>
);

// app.jsx

const App = ({children}) => (
  <div>
    <h1>App</h1>
    {children}
  </div>
);
```
Because we nested `Inbox` under `App` in our router, we are given access to the
`Inbox` component in `App`'s props. All we have to do is call `children` in
`App` to render `Inbox`. We can similarly call `children` in `Inbox` to
render `Message`.

It's also possible to use [`Named Components`](https://github.com/ReactTraining/react-router/blob/master/docs/API.md#named-components) to allow a parent component to render multiple children.

```js
// root.jsx

const App = ({children, main, sidebar}) => (
  <div>
    <h1>App</h1>
    {children}
    {main}
    {sidebar}
  </div>
);

import { Router, Route, hashHistory } from 'react-router';

const Root = () => (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
     <Route path="profile" components={Profile} />
     <Route path="groups" components={{main: Groups, sidebar: GroupsSidebar}} />
        <Route path="users/:userId" component={User} />
      </Route>
    </Route>
  </Router>
);
```

In `app.jsx` if the router matches a path of `/groups` `main` 
renders the `Group` component and `sidebar` renders the `GroupSidebar` component.  
When the URL matches a path of `/profile` `children` renders `Profile`.

## URL Params

A component's props can also hold information about a URL's parameters.
The router will match route segments starting at `:` up to the next `/`, `?`,
or `#`. Those matched values are then passed to components via their props.

So in the case of `/inbox/messages/Jkei3c32`, the router matches the string
'Jkei3c32' to `:id`, grabbing that data and making it available in the props
of the `Message` component as `props.params.id`.

We can use this id to fetch the corresponding message from the server and
display it to our users.

```js
// message.jsx

class Message extends React.Component {
  componentDidMount() {
    const id = this.props.params.id

    fetchMessage(id, message => this.setState({ message }));
    
    };
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
