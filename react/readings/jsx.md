# JSX

### What is JSX?

JSX is a convenient syntax (like HTML/XML) for defining tree structures
or attributes in JavaScript. If this seems vague, that's because it is.
The creators of JSX didn't constrain its usage to front end JavaScript
web applications where the only application might be rendering HTML.

There is no plan or intention for JSX to be directly interpreted 
by browsers like Chrome or Firefox. Instead, it's intended to be used by
various preprocessors (transpilers) to transform these tokens into
standard ECMAScript.

JSX _looks_ a bit strange at first. Essentially it looks like someone just
wrote HTML or XML right in the middle of their JavaScript code. For
example:

```javascript
var menu =
  <Restaurant>
    <Menu>
      <MenuItem>Carrots</MenuItem>
      <MenuItem>Chocolate Milkshake</MenuItem>
      <MenuItem>Super Fish Burrito</MenuItem>
    </Menu>
  </Restaurant>;

render(menu);
```

If a normal JavaScript engine encountered that bit of code, we would
endure a syntax error, right? Well in this case, `menu` now holds a
tree. `Restaurant` is the root node. `Menu` is the child of the root.
`MenuItem`s are children of the `Menu`.

## What's the Point?

#### Exhibit A

```javascript
ReactDOM.render(
    <div className="true-statements">I love JavaScript!</div>,
    document.body
);
```

#### Exhibit B

```javascript
ReactDOM.render(
  React.createElement(
    'div', 
    { className: 'true-statements' }, 
    'I love JavaScript'
  ),
  document.body
);
```

#### What do these things do?

Exactly the same thing. In Exhibit A, we use JSX to define our component.
See how we wrote `<div...` right in the arguments? That entire statement
(ending with `</div>`) defined a little structure in exactly the format
`React.render` was expecting. 

In Exhibit B, we use React's `createElement` method to define the
object _by hand_ (sort of). We are making a `div`. Its properties are
defined in the second argument to `createElement`, in this case a
`className`. The final argument is the string 'I love Javascript'. The
third argument to `createElement` is the child/children of the
component. In this case the only child of the `div` is the text.

After the component is created using JSX or `createElement`, we can
put it into the DOM. That's exactly what `render` does.

#### Is it mandatory when using React?

No, but it can make your code cleaner, shorter, and more intuitive.

[Resources](http://facebook.github.io/jsx/)