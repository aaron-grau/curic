import ServerActions from '../actions/server_actions';
import FilterParamsStore from '../stores/filter_params';

var ApiUtil = {
  fetchBenches: function(filters){
    $.get('api/benches', filters, function(benches){
      ServerActions.receiveAll(benches);
    });
  },
  createBench: function(data){
    $.post('api/benches', { bench: data }, function(bench) {
      ServerActions.receiveSingleBench(bench);
    });
  },
  createReview: function(data) {
    $.post('api/reviews', { review: data }, function (bench) {
      ServerActions.receiveSingleBench(bench);
    });
  }
};

module.exports = ApiUtil;
