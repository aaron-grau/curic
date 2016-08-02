export const fetchTodos = function(success){
  $.ajax({
    method: 'GET',
    url: 'api/todos',
    success
  });
};

export const fetchTodo = function(id, success){
  $.ajax({
    method: 'GET',
    url: `api/todos/${id}`,
    success
  });
};

export const createTodo = function(todo, success, error){
  $.ajax({
    method: 'POST',
    url: 'api/todos',
    data: todo,
    success,
    error
  });
};

export const updateTodo = function(todo, success){
  $.ajax({
    method: 'PATCH',
    url: `api/todos/${todo.id}`,
    data: {todo},
    success
  });
};

export const destroyTodo = function(todo, success){
  $.ajax({
    method: 'DELETE',
    url: `api/todos/${todo.id}`,
    success
  });
};