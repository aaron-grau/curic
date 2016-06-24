"use strict";

const FilterParamsStore = require('../stores/filter_params_store');

const ApiUtil = {
  fetchAllBenches(filters, success){
    $.get('api/benches', filters, success);
  },
  createBench(data, success){
    $.post('api/benches', { bench: data }, success);
  },
  createReview(review, success) {
    $.post('api/reviews', { review }, success);
  }
};

module.exports = ApiUtil;
