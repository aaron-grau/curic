import { connect } from 'react-redux';
import TodoList from './todo_list';
// Actions
import { requestTodos, createTodo } from '../../actions/todo_actions';
import { allTodos } from '../../reducers/selectors'

const mapStateToProps = (state) => {
  const todos = allTodos(state) || [];
  return {
    todos
  };
};

const mapDispatchToProps = dispatch => ({
  requestTodos: () => dispatch(requestTodos()),
  createTodo: todo => dispatch(createTodo(todo))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);