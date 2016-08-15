# Importing and Exporting

ES6 provides a more powerful way to import and export functions, objects, or
primitive data types. We've been using `module.exports` and `require` to
import and export, but that can get messy if you have multiple exports from a
single file.

ES6 allows us to easily export specific named objects, and import them by
name in other files.

## Exporting

Say you want to export multiple functions from a single file. Part of your
code might look like this:

```javascript
const TodoActions = {
  receiveTodo(todo){
    type: "RECEIVE_TODO",
    todo
  },
  fetchTodos(){
    type: "FETCH_TODOS"
  },
  createTodo(todo){
    type: "CREATE_TODO",
    todo
  }
};

module.exports = TodoActions;
```

Wrapping everything up in a `TodoActions` object is kind of messy, though.
Let's streamline it and change these up to ES6-style fat arrow functions.

```javascript
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
```

We have a few options for exporting, now. We can simply refer to each
function by name and export them all at once.

```javascript
export { receiveTodo, fetchTodos, createTodo };
```

Or we can just export each item as we write it.

```javascript
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

Exporting is slightly different for files which just have a single export.
You can just export the whole thing as the default export:

```javascript
class TodoList{
  generateList(){
    //We'd write the code to create the list here
  }
  render(){
    //We'd invoke generateList here and print out the list
  }
}

export default TodoList;
```

We can also use default exports if there's just a single function in the
file:

```javascript
export default function(num, action){
  //code here
}
```

## Importing

Now let's use `import` to use these exports in another file.

Here's some examples for when you're importing a single, default export.
Remember that you have to give unnamed exports a name when importing!

```javascript
import TodoList from './todo_list';
import ChessGame from './chess_game';
```

Let's think about our constants, though. What do we do if we have multiple
exported objects in the same file? We can either import them one at a time or
all at once, depending on what the file we're importing them into needs.

For instance, if we're writing a component that will just create a new todo,
we could include this line:

```javascript
import { createTodo } from './todo_actions';
```

Note that we use the curly braces because we want that specific export from
the `todo_actions` file.

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
