import React from 'react';
import NavBarContainer from './nav_bar/nav_bar_container';

// import TodoListContainer from './todo_list/todo_list_container';

const App = ({ children }) => (
  <div className='app'>
    <NavBarContainer />
    {children}
  </div>
);

export default App;
