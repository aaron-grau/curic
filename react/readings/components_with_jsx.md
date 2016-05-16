# Components with JSX

### Getting the Library

JSX is not natively understood by web browsers. That means that we
must compile it into JavaScript on the back end. In the past,
Facebook's React team supported an in-browser transformer that could
be loaded via `<script>` tags, but this has now been deprecated.
Setting up an environment that allows us to pre-compile JSX before
page load is a little involved, so for our first foray into JSX we've
provided a [demo skeleton][skeleton-link] for you.

Before continuing, clone the skeleton repository and follow the
instructions in the README. As you follow along, write your component
and JSX code inside in the `counter.jsx` file.

[skeleton-link]: https://github.com/appacademy/jsx-demo-skeleton

### The Cool Stuff
JSX provides an alternate syntax to `React.createElement` which is
frankly a huge improvement. It allows a front end developer to
expressively describe how the component will look when rendered using
syntax almost exactly like html.

Our previous example created a button that counted clicks using the
following snippet:

```javascript
var ClickCounter = React.createClass({
  getInitialState: function(){
    return {count: 0};
  },
  click: function(event){
    event.preventDefault();
    this.setState({count: this.state.count + 1});
  },
  render: function(){
    return (
    React.createElement('div', {},
      React.createElement(
        'button',
        { onClick: this.click },
        "CLICK ME"
      ),
      React.createElement('span', {}, this.state.count)
    )
   );
  }
});
```

We created a nested tree structure using `React.createElement`. We can
build a tree using the third argument of the function, which takes the
children of the element currently being created.

If we used JSX instead to create this tree of React elements, our code
would look like this:

```javascript
var ClickCounter = React.createClass({
  getInitialState: function(){
    return {count: 0};
  },
  click: function(event){
    event.preventDefault();
    this.setState({count: this.state.count + 1});
  },
  render: function(){
    return (
      <div>
        <button onClick={this.click}>CLICK ME</button>
        <span>{this.state.count}</span>
      </div>
    );
  }
});
```

Isn't that a sight to behold? It is now incredibly obvious what
elements will be created when this component is rendered into the DOM.

Previously, we gave properties to the elements we were creating by
passing an object as the second argument to `React.createElement`.
With JSX we pass properties as though they were HTML attributes like
`id` or `class`. This even applies to events!

### Weirdnesses

Creating the component class `ClickCounter` seemed incredibly easy and
intuitive with JSX. There must a catch, right? Well, as with anything,
there are a few things you need to watch out for.

#### JSX "interpolation"

JSX supports an interpolation-like syntax by wrapping JS code in curly
braces `{ }`. Bear in mind though, JSX is **_not_** a templating
language like ERB or `_.template`, and the `{ }` syntax is not
_technically_ interpolation. It's actually syntactic sugar for passing
an argument to a function. As a consequence, there are no `if`/`else`
or looping constructs, and no semicolons. That's because everything
inside the braces has to resolve to a single value so that it can be
passed as an argument. (A bit of code that resolves to a single value
is called an "_expression_".) Let's look at how JSX transforms into
vanilla React to see what this means.

**This:**

```javascript
<div className={ myClass } onClick={ clickHandler }>
  { contents }
</div>
```

**gets transformed into this:**

```javascript
React.createElement("div",
  {
    className: myClass,
    onClick: clickHandler
  },
  contents
)
```

Imagine if we said `className={ myClass; }`. That would result in `{
className: myClass;, onClick: clickHandler }`. Syntax error anyone?

But often times we need to use these multiline constructs when
rendering our components. How do we do that? Well, one strategy is to
do the calculation outside the JSX:

```javascript
render: function () {
  if (typeof contents === 'undefined') {
    contents = 'nothing!'
  }
  return <p>{ contents }</p>;
}
```

Or use a ternary operator:

```javascript
<p>{ typeof contents === 'undefined' ? 'nothing!' : contents }</p>
```

You can also call a function and interpolate the result. You'll see
this frequently when mapping lists:

```javascript
<ul>
  {
    items.map(function (item) {
      return <li key={ item.id }>{ item.name }</li>;
    })
  }
</ul>
```

#### className

Weirdness number two is that, as mentioned, when we pass properties to
an element being created, we do so as if they were simply attributes.
This is very intuitive for things like `id`, but what about `class`?
Well since it is a reserved word, when passing a `class` attribute, we
must instead use `className`.

#### Including components

```javascript
ReactDOM.render(
    <ClickCounter/>,
    document.getElementById('my-component')
);
```

Have a look at the render method, using JSX. `ClickCounter` is not an
HTML tag name. But here we are pretending it is. What's up with that?
Well, JSX is really just a syntax for expressing nested data structures.
React doesn't traffic in _real_ HTML elements, but it does keep track of
the tree structure and each node's properties. `<ClickCounter>`
expresses that an instance of `ClickCounter` should be created and
rendered with no properties or children. This is just syntactic sugar
for `React.createElement(ClickCounter, {})`.
