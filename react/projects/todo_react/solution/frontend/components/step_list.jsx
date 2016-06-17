var React = require('react');
var StepListItem = require('./step_list_item');

var StepList = React.createClass({
  componentWillUnmount: function () {
  },

  render: function () {
    var that = this;
    return (
      <div className="step-list">
        {
          this.props.steps.map(function(step) {
            return (
              <StepListItem key={step.id} step={step} todo_id={that.props.todo_id} />
            );
          })
        }
      </div>
    );
  }
});

module.exports = StepList;