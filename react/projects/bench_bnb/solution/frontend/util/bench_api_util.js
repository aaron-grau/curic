
import { receiveBenches, receiveBench } from '../actions/bench_actions';

export const fetchBenches = function(filters, success){
  $.ajax({
    method: 'GET',
    url: 'api/benches',
    data: filters,
    success
  });
};

export const fetchBench = function(id, success){
  $.ajax({
    method: 'GET',
    url: `api/benches/${id}`,
    success
  });
};

export const createReview = function(review, success){
  $.ajax({
    method: 'POST',
    url: 'api/reviews',
    data: review,
    success
  });
};

export const createBench = function(bench, success){
  $.ajax({
    method: 'POST',
    url: 'api/benches',
    data: bench,
    success
  });
};
