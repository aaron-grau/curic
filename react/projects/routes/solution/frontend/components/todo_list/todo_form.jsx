import React from 'react';

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      done: false
    };
  }

  update(property) {
    return e => this.setState({[property]: e.target.value});
  }

  handleSubmit(){
    return (e) => {
      e.preventDefault();
      const todo = Object.assign({}, this.state);
      this.props.createTodo({todo});
      this.setState({title: "", body: ""}); // reset form
    }
  }

  render() {
    return (
      <form className="todo-form" onSubmit={this.handleSubmit()}>
        <label>Title:
          <input
            className="input"
            ref="title"
            value={this.state.title}
            placeholder="buy milk"
            onChange={this.update('title')}
            required/>
        </label>
        <label>Body:
          <textarea
            className="input"
            ref="body"
            cols='20'
            value={this.state.body}
            rows='5'
            onChange={this.update('body')}
            required></textarea>
        </label>
        <button className="create-button">Create Todo!</button>
      </form>
    );
  }
};

export default TodoForm;
