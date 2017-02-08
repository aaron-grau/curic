# React Router Introduction

## Overview

[React Router](https://github.com/ReactTraining/react-router/) is a routing 
library that helps you add views to your React application, while keeping the 
URL in sync with what's being displayed on the page.

To use React Router in your projects `npm install --save react-router`. Then
import `Router`, `hashHistory`, and `Route` from the `react-router` library.

* `Router` is the primary component of the router that wraps our route hierarchy
* `hashHistory` listens to the browser's address bar for changes so the router
can match the URL to routes
* `Route` defines a route's `path` and the React `component` rendered
at that URL


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

The `<Router>` config above would cause an app to render the specified components at 
the following paths.

Path                    | Rendered Components
------------------------|-----------
`/`                     | `App`
`/about`                | `App -> About`
`/inbox`                | `App -> Inbox`
`/inbox/messages/:id`   | `App -> Inbox -> Message`

Underneath the hood, React Router converts the hierarchy of 
`<Route>` elements to an array of routes. When the app is directed to a new URL, the 
router attempts to match the new path to one found in this array. 
When a URL matches the path of a `<Route>`, the corresponding 
component or components are displayed to the user.

As you can see from the example, it's possible to render nested components 
and build longer paths by nesting routes. For example, when a user 
visits `/about` both `App` and `About` are rendered. When a user visits 
`/inbox/messages/:id` `App`, `Inbox`, and `Message` are rendered.

## Rendering Components

While the router figures out what components to be rendered based on the URL,
it does not determine how they are rendered. Instead, parent components have 
access via `props` to `children` components nested one level below.

For example, the `<Router>` above renders the following React components:

```js
const Message = () => (
  <h3>Message</h3>
);
```

```js
const Inbox = ({ children }) => (
  <div>
    <h2>Inbox</h2>
    {children}
  </div>
);

```

```js
const App = ({ children }) => (
  <div>
    <h1>App</h1>
    {children}
  </div>
);
```

Since we nested `Inbox` under `App` in our router, we gain access to the
`Inbox` component in `App`'s props as `props.children`. All we have to do is render 
`children` in `App` to render `Inbox`. We similarly render `children` in `Inbox` to
render `Message` because `Message` is nested under `App`.

**NB**: If your nested component isn't rendering in your parent component,
there's a good chance you are not rendering `props.children` in your parent component's
render method.

It's also possible to use [`named components`](https://github.com/ReactTraining/react-router/blob/master/docs/API.md#named-components) to allow a parent component to render multiple children.

```js
// root.jsx

import { Router, Route, hashHistory } from 'react-router';
import App from './app.jsx'

const Root = () => (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="profile" component={Profile} />
      <Route path="groups" components={{main: Groups, sidebar: GroupsSidebar}} />
        <Route path="users/:userId" component={User} />
      </Route>
    </Route>
  </Router>
);
```

If the router matches the `/groups` path, `main` renders the `Groups` component 
and `sidebar` renders the `GroupsSidebar` component. `Profile` is not defined and 
won't render. 

When the URL matches a path of `/profile` `children` renders `Profile`.
`Groups` and `GroupsSidebar` are not defined and won't render.

```js
// app.jsx

const App = ({children, main, sidebar}) => (
  <div>
    <h1>App</h1>
    {children}
    {main}
    {sidebar}
  </div>
);
```

## URL Params

A component's props can also hold information about a URL's parameters.
The router will match route segments starting at `:` up to the next `/`, `?`,
or `#`. Those matched values are then passed to components via their props.

So in the case of `/inbox/messages/Jkei3c32`, the router matches the string
'Jkei3c32' to the `:id` param in the path `/inbox/messages/:id`, grabbing that data and 
making it available in the props of the `Message` component as `props.params.id`.

We can use this id to fetch the corresponding message from the server and
display it to our users.

```js
class Message extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    const id = this.props.params.id
    fetchMessage(id, message => this.setState({ message }));
  }
  
  render () {
    // ...
   }
}

```

We're not just limited to matching params though. Because route paths are just
strings, we can also use symbols to [dynamically match routes to different URLs](https://github.com/ReactTraining/react-router/blob/master/docs/guides/RouteMatching.md#path-syntax)!

## Resources

* [React docs](https://github.com/ReactTraining/react-router/)
* [Route matching](https://github.com/ReactTraining/react-router/blob/master/docs/guides/RouteMatching.md)
* [More on histories](https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md#hashhistory)
