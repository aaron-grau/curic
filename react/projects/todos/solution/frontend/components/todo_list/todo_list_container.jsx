import { connect } from 'react-redux';
import merge from 'lodash/merge';
import TodoList from './todo_list';

// Actions
import { requestTodos, createTodo, updateTodo, destroyTodo } from '../../actions/todo_actions';
import { allTodos } from '../../reducers/selectors';

const mapStateToProps = state => ({
  todos: allTodos(state)
});

const mapDispatchToProps = dispatch => ({
  requestTodos: () => dispatch(requestTodos()),
  createTodo: todo => dispatch(createTodo(todo)),
  toggleTodo: todo => () =>	{
    const toggledTodo = merge({}, todo, {
      done: !todo.done
    });
    dispatch(updateTodo(toggledTodo));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
