// Step API Util
import { fetchSteps,
         fetchStep,
         createStep,
         updateStep
       } from '../util/step_api_util';
// Step Action
import { requestSteps,
         receiveStep,
         receiveSteps,
// Step Constants
         REQUEST_STEPS,
         REQUEST_STEP,
         CREATE_STEP,
         UPDATE_STEP
       } from '../actions/step_actions';

export default ({getState, dispatch}) => next => action => {
  const stepsSuccess = data => dispatch(receiveSteps(data));
  const stepSuccess = data => dispatch(receiveStep(data));
  switch(action.type){
    case REQUEST_STEPS:
      fetchSteps(stepsSuccess);
      break;
    case REQUEST_STEP:
      fetchStep(action.id, stepSuccess);
      break;
    case CREATE_STEP:
      createStep(action.step, stepSuccess);
      break;
    case UPDATE_STEP:
      updateStep(action.step, stepSuccess)
      break;
    default:
      next(action)
  }
};