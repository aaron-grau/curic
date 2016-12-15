import * as APIUtil from '../util/bench_api_util'

export const CREATE_REVIEW = "CREATE_REVIEW";
export const RECEIVE_REVIEW = "RECEIVE_REVIEW";

export function createReview(review) {
  return (dispatch) => {
    return APIUtil.createReview(review)
      .then(review => dispatch(receiveReview(review)));
  }
}

export const receiveReview = review => ({
  type: RECEIVE_REVIEW,
  review
});

