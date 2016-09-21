export const REQUEST_STEPS = "REQUEST_STEPS";
export const RECEIVE_STEPS = "RECEIVE_STEPS";
export const RECEIVE_STEP = "RECEIVE_STEP";
export const REMOVE_STEP = "REMOVE_STEP";
export const CREATE_STEP = "CREATE_STEP";
export const UPDATE_STEP = "UPDATE_STEP";
export const DESTROY_STEP = "DESTROY_STEP";

export const requestSteps = todo_id => ({
  type: REQUEST_STEPS,
  todo_id
});

export const receiveSteps = steps => ({
  type: RECEIVE_STEPS,
  steps
});

export const receiveStep = step => ({
  type: RECEIVE_STEP,
  step
});

export const removeStep = step => ({
  type: REMOVE_STEP,
  step
});

export const createStep = step => ({
  type: CREATE_STEP,
  todo_id: step.todo_id,
  step
});

export const updateStep = step => ({
  type: UPDATE_STEP,
  step
});

export const destroyStep = step => ({
  type: DESTROY_STEP,
  todo_id: step.todo_id,
  step
});
