// Todo API Util
import { fetchTodos,
         fetchTodo,
         createTodo,
         updateTodo,
         destroyTodo
       } from '../util/todo_api_util';
// Todo Action
import { requestTodos,
         receiveTodo,
         receiveTodos,
         removeTodo,
// Todo Constants
         REQUEST_TODOS,
         REQUEST_TODO,
         CREATE_TODO,
         UPDATE_TODO,
         DESTROY_TODO
       } from '../actions/todo_actions';

export default ({getState, dispatch}) => next => action => {
  const todosSuccess = data => dispatch(receiveTodos(data));
  const todoSuccess = data => dispatch(receiveTodo(data));
  const todoRemoved = data => dispatch(removeTodo(data));
  switch(action.type){
    case REQUEST_TODOS:
      fetchTodos(todosSuccess);
      break;
    case REQUEST_TODO:
      fetchTodo(action.id, todoSuccess);
      break;
    case CREATE_TODO:
      createTodo(action.todo, todoSuccess);
      break;
    case UPDATE_TODO:
      updateTodo(action.todo, todoSuccess)
      break;
    case DESTROY_TODO:
      destroyTodo(action.todo, todoRemoved);
      break;
    default:
      next(action)
  }
};