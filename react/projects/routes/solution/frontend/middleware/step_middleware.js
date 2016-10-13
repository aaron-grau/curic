// Step API Util
import { fetchSteps,
         createStep,
         updateStep,
         destroyStep
       } from '../util/step_api_util';
// Step Action Creators
import { requestSteps,
         receiveStep,
         receiveSteps,
         removeStep,
// Step Type Constants
         REQUEST_STEPS,
         CREATE_STEP,
         UPDATE_STEP,
         DESTROY_STEP
       } from '../actions/steps_actions';

import { REQUEST_TODO } from '../actions/todos_actions';

export default ({getState, dispatch}) => next => action => {
  const stepsSuccess = data => {
    debugger
    dispatch(receiveSteps(data))
  };
  const stepSuccess = data => dispatch(receiveStep(data));
  const stepRemoved = data => dispatch(removeStep(data));

  switch(action.type) {
    case REQUEST_STEPS:
      fetchSteps(action.todoId, stepsSuccess);
      return next(action);
    case CREATE_STEP:
      createStep(action.todo_id, action.step, stepSuccess);
      return next(action);
    case UPDATE_STEP:
      updateStep(action.step, stepSuccess)
      return next(action);
    case DESTROY_STEP:
      destroyStep(action.todo_id, action.step, stepRemoved);
      return next(action);
    default:
      next(action);
  }
};
