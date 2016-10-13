import React from 'react';
import TodoDetailViewContainer from './todo_detail_view_container';
import { hashHistory } from 'react-router';

class TodoListItem extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDetail = this.toggleDetail.bind(this);
  }

  toggleDetail(e) {
      e.preventDefault();
      hashHistory.push(`/dashboard/todos/${this.props.todo.id}`);
  }

  render() {
    const { todo , toggleTodo } = this.props;
    const { title, done } = todo;
    let detail;
    // if (this.state.detail) {
    //   detail = (
    //     <TodoDetailViewContainer todo={todo} />
    //   );
    // }
    return (
      <li className="todo-list-item" >
        <button
          onClick={this.toggleDetail}>
          {title}
        </button>
        <button
          className={done ? "toggle done" : "toggle undone"}
          onClick={toggleTodo(todo)}>
          {done ? "Undo" : "Done"}
        </button>
      </li>
    );
  }
};

export default TodoListItem;
