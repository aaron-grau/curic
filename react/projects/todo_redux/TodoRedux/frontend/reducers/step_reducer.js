export const RECEIVE_STEPS = "RECEIVE_STEPS"
export const RECEIVE_STEP = "RECEIVE_STEP"

const StepReducer = function(oldState = {}, action){
  switch(action.type){
    case RECEIVE_STEPS:
      return action.steps;
    case RECEIVE_STEP:
      const newStep = {[action.step.id]: action.step};
      return Object.assign({}, oldState, newStep);
    default:
      return oldState;
  }
};

export default StepReducer;

// STATE SHAPE NEEDS TO BE UPDATED

// State Shape
  // {
  //   "1": {
  //     id: 1,
  //     title: "wash car",
  //     body: "with soap",
  //     done: false
  //   },
  //   "2": {
  //     id: 2,
  //     title: "wash dog",
  //     body: "with shampoo",
  //     done: true
  //   },
  // };