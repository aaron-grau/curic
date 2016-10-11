import React from 'react';
import TodoDetailViewContainer from './todo_detail_view_container';

class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { detail: false };
    this.toggleDetail = this.toggleDetail.bind(this);
  }

  toggleDetail(e) {
    e.preventDefault();
    this.setState({detail: !this.state.detail});
  }

  render() {
    const { todo , toggleTodo } = this.props;
    const { title, done } = todo;
    let detail;
    if (this.state.detail) {
      detail = (
        <TodoDetailViewContainer todo={todo} />
      );
    }
    return (
      <li className="todo-list-item">
        <div className="todo-header">
          <a onClick={this.toggleDetail}>{title}</a>
          <button
            className={done ? "done" : "undone"}
            onClick={toggleTodo(todo)}>
            {done ? "Undo" : "Done"}
          </button>
        </div>
        {detail}
      </li>
    );
  }
};

export default TodoListItem;
