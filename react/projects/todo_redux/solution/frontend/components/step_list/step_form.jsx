import React from 'react';

class StepForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      done: false,
      todo_id: this.props.todo_id
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(property) {
    return e => this.setState({[property]: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    const step = Object.assign({}, this.state);
    this.props.createStep(step);
    this.setState({ title: "" });
  }

  render() {
    return (
      <form className="step-form" onSubmit={this.handleSubmit}>
        <label>Title:
          <input
            className="input"
            ref="title"
            value={this.state.title}
            placeholder="walk to store"
            onChange={this.update('title')}/>
        </label>
        <button className="button">Create Step!</button>
      </form>
    );
  }
};

export default StepForm;
