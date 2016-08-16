React components can be kept up-to-date with store information by subscribing their `render()` methods.

```js
// subscribing `render()` example

class OrangeDisplayContainer extends React.Component {
	constructor({store}){
		store.subscribe(this.render);
	}
	render(){
		return <OrangeDisplay oranges={ store.getState().orange || 0 }/>
	}
};

const OrangeDisplay = ({ oranges }) => (
	<div> There are { oranges } oranges in the store! </div>
);

ReactDOM.render(<OrangeDisplayContainer store={store}/>, hook);
```
Here, `OrangeDisplayContainer` re-renders each time the store changes, trickling
down `store.getState().orange` as a prop to the `OrangeDisplay`, which handles
the actual visual rendering.

You might be thinking that we could cut out the `OrangeDisplayContainer` if we
gave `OrangeDisplay` internal state and subscribed a method that called
`this.setState` each time the store changed. However, this would violate the
first principle of Redux ('There is a single source of truth') by storing the
number of oranges in the `store` as well as the component's `this.state`.

Subscribing React components to a Store via a subscribed 'container' is such common pattern that the creators of Redux created a Node package, `react-redux`, to automate the process of connecting components to the store. Read on to learn about the `<Provider/>` and `connect()` APIs provided by `react-redux`.
