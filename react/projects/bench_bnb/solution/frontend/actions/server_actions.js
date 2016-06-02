import AppDispatcher from '../dispatcher/dispatcher';
import BenchConstants from '../constants/bench_constants';

const ApiActions = {
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
