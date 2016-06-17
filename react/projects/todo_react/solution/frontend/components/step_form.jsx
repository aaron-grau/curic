var React = require('react');
var StepStore = require('../stores/step_store');

var StepForm = React.createClass({
  getInitialState: function () {
    return {title: ""};
  },
  handleChange: function (e) {
    this.setState({title: e.target.value});
  },
  submitForm: function(e) {
    e.preventDefault();
    var data = {
      todo_id: this.props.todo_id,
      title: this.state.title
    };
    StepStore.create(data, this.props.todo_id);

    this.setState({title: ""});
  },
  render: function() {
    return(
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