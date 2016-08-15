# Importing and Exporting

ES6 provides a more powerful way to import and export functions, objects, or
primitive data types. We've been using `module.exports` and `require` to
import and export, but that can get messy if you have multiple exports from a
single file.

ES6 allows us to easily `export` specific named objects, and `import` them by
name in other files.

## Exporting

### Multiple Items per File

Say you want to export multiple functions from a single file using Node's
`module.exports`. Your code might look like this:

```javascript
// todo_actions.js
const TodoActions = {
  receiveTodo(todo) {
    type: "RECEIVE_TODO",
    todo
  },
  fetchTodos() {
    type: "FETCH_TODOS"
  },
  createTodo(todo) {
    type: "CREATE_TODO",
    todo
  }
};

module.exports = TodoActions;
```
Having to wrap everything in an object and using Node's `module.exports` is kinda messy when we can use ES6.

Using ES6's `export`, we have two options for exporting our functions. We can simply refer to each function by name and export them all at once, like so:

```javascript
// todo_actions.js
const receiveTodo = todo => ({
  type: "RECEIVE_TODO",
  todo
});

const fetchTodos = () => ({
  type: "FETCH_TODOS"
});

const createTodo = todo => ({
  type: "CREATE_TODO",
  todo
});

export { receiveTodo, fetchTodos, createTodo };
```

Or we can export each function as we write it, like so:

```javascript
// todo_actions.js
export const receiveTodo = todo => ({
  type: "RECEIVE_TODO",
  todo
});

export const fetchTodos = () => ({
  type: "FETCH_TODOS"
});

export const createTodo = todo => ({
  type: "CREATE_TODO",
  todo
});
```

**NB**: This is the preferred method when exporting multiple items from
a single file.

### One Item per File
Exporting is slightly different for files which just have a single export.
You can just export the whole thing using ES6's `export default`:

```javascript
// todo_list.js
class TodoList {
  // class definition
}

export default TodoList;
```

We can also use `default export` if there's just a single function in the
file, like so:

```javascript
// app.js
export default function () {
  // function body
}
```

## Importing

In the past you probably used Node's `require` in conjunction with
`module.exports` to import and use items to another file. From now on, we will
use ES6's `import`.

Here's some examples for when you're importing a single, default export.

```javascript
import TodoList from './todo_list';
import App from './app';
```

**NB**: Remember that you have to give unnamed exports a name when importing!

What do we do if we have multiple exported objects in the same file? Like our
`TodoActions` defined above.

We can either import them one at a time or all at once, depending on what the
file we're importing them into needs.

For instance, if your file only needs the `createTodo` function:

```javascript
import { createTodo } from './todo_actions';
```

We use the curly braces because we want that specific export from the
`todo_actions` file.

Does this look familiar? It's object destructuring! We're just extracting the
data that's been exported from the other file and assigning it to a distinct
variable to use in our current file.

If we wanted exports, we could just keep listing them on the same line.

```javascript
import { fetchTodos, createTodo } from './todo_actions';
```

You can give default, unnamed imports whatever name you want to refer to them
in your file. However, because we exported specific member objects from our
actions, the names do have to match so Javascript knows exactly which object
we want.

If we wanted all the contents of a file containing multiple exports, we can
use a `*` to gather up everything:

```javascript
import * as todoActions from './todo_actions';
```

Note that we must alias our imported objects using the `as` keyword to be able
to refer to them later.

## Additional Resources

* [Import docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
* [Export docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)
* [AirBnB style guide](https://github.com/airbnb/javascript#modules)
