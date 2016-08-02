import React from 'react';
import TodoListContainer from './todo_list/todo_list_container';

const App = (props) => (
  <div className="app">
    <h1>What a cool Todo List!</h1>
    <TodoListContainer />
  </div>
);

export default App;