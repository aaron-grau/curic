import React from 'react';

const TodoDetailView = function({todo, requestSteps, destroyTodo}) {
  return(
    <div>
      <p className="todo-body">{todo.body}</p>
      
      <button
        className="btn btn-danger delete-todo"
        onClick={destroyTodo.bind(null, todo)}>Delete</button>
    </div>
  );
};

export default TodoDetailView;

// implement these next
// <StepList todo_id={todo.id} steps={this.state.steps} />
//       <StepForm todo_id={todo.id}/>