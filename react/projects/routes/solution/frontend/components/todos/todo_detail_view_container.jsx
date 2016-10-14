import { connect } from 'react-redux';
import TodoDetailView from './todo_detail_view';

import { destroyTodo } from '../../actions/todos_actions';
import { requestSteps } from '../../actions/steps_actions';

import { withRouter } from 'react-router';

import { selectTodo } from '../../reducers/selectors';

const mapStateToProps = (state, { params }) => {
  return ({
    todo: selectTodo(state, params.todoId)
  });
};

const mapDispatchToProps = (dispatch) => ({
  requestSteps: todoId => dispatch(requestSteps(todoId)),
  destroyTodo: id => dispatch(destroyTodo(id))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoDetailView));
