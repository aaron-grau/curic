export const fetchSteps = (todo_id) => {
  return $.ajax({
    method: 'GET',
    url: `api/todos/${todo_id}/steps`
  });
};

export const createStep = (todo_id, step) => {
  return $.ajax({
    method: 'POST',
    url: `api/todos/${todo_id}/steps`,
    data: { step }
  });
};

export const updateStep = (step) => {
  return $.ajax({
    method: 'PATCH',
    url: `api/steps/${step.id}`,
    data: { step }
  });
};

export const destroyStep = (step) => {
  return $.ajax({
    method: 'DELETE',
    url: `api/steps/${step.id}`
  });
};
