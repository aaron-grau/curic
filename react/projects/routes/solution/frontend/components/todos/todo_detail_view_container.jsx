import { connect } from 'react-redux';
import TodoDetailView from './todo_detail_view';

import { destroyTodo } from '../../actions/todos_actions';
import { requestSteps } from '../../actions/steps_actions';

import { selectTodo } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
  return ({
    todo: selectTodo(state, ownProps.params.todoId)
  });
};

const mapDispatchToProps = (dispatch) => ({
  requestSteps: todoId => dispatch(requestSteps(todoId)),
  destroyTodo: id => dispatch(destroyTodo(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoDetailView);
