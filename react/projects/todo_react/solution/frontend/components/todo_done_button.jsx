const React = require('react');
const TodoStore = require('../stores/todo_store');

const TodoDoneButton = React.createClass({
  handleDone(event) {
    event.stopPropagation();
    TodoStore.toggleDone(this.props.todo.id);
  },

  render() {
    if (this.props.todo.done) {
      classname = "btn btn-xs btn-danger done-button";
    } else {
      classname = "btn btn-xs btn-success done-button";
    }
    const text = this.props.todo.done ? "Undo" : "Done";
    return (
      <button
        className={classname}
        onClick={this.handleDone}>{text}</button>
    );
  }
});

module.exports = TodoDoneButton;
