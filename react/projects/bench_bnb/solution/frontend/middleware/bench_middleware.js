// Bench API Util
import { fetchBenches,
         fetchBench,
         createReview,
         createBench
       } from '../util/bench_api_util';
// Bench Action
import { requestBenches,
         receiveBench,
         receiveBenches,
         BenchConstants
       } from '../actions/bench_actions';
// Filter Constants
import { FilterConstants } from '../actions/filter_actions';


export default ({getState, dispatch}) => next => action => {
  const benchesSuccess = data => dispatch(receiveBenches(data));
  const benchSuccess = data => dispatch(receiveBench(data));
  switch(action.type){
    case BenchConstants.REQUEST_BENCHES:
      const filters = getState().filters
      fetchBenches(filters, benchesSuccess);
      break;
    case BenchConstants.REQUEST_BENCH:
      fetchBench(action.id, benchSuccess);
      break;
    case FilterConstants.UPDATE_FILTER:
      next(action);
      dispatch(requestBenches());
      break;
    case BenchConstants.CREATE_BENCH:
      createBench(action.bench, benchSuccess);
      break;
    case BenchConstants.CREATE_REVIEW:
      createReview(action.review, benchSuccess)
      break;
    default:
      next(action)
  }
};
