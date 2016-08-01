import { RECEIVE_TODOS,
         RECEIVE_TODO,
         REMOVE_TODO
       } from '../actions/todo_actions';

const defaultState = {
    "1": {
      id: 1,
      title: "wash car",
      body: "with soap",
      done: false
    }
};

const TodoReducer = function(oldState = {}, action){
  switch(action.type){
    case RECEIVE_TODOS:
      let newState = {};
      action.todos.forEach(todo => newState[todo.id] = todo);
      return newState;
    case RECEIVE_TODO:
      const newTodo = {[action.todo.id]: action.todo};
      return Object.assign({}, oldState, newTodo);
    case REMOVE_TODO:
      newState = Object.assign({}, oldState);
      delete newState[action.todo.id];
      return newState;
    default:
      return oldState;
  }
};

export default TodoReducer;

// State Shape
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