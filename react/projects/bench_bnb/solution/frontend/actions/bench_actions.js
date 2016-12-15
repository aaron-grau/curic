import * as APIUtil from '../util/bench_api_util'

export const RECEIVE_BENCHES = "RECEIVE_BENCHES";
export const RECEIVE_BENCH = "RECEIVE_BENCH";
export const RECEIVE_REVIEW = "RECEIVE_REVIEW";

export const createReview = review => dispatch => (
  APIUtil.createReview(review)
    .then(review => dispatch(receiveReview(review)))
);

export function fetchBenches(filters) {
  return (dispatch) => {
    return APIUtil.fetchBenches(filters)
      .then(benches => dispatch(receiveBenches(benches)));
  }
}

export function fetchBench(id) {
  return (dispatch) => {
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

