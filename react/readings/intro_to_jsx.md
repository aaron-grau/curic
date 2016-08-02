# JSX

## What is JSX?

JSX is a JavaScript syntax extension that resembles HTML and XML. React
code written in JSX mirrors the HTML it produces, improving
readability and ease-of-development. 

Consider the following examples, both of which represent the HTML 
`<div class='quotes'><h1>I Love JavaScript!</h1></div>`.

```jsx
// jsx

const quotes = (
	<div className="quotes">
	  <h1>I love JavaScript!</h1>
	</div>
);

// plain Javascript

const quotes = 
React.createElement(
  'div', 
  { className: 'quotes' }, 
  React.createElement(
    'h1',
    {},
    'I love Javascript'
  )
);

// `quotes` is rendered onto the `document.body`

ReactDOM.render(quotes, document.body)

```

In both examples above, `quotes` is assigned to a React component that renders
the HTML onto the page when passed to `ReactDOM.render(quotes, document.body)`.

## Interpolation

Even though it looks like HTML, JSX is still Javascript at the core. As such,
you can interpolate plain Javascript into JSX using `{}` between element tags or
for attribute values.

```js
let myClass = 'example';

const myElement = (
	<h1 className={ myClass }>
		{ 1 + 2 + 3 }
	</h1>
);		

// myElement renders as <h1 class='example'>6<h1>

```

Note that, because the return value is inserted into your element, only
single expressions are allowed.

```

const myElement = (
	<h1>
	{
		1 + 2 + 3;
		4 + 5 + 6;
	}
	</h1>
);

// SyntaxError

```

## Transpilation

JSX cannot be directly interpreted by browsers like Chrome or Firefox. Instead,
JSX code must be passed through a preprocessor such as `Babel` that
**transpiles** it into vanilla Javascript. You'll learn more about these in a moment.


## Official Documentation

Although we'll only use JSX for developing React components, it can actually be
used in other applications as well. You can read more about JSX
[here][resources].

[resources](http://facebook.github.io/jsx/)
