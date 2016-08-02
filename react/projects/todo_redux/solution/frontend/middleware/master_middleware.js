import { applyMiddleware } from 'redux';

import TodoMiddleware from './todo_middleware';
import StepMiddleware from './step_middleware';

const masterMiddleware = applyMiddleware(
  TodoMiddleware,
  StepMiddleware
);

export default masterMiddleware;