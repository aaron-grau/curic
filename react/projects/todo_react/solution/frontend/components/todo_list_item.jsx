var React = require('react');
var TodoStore = require('../stores/todo_store');
var TodoDetailView = require('./todo_detail_view');
var TodoDoneButton = require('./todo_done_button');


var TodoListItem = React.createClass({
  getInitialState: function(){
    return { detail: false };
  },

  handleDestroy: function (event) {
    event.stopPropagation();
    TodoStore.destroy(this.props.todo.id);
  },

  toggleDetail: function(event){
    event.preventDefault();
    this.setState({detail: !this.state.detail});
  },

  render: function () {
    var detail;
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
