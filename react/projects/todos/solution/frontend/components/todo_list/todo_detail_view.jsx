import React from 'react';
// Components
import StepListContainer from '../step_list/step_list_container';

class TodoDetailView extends React.Component {
  componentDidMount() {
    this.props.requestSteps();
  }

  render() {
    const { todo, destroyTodo } = this.props;
    return(
      <div>
        <p className="todo-body">{todo.body}</p>
        <StepListContainer todo_id={todo.id} />        
        <button
          className="delete-button"
          onClick={destroyTodo}>Delete</button>
      </div>
    );
  }
};

export default TodoDetailView;
