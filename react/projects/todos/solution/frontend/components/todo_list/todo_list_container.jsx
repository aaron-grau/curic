import { connect } from 'react-redux';
import TodoList from './todo_list';
// Actions
import { requestTodos, createTodo, toggleTodo, destroyTodo } from '../../actions/todo_actions';
import { allTodos } from '../../reducers/selectors';

const mapStateToProps = state => ({todos: allTodos(state)});

const mapDispatchToProps = dispatch => ({
  requestTodos: () => dispatch(requestTodos()),
  createTodo: todo => dispatch(createTodo(todo)),
  toggleTodo: todo => () =>	dispatch(toggleTodo(todo))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);