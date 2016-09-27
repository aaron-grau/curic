export const RECEIVE_BENCHES = "RECEIVE_BENCHES";
export const RECEIVE_BENCH = "RECEIVE_BENCH";
export const REQUEST_BENCHES = "REQUEST_BENCHES";
export const REQUEST_BENCH = "REQUEST_BENCH";
export const CREATE_BENCH = "CREATE_BENCH";
export const CREATE_REVIEW = "CREATE_REVIEW";

export const requestBenches = () => ({
  type: REQUEST_BENCHES
});

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

export const createBench = bench => ({
  type: CREATE_BENCH,
  bench
});

export const createReview = review => ({
  type: CREATE_REVIEW,
  review
});
