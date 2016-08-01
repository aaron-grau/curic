import { connect } from 'react-redux';
import TodoListItem from './todo_list_item';
// Actions
import { toggleTodo, destroyTodo } from '../../actions/todo_actions';

const mapDispatchToProps = dispatch => ({
  handleDestroy: () => dispatch(destroyTodo()),
  toggleTodo: (todo) => dispatch(toggleTodo(todo))
});

export default connect(
  null, // important props are already passed in
  mapDispatchToProps
)(TodoListItem);
