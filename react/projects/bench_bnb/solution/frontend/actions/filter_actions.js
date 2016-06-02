import AppDispatcher from '../dispatcher/dispatcher';
import FilterConstants from '../constants/filter_constants';

const FilterActions = {
  updateBounds(bounds) {
    AppDispatcher.dispatch({
      actionType: FilterConstants.UPDATE_BOUNDS,
      bounds: bounds
    });
  },
  updateMinSeating(value) {
    AppDispatcher.dispatch({
      actionType: FilterConstants.UPDATE_MIN_SEATING,
      minSeating: value,
    });
  },
  updateMaxSeating(value) {
    AppDispatcher.dispatch({
      actionType: FilterConstants.UPDATE_MAX_SEATING,
      maxSeating: value,
    });
  }
};

export default FilterActions;
