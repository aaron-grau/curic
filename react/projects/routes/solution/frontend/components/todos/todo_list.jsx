import React from 'react';

import TodoListItem from './todo_list_item';

const TodoList = ({ todos, toggleTodo, router }) => {

  const navigateToDetailView = todo => e => {
    router.push(`/dashboard/todos/${todo.id}`);
  };

  const handleToggle = todo => e => {
    toggleTodo(Object.assign({}, todo, {
      done: !todo.done
    }));
  }

  return (
    <div className='todo-list'>
      <h3>todo list</h3>
      <ul>
        {todos.map(todo => (
          <TodoListItem
            key={`todo-list-item${todo.id}`}
            todo={todo}
            handleToggle={handleToggle(todo)}
            navigateToDetailView={navigateToDetailView(todo)} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
