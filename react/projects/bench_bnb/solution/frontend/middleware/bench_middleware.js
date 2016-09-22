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
         REQUEST_BENCHES,
         REQUEST_BENCH,
         CREATE_BENCH,
         CREATE_REVIEW
       } from '../actions/bench_actions';
// Filter Constants
import { UPDATE_FILTER } from '../actions/filter_actions';


export default ({getState, dispatch}) => next => action => {
  const benchesSuccess = data => dispatch(receiveBenches(data));
  const benchSuccess = data => dispatch(receiveBench(data));
  const result = next(action);
  switch(action.type){
    case REQUEST_BENCHES:
      const filters = getState().filters;
      fetchBenches(filters, benchesSuccess);
      break;
    case REQUEST_BENCH:
      fetchBench(action.id, benchSuccess);
      break;
    case UPDATE_FILTER:
      dispatch(requestBenches());
      break;
    case CREATE_BENCH:
      createBench(action.bench, benchSuccess);
      break;
    case CREATE_REVIEW:
      createReview(action.review, benchSuccess);
      break;
    default:
      break;
  }
  return result;
};
