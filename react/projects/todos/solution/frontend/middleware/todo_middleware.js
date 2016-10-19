// Todo API Utils
import { fetchTodos,
         fetchTodo,
         createTodo,
         updateTodo,
         destroyTodo } from '../util/todo_api_util';

// TOdo Action Creatoes and Type Constants
import { requestTodos,
         receiveTodo,
         receiveTodos,
         removeTodo,
         todoError,
         REQUEST_TODOS,
         REQUEST_TODO,
         CREATE_TODO,
         UPDATE_TODO,
         DESTROY_TODO } from '../actions/todo_actions';

export default ({ getState, dispatch }) => next => action => {
  const todosSuccess = data => dispatch(receiveTodos(data));
  const todoSuccess = data => dispatch(receiveTodo(data));
  const todoRemoved = data => dispatch(removeTodo(data));
  const todoErrored = data => dispatch(todoError(data.responseJSON));

  switch(action.type) {
    case REQUEST_TODOS:
      fetchTodos(todosSuccess);
      return next(action);
    case REQUEST_TODO:
      fetchTodo(action.id, todoSuccess);
      return next(action);
    case CREATE_TODO:
      createTodo(action.todo, todoSuccess, todoErrored);
      return next(action);
    case UPDATE_TODO:
      updateTodo(action.todo, todoSuccess);
      return next(action);
    case DESTROY_TODO:
      destroyTodo(action.todo, todoRemoved);
      return next(action);
    default:
      return next(action);
  }
};
