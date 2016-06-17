"use strict";

const React = require('react');
const StepDoneButton = require('./step_done_button');

const StepListItem = React.createClass({
  render: () => {
    return (
      <div className="step-list-item">
        <div className="step-header">
          { this.props.step.title }
          <StepDoneButton step={this.props.step} todo_id={this.props.todo_id}/>
          <p> {this.props.step.body}</p>
        </div>
      </div>
    );
  }
});

module.exports = StepListItem;
