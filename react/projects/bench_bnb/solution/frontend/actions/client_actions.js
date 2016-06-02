import ApiUtil from '../util/api_util';

const ClientActions = {
  fetchBenches: ApiUtil.fetchBenches,
  createBench: ApiUtil.createBench,
  createReview: ApiUtil.createReview,
};

export default ClientActions;
