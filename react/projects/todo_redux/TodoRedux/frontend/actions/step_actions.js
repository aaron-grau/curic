export const RECEIVE_STEPS = "RECEIVE_STEPS"
export const RECEIVE_STEP = "RECEIVE_STEP"
export const CREATE_STEP = "CREATE_STEP"
export const UPDATE_STEP = "UPDATE_STEP"
export const DESTROY_STEP = "DESTROY_STEP"

export const requestSteps = () => ({
  type: REQUEST_STEPS
});

export const requestStep = id => ({
  type: REQUEST_STEP,
  id
});

export const receiveSteps = steps => ({
  type: RECEIVE_STEPS,
  steps
});

export const receiveStep = step => ({
  type: RECEIVE_STEP,
  step
});

export const createStep = step => ({
  type: CREATE_STEP,
  step
});

export const updateStep = step => ({
  type: UPDATE_STEP,
  step
});

export const toggleStep = step => ({
  type: UPDATE_STEP,
  step: Object.assign({}, step, { done: !step.done })
});

export const destroyStep = step => ({
  type: DESTROY_STEP,
  step
});