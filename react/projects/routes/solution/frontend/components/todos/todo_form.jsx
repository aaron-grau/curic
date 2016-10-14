import React from 'react';

class TodoForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      done: false
    };

    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(property) {
    return e => this.setState({
      [property]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createTodo({
      todo: this.state
    });

    // reset form
    this.setState({
      title: "",
      body: ""
    });
  }

  render() {
    return (
      <form className="todo-form" onSubmit={this.handleSubmit}>
        <h3>todo form</h3>
        <label>
          <h4>title</h4>
          <input
            type='text'
            ref="title"
            value={this.state.title}
            placeholder="buy milk"
            onChange={this.update('title')}
            required />
        </label>
        <label>
          <h4>body</h4>
          <input
            type='text'
            ref="body"
            placeholder="2% or skim"
            value={this.state.body}
            onChange={this.update('body')}
            required />
        </label>
        <input className="submit" type="submit" value="Create Todo!" />
      </form>
    );
  }
};

export default TodoForm;
