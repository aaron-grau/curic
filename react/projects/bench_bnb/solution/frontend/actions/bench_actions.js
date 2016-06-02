import AppDispatcher from '../dispatcher/dispatcher';
import BenchConstants from '../constants/bench_constants';
import BenchApiUtil from '../util/bench_api_util';

const ApiActions = {
  fetchBenches(filters) {
    BenchApiUtil.fetchBenches(filters, this.receiveAll);
  },
  createBench(bench){
    BenchApiUtil.createBench(bench, this.receiveSingleBench);
  },
  createReview(review){
    BenchApiUtil.createReview(review, this.receiveSingleBench);
  },

  receiveAll(benches) {
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

export default ApiActions;
