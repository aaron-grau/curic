import { RECEIVE_BENCHES,
         RECEIVE_BENCH,
         REQUEST_BENCHES,
         REQUEST_BENCH,
         CREATE_BENCH,
         CREATE_REVIEW
       } from '../constants/bench_constants';

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
