import { connect } from 'react-redux';
import TodoDetailView from './todo_detail_view';
// Actions
import { destroyTodo } from '../../actions/todo_actions';
import { requestSteps } from '../../actions/step_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    todo: ownProps.todo
  };
};

const mapDispatchToProps = dispatch => ({
  requestSteps: () => dispatch(requestSteps(todo.id)),
  destroyTodo: (todo) => dispatch(destroyTodo(todo))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoDetailView);