export const allTodos = (state) => {
  return state ? Object.keys(state.todos).map(key => state.todos[key]) : []
}