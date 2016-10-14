export const fetchSteps = (todoId, success) => {
  $.ajax({
    method: 'GET',
    url: `api/todos/${todoId}/steps`,
    success
  });
};

export const createStep = (todoId, step, success) => {
  $.ajax({
    method: 'POST',
    url: `api/todos/${todoId}/steps`,
    data: { step },
    success
  });
};

export const updateStep = (step, success) => {
  $.ajax({
    method: 'PATCH',
    url: `api/steps/${step.id}`,
    data: { step },
    success
  });
};

export const destroyStep = (todoId, step, success) => {
  $.ajax({
    method: 'DELETE',
    url: `api/todos/${todoId}/steps/${step.id}`,
    success: success.bind(null, step)
  });
};
