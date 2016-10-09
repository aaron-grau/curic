import { applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { hashHistory } from 'react-router';

import BenchMiddleware from '../middleware/bench_middleware';
import SessionMiddleware from '../middleware/session_middleware';

const RootMiddleware = applyMiddleware(
  BenchMiddleware,
  SessionMiddleware,
  routerMiddleware(hashHistory)
);

export default RootMiddleware;
