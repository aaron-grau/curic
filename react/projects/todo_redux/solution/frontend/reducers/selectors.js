export const allTodos = (state) => {
  return state ? Object.keys(state.todos).map(key => state.todos[key]) : [];
}

export const stepsById = (state, todo_id) => {
  return state.steps[todo_id] ? Object.keys(state.steps[todo_id]).map(key => state.steps[todo_id][key]) : [];
}