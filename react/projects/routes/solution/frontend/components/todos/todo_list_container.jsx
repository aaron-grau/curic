import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { updateTodo } from '../../actions/todos_actions';
import { allTodos } from '../../reducers/selectors';

import TodoList from './todo_list';

const mapStateToProps = state => ({
  todos: allTodos(state)
});

const mapDispatchToProps = dispatch => ({
  toggleTodo: toggledTodo => dispatch(updateTodo(toggledTodo)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList));
