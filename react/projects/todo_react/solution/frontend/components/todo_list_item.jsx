"use strict";

const React = require('react');
const TodoStore = require('../stores/todo_store');
const TodoDetailView = require('./todo_detail_view');
const TodoDoneButton = require('./todo_done_button');


const TodoListItem = React.createClass({
  getInitialState: () =>{
    return { detail: false };
  },

  handleDestroy: (event) => {
    event.stopPropagation();
    TodoStore.destroy(this.props.todo.id);
  },

  toggleDetail: (event) => {
    event.preventDefault();
    this.setState({detail: !this.state.detail});
  },

  render: () => {
    const detail;
    if(this.state.detail){
      detail = (
        <TodoDetailView handleDestroy={ this.handleDestroy } todo={this.props.todo} />
      );
      className = "list-item";
    } else {
      className = "list-item min";
    }
    return (
      <div className={className}>
        <div className="todo-header">
          <a onClick={this.toggleDetail}>{ this.props.todo.title}</a>
          <TodoDoneButton todo={this.props.todo}/>
        </div>
        { detail }
      </div>
    );
  }
});

module.exports = TodoListItem;
