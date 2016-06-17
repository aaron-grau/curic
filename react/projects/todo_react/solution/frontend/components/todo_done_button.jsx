var React = require('react');
var TodoStore = require('../stores/todo_store');

var TodoDoneButton = React.createClass({
  handleDone: function(event){
    event.stopPropagation();
    TodoStore.toggleDone(this.props.todo.id);
  },

  render: function () {
    if(this.props.todo.done) {
      text = "Undo!";
      classname = "btn btn-xs btn-danger done-button";
    } else {
      text = "Im done!";
      classname = "btn btn-xs btn-success done-button";
    }
    var text = this.props.todo.done ? "Undo" : "Done";
    return (
      <button
        className={classname}
        onClick={this.handleDone}>{text}</button>
    );
  }
});

module.exports = TodoDoneButton;