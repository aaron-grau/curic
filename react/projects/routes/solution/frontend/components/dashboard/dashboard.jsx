import React from 'react';
import TodoListContainer from '../todos/todo_list_container';

const Dashboard = ({ children }) => {
  // debugger
  return (
    <div className='dashboard'>
      <h1>dashboard</h1>
      <TodoListContainer />
    </div>
  );
}
export default Dashboard;
