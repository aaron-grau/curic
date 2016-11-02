import * as util from '../util/step_api_util';

export const RECEIVE_STEPS = "RECEIVE_STEPS";
export const RECEIVE_STEP = "RECEIVE_STEP";
export const REMOVE_STEP = "REMOVE_STEP";

// async actions
export const requestSteps = todo_id => ({
  type: REQUEST_STEPS,
  todo_id
});

export function requestSteps(todoId) {
  return (dispatch) => {
    return util.fetchSteps(todoId).then(steps => dispatch(receiveSteps(steps)));
  };
}

export function createStep(todoId, step) {
  return (dispatch) => {
    return util.createStep(todoId, step)
      .then(step => dispatch(receiveStep(step)));
  };
}

export function updateStep(step) {
  return (dispatch) => {
    return util.updateStep(step)
      .then(step => dispatch(receiveStep(step)));
  };
}

export function destroyStep(step) {
  return (dispatch) => {
    return util.destroyStep(step)
      .then(step => dispatch(removeStep(step)));
  };
}

// sync actions
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
