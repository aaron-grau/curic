"use strict";

const AppDispatcher = require('../dispatcher/dispatcher');
const BenchConstants = require('../constants/bench_constants');
const BenchApiUtil = require('../util/bench_api_util');

const BenchActions = {
  fetchAllBenches(filters) {
    BenchApiUtil.fetchAllBenches(filters, this.receiveAllBenches);
  },
  createBench(bench){
    BenchApiUtil.createBench(bench, this.receiveSingleBench);
  },
  createReview(review){
    BenchApiUtil.createReview(review, this.receiveSingleBench);
  },

  receiveAllBenches(benches) {
    AppDispatcher.dispatch({
      actionType: BenchConstants.BENCHES_RECEIVED,
      benches: benches
    });
  },
  receiveSingleBench(bench) {
    AppDispatcher.dispatch({
      actionType: BenchConstants.BENCH_RECEIVED,
      bench: bench
    });
  }
};

module.exports = BenchActions;
