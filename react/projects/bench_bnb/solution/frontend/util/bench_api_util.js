import { receiveBenches, receiveBench } from '../actions/bench_actions';

export const fetchBenches = function(filters, dispatch){
  $.ajax({
    method: 'GET',
    url: 'api/benches',
    data: filters,
    success(benches){
      dispatch(receiveBenches(benches));
    }
  });
};

export const createReview = function(review, dispatch){
  $.ajax({
    method: 'POST',
    url: 'api/reviews',
    data: review,
    success(bench){
      dispatch(receiveBench(bench));
    }
  });
};

export const createBench = function(bench, dispatch){
  $.ajax({
    method: 'POST',
    url: 'api/benches',
    data: bench,
    success(bench){
      dispatch(receiveBench(bench));
    }
  });
};
