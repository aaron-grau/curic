# Index Routes and Links In Depth

## Index Routes

Often we will want to provide a default child component to be rendered for a
particular route. 

For instance, imagine the following route hierarchy. If a user navigates to `/`,
`children` in `app.jsx` will be undefined.

```js
// App.jsx

const App = ({children}) => {
  return (
    <div>
      <h1>App</h1>
      {children}
    </div>
  )
}

// root.jsx
// imported components...

import { Router, Route, hashHistory } from 'react-router';

const Root = () => {
  return (
    <Router history={hashHistory}>
     <Route path="/" component={App}>
      <Route path="accounts" component={Accounts}/>
      <Route path="statements" component={Statements}/>
    </Route>
  </Router>
  );
}
```

One possible workaround is to render some sort of default UI like
`{children || <Home/>}`. When a user visits `/` the `App` component
is rendered but none of the children routes are, so `children` inside of
`App` is undefined and `Home` is rendered instead.

There's a problem with this though. Because `Home` isn't defined as a `<Route>`
it won't be able to participate in routing. To fix this we can use `<IndexRoute>`
to render a default `Home` component in the same position as `Accounts` and `Statements`.
Now `Home` is a first class route component with `<IndexRoute>`.

```js
// root.jsx
// imported components...

import { Router, Route, hashHistory, IndexRoute } from 'react-router';

const Root = () => {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="accounts" component={Accounts}/>
        <Route path="statements" component={Statements}/>
      </Route>
    </Router>
  );
}
```

`App` can now render `{children}` and we have a first-class
route for `Home` that can participate in routing.

## Index Redirects

Suppose you want to redirect users from `/` to `/welcome` when they
visit your site.

To do this, you need to set up an index route that does the redirect.
For this we can use the `<IndexRedirect>` component.

```js
// Root.jsx
// imported components...

import { Router, Route, hashHistory, IndexRedirect } from 'react-router';

const Root = () => {
  return (
    <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="/welcome" />
      <Route path="welcome" component={Welcome} />
      <Route path="about" component={About} />
    </Route>
  </Router>
  );
}

```
