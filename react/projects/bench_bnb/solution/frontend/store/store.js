import { createStore, combineReducers, applyMiddleware } from 'redux';
// Reducers
import BenchReducer from '../reducers/bench_reducer';
import FilterReducer from '../reducers/filter_reducer';
import SessionReducer from '../reducers/session_reducer';
//Middleware
import BenchMiddleware from '../middleware/bench_middleware';
import SessionMiddleware from '../middleware/session_middleware';

const masterReducer = combineReducers({
  benches: BenchReducer,
  filters: FilterReducer,
  session: SessionReducer
});

const middlewareChain = applyMiddleware(
  BenchMiddleware,
  SessionMiddleware
);

const Store = createStore(
  masterReducer,
  middlewareChain
);

window.Store = Store;

export default Store;
