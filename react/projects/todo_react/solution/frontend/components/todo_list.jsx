const React = require('react');
const TodoStore = require('../stores/todo_store.js');
const TodoListItem = require('./todo_list_item.jsx');
const TodoForm = require('./todo_form.jsx');

const TodoList = React.createClass({
  getInitialState: function(){
    return {todos: TodoStore.all()};
  },

  _todosChanged: function(){
    this.setState({todos: TodoStore.all()});
  },

  componentDidMount: function() {
    TodoStore.addChangedHandler(this._todosChanged);
    TodoStore.fetch();
  },

  render: function() {
    const todos = this.state.todos;
    return (
      <div className="Todolist">
        <h1>Todo!</h1>

        <div className="todo-list">
          {
            todos.map(function(todo) {
              return(
                <TodoListItem key={todo.id} todo={todo} />
              );
            })
          }
        </div>
        <TodoForm />
      </div>
    );
  }
});

module.exports = TodoList;
