import React from 'react';
import { Link } from 'react-router';
import Greeting from './greeting/greeting_container';

const App = (props) => (
  <div>
    <header>
      <Link to="/" className="header-link"><h1>Bench BnB</h1></Link>
      <Greeting />
    </header>
    {props.children}
  </div>
);

export default App;
