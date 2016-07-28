export const BenchConstants = {
  RECEIVE_BENCHES: "RECEIVE_BENCHES",
  RECEIVE_BENCH: "RECEIVE_BENCH",
  REQUEST_BENCHES: "REQUEST_BENCHES",
  REQUEST_BENCH: "REQUEST_BENCH",
  CREATE_BENCH: "CREATE_BENCH",
  CREATE_REVIEW: "CREATE_REVIEW"
};

export const requestBenches = () => ({
  type: BenchConstants.REQUEST_BENCHES
});

export const requestBench = id => ({
  type: BenchConstants.REQUEST_BENCH,
  id
});

export const receiveBenches = benches => ({
  type: BenchConstants.RECEIVE_BENCHES,
  benches
});

export const receiveBench = bench => ({
  type: BenchConstants.RECEIVE_BENCH,
  bench
});

export const createBench = bench => ({
  type: BenchConstants.CREATE_BENCH,
  bench
});

export const createReview = review => ({
  type: BenchConstants.CREATE_REVIEW,
  review
});
