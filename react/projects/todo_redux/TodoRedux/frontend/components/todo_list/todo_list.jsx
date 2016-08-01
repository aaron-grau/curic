import React from 'react';
// Components
import TodoListItemContainer from './todo_list_item_container';
import TodoForm from './todo_form';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.requestTodos();
  }

  render() {
    return(
      <div>
        <ul className="todo-list">
          {this.props.todos.map(todo => <TodoListItemContainer key={todo.id} todo={todo} />)}
        </ul>
        <TodoForm createTodo={this.props.createTodo}/>
      </div>
    );
  }
};

export default TodoList;