# Component Declaration

There are several ways to declare a component in React.

## Inheriting from `React.Component`

The most idiomatic way of declaring a custom component is to define it as a class that extends (a.k.a. inherits from) `React.Component`. This is also the most powerful declaration style, as it allows the component to set internal state and define lifecycle methods (more on these later).

```js
class List extends React.Component {
	constructor(){
		super();
		this.state = {items: []};
	}

	componentDidMount(){
		// this method is called after the component is rendered onto the DOM
		// and fetches items from the API to be rendered as a list
		$.ajax({
			url: '/items',
			success: items => this.setState(items: items);
		})
	}

	render(){
		return (
			<h1>{this.props.title}</h1>
			<ul>
			{
				this.state.items.map( item =>	<li>{item}</li> )
			}
			</ul>
		);
	}
}
```

## `React.createClass()`

You may see this syntax out in the wild, since it was the most common way to
declare components prior to the introduction of functional components (below)
and ES6 class inheritance. This method allows you to do the same things as the
inheritance syntax, but you should avoid it, as it will be deprecated sooner or
later.

```js
const List = React.createClass({

	getInitialState() {
		return {items: []};
	}
	
	componentDidMount() {
		$.ajax({
			url: '/items',
			success: items => this.setState(items: items);
		})
	}

	render() {
		return (
			<h1>{this.props.title}</h1>
			<ul>
			{
				this.state.items.map( item =>	<li>{item}</li> )
			}
			</ul>
		);
	}
});
```

## Purely Functional Components

Purely functional components are the simplest, but least versatile, way to
declare a component. If a component has no state and needs no lifecycle hooks,
it can be written as a pure function that accepts a `props` parameter and acts
as the component's `render` method.

Note: a 'Pure' function is one that always returns the same result, given the
same parameters.

```js
const Message = (props) => {
	return <div>{this.props.text}</div>
}

// equivalent to

class Message extends React.component {
	render(){
		return <div>{this.props.text}</div>
	}
};
```

We can further simplify `Message` by using object destructuring and arrow-function implicit returns from ES6: 

```js
const Message = ({ text }) => <div>{text}</div>;
```

Functional components are the most common type of component that you will see in Redux applications, which you will learn more about later this week.
