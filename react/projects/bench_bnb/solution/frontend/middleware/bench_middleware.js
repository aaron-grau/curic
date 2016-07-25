import { fetchBenches as apifetchBenches,
         fetchBench,
         createReview,
         createBench
       } from '../util/bench_api_util';
import { fetchBenches as actionfetchBenches } from '../actions/bench_actions';
import { FETCH_BENCHES,
         FETCH_BENCH,
         CREATE_BENCH,
         CREATE_REVIEW
       } from '../constants/bench_constants';
import { UPDATE_FILTER } from '../constants/filter_constants';


export default ({getState, dispatch}) => next => action => {
  switch(action.type){
    case FETCH_BENCHES:
      const filters = getState().filters
      apifetchBenches(filters, dispatch)
      break;
    case FETCH_BENCH:
      fetchBench(action.id, dispatch);
      break;
    case UPDATE_FILTER:
      next(action);
      dispatch(actionfetchBenches());
      break;
    case CREATE_BENCH:
      createBench(action.bench, dispatch);
      break;
    case CREATE_REVIEW:
      createReview(action.review, dispatch)
      break;
    default:
      next(action)
  }
};
