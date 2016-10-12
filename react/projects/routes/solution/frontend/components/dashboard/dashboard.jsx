import React from 'react';
import TodoListContainer from '../todos/todo_list_container';

const Dashboard = ({ children }) => {
  // debugger
  return (
    <div className='dashboard'>
      <h1>dashboard</h1>
      <main>
        <section>
          <TodoListContainer />
        </section>
        <section>
          {children}
        </section>
      </main>
    </div>
  );
}
export default Dashboard;
