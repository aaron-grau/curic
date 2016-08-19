# Containers

As you saw in the [`Provider`][provider] and [`connect()`][connect] readings,
there can be quite a bit of code involved in connecting a component to the
store. Putting all this code into the component with heavy rendering logic tends
to cause bloated components and violates the principle of separation of
concerns. Therefore, it's a common pattern in Redux code to separate
**presentational components** from their connected counterparts, called
**containers**.


## Example

```js
// entry.jsx
import React from 'react';
import ReactDOM fromt 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from 'reducers';
import ListContainer from 'components/list/list_container';

const store = createStore(reducer);

const Root = ({ store }) => (
	<Provider store={store}>
		<ListContainer />
	</Provider>
);

ReactDOM.render(
	<Root store={store} />,
	document.getElementById('root')
);
```
---

```js
// components/list/list_container.jsx
import { connect } from 'react-redux';
import { resetItems } from '../../actions/items' // action creator
import List from '../list'; // presentational component to connect

const mapStateToProps = (state) => { // map slice of state to props object
	items: state.items
};

const mapDispatchToProps = (dispatch) => { // create action dispatcher
	resetItems: () => dispatch(resetItems);
};

const ListContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(List);

export default ListContainer;
```
---

```js
// components/list/list.jsx
import React from 'react';
import Item from 'components/list/item';

const List = ({ items, resetItems }) => {
	const displayItems = items.map((item, idx) => (
		<Item key={idx} body={item.body}>
			{item.name}
		</Item>
	);

	return (
		<div>
			<h1 onClick={resetItems}>
				Click to Reset
			</h1>
			{displayItems}
		</div>
	);
};

export default List;
```

## Choosing Containers

Not every component needs to be connected to the store. Generally, you will only
want to create containers for the 'big' components in your app that represent
sections of a page, and contain smaller purely functional presentational
components. These larger container components are responsible for mapping state
and dispatch props that can be passed down to all their presentational children.
Use your best judgement, but in general, aim to have fewer containers rather
than more.

[provider]: ./provider.md
[connect]: ./connect.md
