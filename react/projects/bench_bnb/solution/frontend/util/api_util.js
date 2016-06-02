import ServerActions from '../actions/server_actions';
import FilterParamsStore from '../stores/filter_params';

var ApiUtil = {
  fetchBenches(filters){
    $.get('api/benches', filters, ServerActions.receiveAll); //TODO this work?
  },
  createBench(data){
    $.post('api/benches', { bench: data }, ServerActions.receiveSingleBench);
  },
  createReview(data) {
    $.post('api/reviews', { review: data }, ServerActions.receiveSingleBench);
  }
};

export default ApiUtil;
