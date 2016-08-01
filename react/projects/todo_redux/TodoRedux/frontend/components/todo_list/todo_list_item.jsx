import React from 'react';
import TodoDetailViewContainer from './todo_detail_view_container';

const TodoListItem = React.createClass({
  getInitialState() {
    return { detail: false };
  },

  toggleDetail(event) {
    event.preventDefault();
    this.setState({detail: !this.state.detail});
  },

  render() {
    let detail, className;
    if (this.state.detail) {
      detail = (
        <TodoDetailViewContainer todo={this.props.todo} />
      );
      className = "list-item";
    } else {
      detail = "";
      className = "list-item min";
    }
    return (
      <div className={className}>
        <div className="todo-header">
          <a onClick={this.toggleDetail}>{ this.props.todo.title}</a>
          <button onClick={this.props.toggleTodo.bind(null, this.props.todo)}>{this.props.todo.done ? "Undo" : "Done"}</button>
        </div>
        { detail }
      </div>
    );
  }
});

export default TodoListItem;
