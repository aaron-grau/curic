import { UPDATE_FILTER } from '../constants/filter_constants';

const _defaultParams = { minSeating: 1, maxSeating: 10 };

const FilterReducer = function(oldState = _defaultParams, action){
  if (action.type != UPDATE_FILTER){
    return oldState;
  } else {
    const newFilter = {[action.filter]: action.value};
    return Object.assign({}, oldState, newFilter);
  }
};

export default FilterReducer;
