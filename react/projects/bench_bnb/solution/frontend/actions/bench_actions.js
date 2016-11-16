import * as APIUtil from '../util/bench_api_util'

export const RECEIVE_BENCHES = "RECEIVE_BENCHES";
export const RECEIVE_BENCH = "RECEIVE_BENCH";
export const REQUEST_BENCHES = "REQUEST_BENCHES";
export const REQUEST_BENCH = "REQUEST_BENCH";
export const CREATE_BENCH = "CREATE_BENCH";
export const CREATE_REVIEW = "CREATE_REVIEW";
export const RECEIVE_REVIEW = "RECEIVE_REVIEW";

export function fetchBench(id) {
  return (dispatch) => {
    dispatch(requestBench(id));
    return APIUtil.fetchBench(id)
      .then(bench => dispatch(receiveBench(bench)));
  }
}

export function createBench(bench) {
  return (dispatch) => {
    return APIUtil.createBench(bench)
      .then(bench => dispatch(receiveBench(bench)));
  }
}

export function createReview(review) {
  return (dispatch) => {
    return APIUtil.createReview(review)
      .then(review => dispatch(receiveReview(review)));
  }
}

export const requestBench = id => ({
  type: REQUEST_BENCH,
  id
});

export const receiveBenches = benches => ({
  type: RECEIVE_BENCHES,
  benches
});

export const receiveBench = bench => ({
  type: RECEIVE_BENCH,
  bench
});

export const receiveReview = review => ({
  type: RECEIVE_REVIEW,
  review
});
