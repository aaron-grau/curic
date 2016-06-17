const React = require('react');
const StepStore = require('../stores/step_store');
const StepList = require('./step_list');
const StepForm = require('./step_form');

const TodoDetailView = React.createClass({
  getInitialState: function(){
    return { steps: StepStore.all(this.props.todo.id) };
  },

  stepsChanged: function(){
    this.setState({steps: StepStore.all(this.props.todo.id)});
  },

  componentDidMount: function() {
    StepStore.addChangedHandler(this.stepsChanged);
    StepStore.fetch(this.props.todo.id);
  },

  componentWillUnmount: function() {
    StepStore.removeChangedHandler(this.stepsChanged);
  },

  render: function(){
    return (
      <div>
        <p className="todo-body">{this.props.todo.body}</p>
        <StepList todo_id={this.props.todo.id} steps={this.state.steps} />
        <StepForm todo_id={this.props.todo.id}/>
        <button
          className="btn btn-danger delete-todo"
          onClick={this.props.handleDestroy}>Delete</button>
      </div>
    );
  }
});

module.exports = TodoDetailView;
