const React = require('react');
const StepListItem = require('./step_list_item');

const StepList = React.createClass({
  componentWillUnmount() {
  },

  render() {
    return (
      <div className="step-list">
        {
          this.props.steps.map( (step) => {
            return (
              <StepListItem key={step.id} step={step} todo_id={this.props.todo_id} />
            );
          })
        }
      </div>
    );
  }
});

module.exports = StepList;
