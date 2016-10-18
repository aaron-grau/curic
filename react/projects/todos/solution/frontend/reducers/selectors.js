export const allTodos = ({ todos }) => Object.keys(todos).map(id => todos[id]);

export const stepsById = ({ steps }, todo_id) => (
  steps[todo_id] ? Object.keys(steps[todo_id]).map(key => steps[todo_id][key]) : []
);
