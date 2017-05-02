# `<Link>`

React Router's `<Link>` is one way to simplify navigation around your
app. It issues an on-click navigation event to a route defined in your
app's router.

To use it `import { Link } from 'react-router'`.

`<Link>` can take a number of different props.

* `to`: A route location description that can point to an absolute path,
e.g. `/about`

  ```jsx
  <Link to="/about">About</Link>
  ```
* `onClick(e)`: A custom click event handler. Can call
`e.preventDefault` and `e.stopPropogation` like any other click handler.

  ```jsx
  <Link to="/about" onClick={e => this.handleClick(e)}>Link</Link>
  ```


## `<NavLink>`

The `<NavLink>` works just like a `<Link>`, but with a little extra
functionality. It has the ability to add add extra styling when the path
it links to matches the current path. This makes it an ideal choice for
a nav bar, hence the name.
This styling can be controlled by three extra props.

* `activeClassName`: A CSS class name for styling a `<Link>` when its
route is active.  A `<Link>` will be active if its `to` prop path
matches the current URL.

  ```jsx
  // app.jsx
  <Link to={`users/${user.id}`} activeClassName="active">{user.name}</Link>

  // when at path `users/123` the following html is rendered
  <a href="#/users/123" class="active">Michael</a>

  // when not at path `users/123` the following is html rendered
  <a href="#/users/123">Michael</a>

  ```

* `activeStyle`: A react style object that will be applied inline to the
`<Link>` when its `to` prop matches the current URL.

  ```jsxx
  // app.jsx
  <Link to={`users/${user.id}`} activeStyle={{ fontWeight: 'bold' }}>{user.name}</Link>

  // when at path `users/123` the following html is rendered
  <a href="#/users/123" style="font-weight:bold;" class="active">Michael</a>

  // when not at path `users/123` the following is html rendered
  <a href="#/users/123">Michael</a>
  ```

* `exact`: A boolean prop that defaults to `false`.
If set to true the `activeStyle` and `activeClassName` props will only
be applied when the current URL exactly matches the `to` prop. For
example

  ```jsxx
  // this link will match the URL `/users/123`
  <Link to="/users">Users</Link>

  // whereas this one will not
  <Link exact={true} to="/users">Users</Link>
  ```


## Resources
* [Link](https://reacttraining.com/react-router/web/api/Link)
* [NavLink](https://reacttraining.com/react-router/web/api/NavLink)
