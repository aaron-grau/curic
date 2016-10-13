import React from 'react';
import { hashHistory } from 'react-router'
import StepListContainer from '../steps/step_list_container';

class TodoDetailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.params.todoId,
      title: "",
      body: "",
      steps: []
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleDelete(e) {
    this.props.destroyTodo();
    hashHistory.push('/dashboard');
  }

  handleEdit(e) {
    hashHistory.push(`/dashboard/todos/${this.state.id}/edit`)
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  render() {
    const { title, body, steps } = this.state;
    return(
      <div>
        <h1>{title}</h1>
        <p className="todo-body">{body}</p>
        {this.props.children}
        <button
          className="done"
          onClick={this.handleDelete}>Delete</button>
        <button
          className="undone"
          onClick={this.handleEdit}>Edit</button>
      </div>
    );
  }
};

export default TodoDetailView;
