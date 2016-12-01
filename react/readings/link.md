# `<Link>`

React Router's `<Link>` is one way to simplify navigation around your app.
It issues an on-click navigation event to a route defined in your app's router.

To use it `import { Link } from 'react-router'`.

`<Link>` can take a number of different props.

* `to`: A route location description that can point to an absolute path, e.g. `/about`

  ```js
  <Link to="/about">About</Link>
  ```
* `onClick(e)`: A custom click event handler. Can call `e.preventDefault` and `e.stopPropogation`
like any other click handler.

  ```js
  <Link to="/about" onClick={e => this.handleClick(e)}>Link</Link>
  ```
* `activeClassName`: A CSS class name for styling a `<Link>` when its route is active.
 A `<Link>` will be active if its `to` prop path matches the the current URL.

  ```js
  // app.jsx
  <Link to={`users/${user.id}`} activeClassName="active">{user.name}</Link>

  // when at path `users/123` the following html is rendered
  <a href="#/users/123" class="active">Michael</a>

  // when not at path `users/123` the following is html rendered
  <a href="#/users/123">Michael</a>

  ```
See the [React docs](https://github.com/ReactTraining/react-router/blob/master/docs/API.md#link) for more information on using `<Link>`.
