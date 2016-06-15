const AppDispatcher = require('../dispatcher/dispatcher');
const Store = require('flux/utils').Store;
const FilterConstants = require('../constants/filter_constants');

let _params = { minSeating: 1, maxSeating: 10 };
const FilterParamsStore = new Store(AppDispatcher);

FilterParamsStore.params = function() {
  return Object.assign({}, _params);
};

function setMaxSeating = function(max){
  _params.maxSeating = max;
  FilterParamsStore.__emitChange();
};

function setMinSeating = function(min){
  _params.minSeating = min;
  FilterParamsStore.__emitChange();
};

function setBounds = function(bounds){
  _params.bounds = bounds;
  FilterParamsStore.__emitChange();
};

FilterParamsStore.__onDispatch = function(payload) {
  switch(payload.actionType){
    case FilterConstants.UPDATE_MAX_SEATING:
      setMaxSeating(payload.maxSeating);
      break;
    case FilterConstants.UPDATE_MIN_SEATING:
      setMinSeating(payload.minSeating);
      break;
    case FilterConstants.UPDATE_BOUNDS:
      setBounds(payload.bounds);
      break;
  }
};

module.exports = FilterParamsStore;
