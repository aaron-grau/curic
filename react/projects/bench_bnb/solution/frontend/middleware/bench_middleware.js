// actions
import { UPDATE_FILTER } from '../actions/filter_actions';
import { requestBenches,
         receiveBench,
         receiveBenches,
         REQUEST_BENCHES,
         REQUEST_BENCH,
         CREATE_BENCH,
         CREATE_REVIEW } from '../actions/bench_actions';

 // api utils
 import { fetchBenches,
          fetchBench,
          createReview,
          createBench } from '../util/bench_api_util';
          
export default ({ getState, dispatch }) => next => action => {
  const benchesSuccess = data => dispatch(receiveBenches(data));
  const benchSuccess = data => dispatch(receiveBench(data));

  switch(action.type){
    case REQUEST_BENCHES:
      const filters = getState().filters;
      fetchBenches(filters, benchesSuccess);
      return next(action);
    case REQUEST_BENCH:
      fetchBench(action.id, benchSuccess);
      return next(action);
    case UPDATE_FILTER:
      dispatch(requestBenches());
      return next(action);
    case CREATE_BENCH:
      createBench(action.bench, benchSuccess);
      return next(action);
    case CREATE_REVIEW:
      createReview(action.review, benchSuccess);
      return next(action);
    default:
      return next(action);
  }
};
