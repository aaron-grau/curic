"use strict";

const React = require('react');
const StepStore = require('../stores/step_store');

const StepDoneButton = React.createClass({
  handleDone: (event) => {
    event.stopPropagation();
    StepStore.toggleDone(this.props.todo_id, this.props.step.id);
  },

  render: () => {
    if(this.props.step.done) {
      text = "Undo!";
      classname = "btn btn-xs btn-danger done-step-button";
    } else {
      text = "Done!";
      classname = "btn btn-xs btn-success done-step-button";
    }
    const text = this.props.step.done ? "Undo" : "Done";

    return (
      <button
        className={classname}
        onClick={this.handleDone}>{text}</button>
    );
  }
});

module.exports = StepDoneButton;
