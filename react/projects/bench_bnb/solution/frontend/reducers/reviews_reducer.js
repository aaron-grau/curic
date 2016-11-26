import { RECEIVE_BENCHES, RECEIVE_BENCH } from '../actions/bench_actions';
import merge from 'lodash/merge';

const ReviewsReducer = (state = {}, action) => {
  Object.freeze(state)
  switch(action.type){
    case RECEIVE_BENCHES:
      return action.benches;
    case RECEIVE_BENCH:
      const newBench = {[action.bench.id]: action.bench};
      return merge({}, state, newBench);
    default:
      return state;
  }
};

export default ReviewsReducer;
