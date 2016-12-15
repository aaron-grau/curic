import { CREATE_REVIEW, RECEIVE_REVIEW } from '../actions/review_actions.js';
import merge from 'lodash/merge';

const ReviewsReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = merge({}, state);

  switch(action.type){
    case RECEIVE_REVIEW:
      const review = action.review;
      newState.benches[review.bench_id].reviews = action.reviews
      return newState;
    default:
      return state;
  }
};

export default ReviewsReducer;

