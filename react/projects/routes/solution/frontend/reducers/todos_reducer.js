import { RECEIVE_TODOS,
         RECEIVE_TODO,
         REMOVE_TODO,
         TODO_ERROR
       } from '../actions/todo_actions';

const TodosReducer = (state = {}, action) => {
  switch(action.type){
    case RECEIVE_TODOS:
      let newState = {};
      action.todos.forEach(todo => newState[todo.id] = todo);
      return newState;
    case RECEIVE_TODO:
      const newTodo = {[action.todo.id]: action.todo};
      return Object.assign({}, state, newTodo);
    case REMOVE_TODO:
      newState = Object.assign({}, state);
      delete newState[action.todo.id];
      return newState;
    case TODO_ERROR:
      alert(action.error);
    default:
      return state;
  }
};

export default TodosReducer;

// Sample State Shape
// {
//   "1": {
//     id: 1,
//     title: "wash car",
//     body: "with soap",
//     done: false
//   },
//   "2": {
//     id: 2,
//     title: "wash dog",
//     body: "with shampoo",
//     done: true
//   },
// };
