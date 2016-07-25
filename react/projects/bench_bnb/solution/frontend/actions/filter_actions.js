import { UPDATE_FILTER } from '../constants/filter_constants';

export const updateFilter = (filter, value) => ({
  type: UPDATE_FILTER,
  filter,
  value
});
