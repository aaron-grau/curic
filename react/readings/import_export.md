# Importing and Exporting

ES6 provides a more powerful way to import and export functions, objects, or
primitive data types. We've been using `module.exports` and `require` to
import and export, but that can get messy if you have multiple exports from a
single file.

ES6 allows us to easily `export` specific named objects, and `import` them by
name in other files.

## Exporting

### Multiple Items per File

Say we want to export multiple functions from a single file using Node's
`module.exports`. Our code might look like this:

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
Having to wrap everything in an object and use Node's `module.exports` is messy.  
Fortunately, ES6 provides us with better syntax.  

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
We can export the whole thing using ES6's `export default`:

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

In the past we used Node's `require` in conjunction with
`module.exports` to import and use items to another file. From now on, we will
use ES6's `import`.

For example, if we're importing a single, default export, we can do the following:

```javascript
import TodoList from './todo_list';
import App from './app';
```

But what do we do if we have multiple exported objects in the same file, like our
`todo_actions.js` defined above?  We can either import them one at a time or all at
once, depending on what our code needs.

For instance, if our file only needs the `createTodo` and `receiveTodo`
functions, we can do the following:

```javascript
import { createTodo, receiveTodo } from './todo_actions';
```

The curly braces are required when we import from a file with multiple exports, and
need to specify which particular exports we want.

Does this look familiar? It's [object destructuring][obj-destructuring]! We're
just extracting the data that's been exported from the other file and assigning
it to a distinct variable to use in our current file.

[obj-destructuring]: ./object_destructuring.md

We can give default, unnamed exports any name we want when importing them.  But
with named exports, the import names have to exactly match.  If we want all the
contents of a file containing multiple exports, we can use a `*` to gather up everything:

```javascript
import * as todoActions from './todo_actions';
```

Note that we must alias our imported objects using the `as` keyword to be able
to refer to them later.

## Additional Resources

* [StackOverflow answer](https://stackoverflow.com/questions/36795819/when-should-i-use-curly-braces-for-es6-import/36796281#36796281)
* [Import docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
* [Export docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)
* [AirBnB style guide](https://github.com/airbnb/javascript#modules)
