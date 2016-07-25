import { RECEIVE_BENCHES,
         RECEIVE_BENCH,
         FETCH_BENCHES,
         CREATE_BENCH,
         CREATE_REVIEW
       } from '../constants/bench_constants';

export const fetchBenches = () => ({
  type: FETCH_BENCHES
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
