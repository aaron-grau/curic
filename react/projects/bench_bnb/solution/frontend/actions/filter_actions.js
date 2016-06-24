"use strict";

const AppDispatcher = require('../dispatcher/dispatcher');
const FilterConstants = require('../constants/filter_constants');

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

module.exports = FilterActions;
