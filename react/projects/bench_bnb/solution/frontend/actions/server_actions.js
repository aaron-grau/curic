import AppDispatcher from '../dispatcher/dispatcher';
import BenchConstants from '../constants/bench_constants';

var ApiActions = {
  receiveAll: function(benches){
    AppDispatcher.dispatch({
      actionType: BenchConstants.BENCHES_RECEIVED,
      benches: benches
    });
  },
  receiveSingleBench: function(bench){
    AppDispatcher.dispatch({
      actionType: BenchConstants.BENCH_RECEIVED,
      bench: bench
    });
  }
};

module.exports = ApiActions;
