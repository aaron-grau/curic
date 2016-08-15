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
    const { todo: {title, done}, toggleTodo } = this.props;
    let detail;
    if (this.state.detail) {
      detail = (
        <TodoDetailViewContainer todo={todo} />
      );
    }
    return (
      <li className="todo-list-item">
        <div className="todo-header">
          <a onClick={this.toggleDetail()}>{ title }</a>
          <button 
            className={ done ? "done" : "undone"}
            onClick={toggleTodo.bind(null, todo)}>
            { done ? "Undo" : "Done"}
          </button>
        </div>
        { detail }
      </li>
    );
  }
};

export default TodoListItem;
