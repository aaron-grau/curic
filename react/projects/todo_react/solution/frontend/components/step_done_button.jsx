var React = require('react');
var StepStore = require('../stores/step_store');

var StepDoneButton = React.createClass({
  handleDone: function(event){
    event.stopPropagation();
    StepStore.toggleDone(this.props.todo_id, this.props.step.id);
  },

  render: function () {
    if(this.props.step.done) {
      text = "Undo!";
      classname = "btn btn-xs btn-danger done-step-button";
    } else {
      text = "Done!";
      classname = "btn btn-xs btn-success done-step-button";
    }
    var text = this.props.step.done ? "Undo" : "Done";

    return (
      <button
        className={classname}
        onClick={this.handleDone}>{text}</button>
    );
  }
});

module.exports = StepDoneButton;