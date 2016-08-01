// import { BenchConstants } from '../actions/bench_actions';
//
// const BenchReducer = function(oldState = {}, action){
//   switch(action.type){
//     case BenchConstants.RECEIVE_BENCHES:
//       return action.benches;
//     case BenchConstants.RECEIVE_BENCH:
//       const newBench = {[action.bench.id]: action.bench};
//       return Object.assign({}, oldState, newBench);
//     default:
//       return oldState;
//   }
// };
//
// export default Bench


import { PianoConstants } from '../actions/key_actions';

const keys = (state = [], action) => {
  switch(action.type) {
    case PianoConstants.GROUP_UPDATE:
      return [
        ...action.keys
      ];
    case PianoConstants.KEY_PRESSED:
      return [
        ...state,
        action.key
      ];
    case PianoConstants.KEY_RELEASED:
      const idx = state.indexOf(action.key);
      return [
        ...state.slice(0, idx),
        ...state.slice(idx + 1)
      ];
    default:
      return state;
  }
};

export const keys;
