import React from 'react';

const TodoListItem = ({ todo, handleToggle, navigateToDetailView }) => (
  <li className="todo-list-item" >
    <button
      onClick={navigateToDetailView}>
      {todo.title}
    </button>
    <button
      className={todo.done ? "toggle done" : "toggle undone"}
      onClick={handleToggle}>
      {todo.done ? "Undo" : "Done"}
    </button>
  </li>
);

export default TodoListItem;
