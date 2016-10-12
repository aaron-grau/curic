import React from 'react';
// Components
import TodoListItem from './todo_list_item';
import TodoForm from './todo_form';

class TodoList extends React.Component {
  render() {
    const { todos, toggleTodo } = this.props;
    return(
      <div className='todo-list'>
        <h3>todo list</h3>
        <ul>
          {todos.map(todo => (
            <TodoListItem
              key={`todo-list-item${todo.id}`}
              todo={todo}
              toggleTodo={toggleTodo} />
          ))}
        </ul>
      </div>
    );
  }
};

export default TodoList;
