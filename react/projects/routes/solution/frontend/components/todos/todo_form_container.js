import { connect } from 'react-redux';
import TodoForm from './todo_form';

import { createTodo } from '../../actions/todos_actions';
// import { allTodos } from '../../reducers/selectors';

// const mapStateToProps = state => ({
//   // todos: allTodos(state)
// });

const mapDispatchToProps = dispatch => ({
  createTodo: todo => dispatch(createTodo(todo)),
});

export default connect(
  null,
  mapDispatchToProps
)(TodoForm);
