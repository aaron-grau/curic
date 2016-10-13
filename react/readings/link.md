# Link

`<Link>` is imported from the `react-router` library and is one way 
users can navigate around an application, issuing an on-click navigation 
event to a route defined in your router.

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
* `activeClassName`: A CSS class name for styling `<Link>` uses when its route is active.
 A `<Link>` will be active if it's `to` prop path matches the the current URL.

```js
// app.jsx
<Link to={`users/${user.id}`} activeClassName="active">{user.name}</Link>

// when at path `users/1` the following html is rendered
<a href="/users/123" class="active">Fred</a>

// when not at path `users/1` the following is html rendered
<a href="/users/123">Michael</a>

```
See the [React docs](https://github.com/ReactTraining/react-router/blob/master/docs/guides/IndexRoutes.md) for more information on `<Link>`.
