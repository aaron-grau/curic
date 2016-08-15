import React from 'react';
import TodoDetailViewContainer from './todo_detail_view_container';

class TodoListItem extends React.Component {
  constructor(props){
    super(props);
    this.state = { detail: false };
  }

  toggleDetail() {
    return (e) => {
      event.preventDefault();
      this.setState({detail: !this.state.detail});
    }
  }

  render() {
    let detail;
    if (this.state.detail) {
      detail = (
        <TodoDetailViewContainer todo={this.props.todo} />
      );
    } else {
      detail = "";
    }
    return (
      <li className="todo-list-item">
        <div className="todo-header">
          <a onClick={this.toggleDetail()}>{ this.props.todo.title}</a>
          <button 
            className={this.props.todo.done ? "done" : "undone"}
            onClick={this.props.toggleTodo.bind(null, this.props.todo)}>
            {this.props.todo.done ? "Undo" : "Done"}
          </button>
        </div>
        { detail }
      </li>
    );
  }
};

export default TodoListItem;
