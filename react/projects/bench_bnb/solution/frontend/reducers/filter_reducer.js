import { FilterConstants } from '../actions/filter_actions';

const _defaultParams = { minSeating: 1, maxSeating: 10 };

const FilterReducer = function(oldState = _defaultParams, action){
  if (action.type == FilterConstants.UPDATE_FILTER){
    const newFilter = {[action.filter]: action.value};
    return Object.assign({}, oldState, newFilter);
  } else {
    return oldState;
  }
};

export default FilterReducer;
