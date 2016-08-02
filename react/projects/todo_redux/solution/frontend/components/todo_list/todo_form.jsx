import React from 'react';

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "", 
      done: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(property) {
    return e => this.setState({[property]: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    const todo = Object.assign({}, this.state);
    this.props.createTodo({todo});
    this.setState({title: "", body: ""});
  }

  render() {
    return (
      <form className="todo-form" onSubmit={this.handleSubmit}>
        <label>Title:
          <input
            className="input"
            ref="title"
            value={this.state.title}
            placeholder="buy milk"
            onChange={this.update('title')}/>
        </label>
        <label>Body: 
          <textarea
            ref="body"
            cols='20'
            value={this.state.body}
            rows='5'
            onChange={this.update('body')}></textarea>
        </label>
        <button className="submit-todo btn btn-primary">Create Todo!</button>
      </form>
    );
  }
};

export default TodoForm;
