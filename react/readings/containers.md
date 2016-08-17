# Containers

As you saw in the [`Provider`][provider] and [`connect()`][connect] readings,
there can be quite a bit of code involved in connecting a component to the
store. Putting all this code into the component with heavy rendering logic tends
to cause code bloat and violate the principle of separation of concerns.
Therefore, it's a common pattern in Redux code to create separate
**presentational components** from their connected counterparts, called
**containers**.

## Example

```js
// entry.jsx
import { Provider } from 'react-redux';
import reducer from 'reducers/index';
import ListContainer from 'components/containers/list_container';

const store = createStore(reducer);

ReactDOM.render(<Provider store={store}><ListContainer/></Provider>, root);

```
```js
// components/containers/list_container.jsx

import List from '../list';
import { connect } from 'react-redux';
import { resetItems } from '../../actions/items'
const mapStateToProps = (state) => {
	items: state.items
}

const mapDispatchToProps = (dispatch) => {
	resetItems: dispatch(resetItems);
}

const ListContainer = connect(mapStateToProps, mapDispatchToProps)(List);
export default ListContainer;
```
```js
// components/list.jsx

const List = ({ items, resetItems }) => {
	const displayItems = items.map((item, idx) => {
		return (
			<Item
				key={item.name + idx}
				body={item.body}
				/>
		);
	});

	return (
		<div>
		<h1 onClick={resetItems}>Click to Reset</h1>
		{displayItems}
		</div>
		)
};

export default List;
```

## Choosing Containers

Not every component needs to be connected to the store. Generally, you will only
want to create containers for the 'big' components in your app that represent
sections of a page and contain many small, purely presentational components.
These larger container components are then responsible for mapping state and
dispatch props that can be passed down to all their presentational children. Use
your best judgement, but in general, aim to have fewer containers rather than
more.

[provider]: provider.md
[connect]: connect.md