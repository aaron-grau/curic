# Component Declaration

There are several ways to declare a component in React.

## Inheriting from `React.Component`

The most idiomatic way of declaring a custom component is to define it as a
JS class that [`extends`][extends] `React.Component`. This is also the
most powerful declaration style, as it allows the component to set internal
state and define lifecycle methods.

```js
class List extends React.Component {
	constructor() {
		super();
		this.state = { items: [] };
	}

	componentDidMount() {
		// this method is called after the component is rendered onto the DOM
		// and fetches items from the API to be rendered as a list
		$.ajax({
			url: '/items',
			success: items => this.setState(items: items);
		});
	}

	render() {
		return (
			<h1>{this.props.title}</h1>
			<ul>
			{
				this.state.items.map(item =>(<li>{item}</li>))
			}
			</ul>
		);
	}
}
```

[extends]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends

## `React.createClass()`

You may see this syntax out in the wild, since it was the most common way to
declare components prior to the introduction of functional components
and ES6 class inheritance. This method allows you to do the same things as
inheriting from `React.Component`.

```js
const List = React.createClass({

	getInitialState() {
		return { items: [] };
	},

	componentDidMount() {
		$.ajax({
			url: '/items',
			success: items => this.setState(items: items);
		});
	},

	render() {
		return (
			<h1>{this.props.title}</h1>
			<ul>
			{
				this.state.items.map(item =>	<li>{item}</li>)
			}
			</ul>
		);
	}
});
```

**NB**: Though you will probably encounter code using `React.createClass` and
should know what it does, you should not use it because it will mostly likely
be deprecated soon.

## Purely Functional Components

Purely [functional components][functional-components] are the simplest, but
least versatile, way to declare a component. If a component has no state and
needs no lifecycle hooks, it can be written as a pure function that accepts a
`props` parameter and acts as the component's `render` method.

**NB**: A *pure function* is a function whose output is solely determined by its
input and has no side effects.

Here is an example written as a functional component:

```js
const Message = (props) => {
	return <div>{props.text}</div>
};
```

which is equivalent to writing it as:
```js
class Message extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>{this.props.text}</div>
		);
	}
};
```

We can further simplify `Message` by using object de-structuring and
arrow-function implicit returns from ES6.  Prefer this syntax:

```js
const Message = ({ text }) => (
	<div>{text}</div>
);
```
Functional components are the most common type of component that you will see in Redux applications, which you will learn more about later this week.

[functional-components]: https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html#stateless-functional-components
