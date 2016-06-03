import FilterParamsStore from '../stores/filter_params';

var ApiUtil = {
  fetchAllBenches(filters, success){
    $.get('api/benches', filters, success); //TODO this work?
  },
  createBench(data, success){
    $.post('api/benches', { bench: data }, success);
  },
  createReview(review, success) {
    $.post('api/reviews', { review }, success);
  }
};

export default ApiUtil;
