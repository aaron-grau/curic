import React from 'react';
// Components
import StepListContainer from '../step_list/step_list_container';

class TodoDetailView extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    this.props.requestSteps(this.props.todo);
  }

  render() {
    return(
      <div>
        <p className="todo-body">{this.props.todo.body}</p>
        <StepListContainer todo_id={this.props.todo.id} />        
        <button
          className="btn btn-danger delete-todo"
          onClick={this.props.destroyTodo.bind(null, this.props.todo)}>Delete</button>
      </div>
    );
  }
};

export default TodoDetailView;
