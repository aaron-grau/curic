import React from 'react';

import StepListContainer from '../steps/step_list_container';

class TodoDetailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.props.todo);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleDelete(e) {
    this.props.destroyTodo(this.state.id);
    this.props.router.push('/dashboard');
  }

  handleEdit(e) {
    this.props.router.push(`/dashboard/todos/${this.state.id}/edit`)
  }

  componentWillReceiveProps(nextProps) {
    const nextState = Object.assign({}, this.state, nextProps.todo);
    this.setState(nextState);
  }

  render() {
    const { id, title, body } = this.state;
    return(
      <div className='todo-detail-view'>
        <h1>{title}</h1>
        <p className="todo-body">{body}</p>
        <button
          className="done"
          onClick={this.handleDelete}>Delete</button>
        <button
          className="undone"
          onClick={this.handleEdit}>Edit</button>
        <StepListContainer todoId={id}/>
        {this.props.children}
      </div>
    );
  }
};

export default TodoDetailView;
