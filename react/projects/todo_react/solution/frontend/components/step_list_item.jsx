var React = require('react');
var StepDoneButton = require('./step_done_button');

var StepListItem = React.createClass({
  render: function () {
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