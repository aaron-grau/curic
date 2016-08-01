import { combineReducers } from 'redux';

import keys from './keys';

const pianoApp = combineReducers({
  keys
});

export default pianoApp;


// import { combineReducers } from 'redux';
//
// import BenchReducer from '../reducers/bench_reducer';
// import FilterReducer from '../reducers/filter_reducer';
// import SessionReducer from '../reducers/session_reducer';
//
// const MasterReducer = combineReducers({
//   benches: BenchReducer,
//   filters: FilterReducer,
//   session: SessionReducer
// });
//
// export default MasterReducer;
