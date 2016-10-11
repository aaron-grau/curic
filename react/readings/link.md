# Links

`<Link>` is one way users can navigate around your application, issuing
an on-click navigation event to a route defined in your router. `<Link>` renders a fully accessible anchor tag with the proper href in
the DOM.

Here's an example.

```js
// app.jsx

class App extends React.components {
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/about">About</Link></li> // =>  <li><a href="#/about">About</a></li>
          <li><Link to="/inbox">Inbox</Link></li> // => <li><a href="#/inbox">Inbox</a></li>
        </ul>
        {this.props.children}
      </div>
    )
  }  
}

```

`<Link>` can take a number of different props, including:

* `to`: A route location description that can point to an absolute path, e.g. `/about`
* `onClick(e)`: A custom handler for the click event.
* `activeClassName`: The className a `<Link>` receives when its route is active that
can be used for styling.

A `<Link>` will be active if the current route is either the linked route
or any descendant of the linked route.

See the [React docs](https://github.com/ReactTraining/react-router/blob/master/docs/guides/IndexRoutes.md) for more information on `<Link>`.
