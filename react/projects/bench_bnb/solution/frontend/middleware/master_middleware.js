import { applyMiddleware } from 'redux';

import BenchMiddleware from '../middleware/bench_middleware';
import SessionMiddleware from '../middleware/session_middleware';

const masterMiddleware = applyMiddleware(
  BenchMiddleware,
  SessionMiddleware
);

export default masterMiddleware;
