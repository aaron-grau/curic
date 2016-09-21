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
      <div>
        <ul className="todo-list">
          {todos.map(todo => (
            <TodoListItem
              key={`todo-list-item${todo.id}`}
              todo={todo}
              toggleTodo={toggleTodo} />
          ))}
        </ul>
        <TodoForm createTodo={createTodo}/>
      </div>
    );
  }
};

export default TodoList;
