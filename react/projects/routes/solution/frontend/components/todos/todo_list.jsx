import React from 'react';
// Components
import TodoListItem from './todo_list_item';
import TodoForm from './todo_form';

class TodoList extends React.Component {
  componentDidMount() {
    this.props.requestTodos();
  }

  render() {
    const { todos, createTodo, toggleTodo } = this.props;
    return(
      <div className='todo-list'>
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
