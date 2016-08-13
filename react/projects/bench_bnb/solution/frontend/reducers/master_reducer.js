import { combineReducers } from 'redux';

import BenchesReducer from '../reducers/benches_reducer';
import FiltersReducer from '../reducers/filters_reducer';
import SessionReducer from '../reducers/session_reducer';

const MasterReducer = combineReducers({
  benches: BenchesReducer,
  filters: FiltersReducer,
  session: SessionReducer
});

export default MasterReducer;
