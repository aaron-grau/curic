const React = require('react');
const StepStore = require('../stores/step_store');

const StepForm = React.createClass({
  getInitialState() {
    return {title: ""};
  },
  handleChange(e) {
    this.setState({title: e.target.value});
  },
  submitForm(e) {
    e.preventDefault();
    const data = {
      todo_id: this.props.todo_id,
      title: this.state.title
    };
    StepStore.create(data, this.props.todo_id);

    this.setState({title: ""});
  },
  render() {
    return (
      <form onSubmit={this.submitForm}>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.title}/>
        <input type="submit" className="btn btn-xs btn-primary" value="New Step"></input>
      </form>
    );
  }
});

module.exports = StepForm;
