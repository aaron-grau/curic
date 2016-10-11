import { connect } from 'react-redux';
import TodoDetailView from './todo_detail_view';

import { destroyTodo } from '../../actions/todos_actions';
import { requestSteps } from '../../actions/steps_actions';

const mapDispatchToProps = (dispatch, { todo }) => ({
  requestSteps: () => dispatch(requestSteps(todo.id)),
  destroyTodo: () => dispatch(destroyTodo(todo))
});

export default connect(
  null, // todo props is already passed in
  mapDispatchToProps
)(TodoDetailView);
