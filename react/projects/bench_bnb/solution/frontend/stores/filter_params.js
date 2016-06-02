import AppDispatcher from '../dispatcher/dispatcher';
import { Store } from 'flux/utils';
import FilterConstants from '../constants/filter_constants';
let _params = { minSeating: 1, maxSeating: 10 };

const FilterParamsStore = new Store(AppDispatcher);

FilterParamsStore.params = function () {
  return Object.assign({}, _params);
};

FilterParamsStore.__onDispatch = function (payload) {
  switch(payload.actionType){
    case FilterConstants.UPDATE_MAX_SEATING:
      _params.maxSeating = payload.maxSeating;
      FilterParamsStore.__emitChange();
      break;
    case FilterConstants.UPDATE_MIN_SEATING:
      _params.minSeating = payload.minSeating;
      FilterParamsStore.__emitChange();
      break;
    case FilterConstants.UPDATE_BOUNDS:
      _params.bounds = payload.bounds;
      FilterParamsStore.__emitChange();
      break;
  }
};

module.exports = FilterParamsStore;
