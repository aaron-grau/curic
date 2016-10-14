import React from 'react';

class StepForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      done: false,
      todoId: this.props.params.todoId
    };
  }

  update(property) {
    return e => this.setState({
      [property]: e.target.value
    });
  }

  handleSubmit() {
    return (e) => {
      e.preventDefault();
      this.props.createStep(this.state);
      this.setState({title: ""}); // reset form
    }
  }

  render() {
    return (
      <form className="step-form" onSubmit={this.handleSubmit()}>
        <label>Title:
          <input
            className="input"
            ref="title"
            value={this.state.title}
            onChange={this.update('title')}/>
        </label>
        <button className="create-button">Create Step!</button>
      </form>
    );
  }
};

export default StepForm;
