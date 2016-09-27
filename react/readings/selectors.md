# Selectors

Selectors are functions that make it easy to extract information from the state
in different forms. Take the following state shape:

```javascript
{
	todos: {
		1: {
			id: 1,
			body: 'learn selectors',
			done: false
		},
		2: {
			id: 2
			body: 'look good doing it',
			done: true
		}
	},
	filter: 'undone'
}

```

The state's todos are stored as a hash under their id, allowing for O(1) lookup
of a single todo. This makes it slightly inconvenient to obtain the all the
todos at once, however. If we need to access all the todos in multiple parts of
our application, then it makes sense to abstract that functionality into a
selector, which is conventionally stored in a relevant reducer file:

```js
// reducers/todos.js

export const getAllTodos = (state) => {
	return Object.keys(state.todos).map((id) => state.todos[id])
};

```

That selector can then be used in multiple components' `mapStateToProps`:

```js

// components/containers/todo_list_container.jsx

import { getAllTodos } from '../../reducers/todos';

const mapStateToProps = (state) => ({todos: getAllTodos(state)});

```

Because selectors receive the application `state` as an argument, they can
utilize  different 'slices' of the state to assemble data:

```js
// reducers/todos.js

export const getAllTodos = (state) => {
	return Object.keys(state.todos).map( id => state.todos[id] );
};

export const getFilteredTodos = (state) => {
	const todos = state.todos;
	const match = state.filter === 'done';

	let result = [];
	for (let id in todos) {
		if (todos[id].done === match) { result.push(todos[id]); }
	}
	return result;
};

// components/containers/todo_list_container.jsx

import { getAllTodos, getFilteredTodos } from '../../reducers/todos';

const mapStateToProps = (state) => ({
	todos: getAllTodos(state),
	filteredTodos: getFilteredTodos(state)
});

```
