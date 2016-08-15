import { FilterConstants } from '../actions/filter_actions';
import merge from 'lodash/merge';

const _defaultBounds = Object.freeze({ 
	bounds:{}, 
	minSeating: 1, 
	maxSeating: 10 
});

const FiltersReducer = function(state = _defaultBounds, action){
  if (action.type == FilterConstants.UPDATE_FILTER){
    const newFilter = {[action.filter]: action.value};
    return merge(state, newFilter);
  } else {
    return state;
  }
};

export default FiltersReducer;
