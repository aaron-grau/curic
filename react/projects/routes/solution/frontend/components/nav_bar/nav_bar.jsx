import React from 'react';
import { hashHistory } from 'react-router';

const NavBar = ({ buttonValue, nextRoute, processClick }) => {
  const handleClick = e => {
    e.preventDefault();
    processClick();
    hashHistory.push(nextRoute);
  };

  return (
    <header className='nav-bar'>
      <div className='logo'/>
      <h1>nav bar</h1>
      <button type="button" onClick={handleClick}>{buttonValue}</button>
    </header>
  );
};

export default NavBar;
