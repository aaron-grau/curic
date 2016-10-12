import React from 'react';
import NavBarContainer from './nav_bar/nav_bar_container';



const App = ({ children, location }) => {
  // debugger
  return (
    <div className='app'>
      <NavBarContainer pathname={location.pathname}/>
      {children}
    </div>
  );
}

export default App;
