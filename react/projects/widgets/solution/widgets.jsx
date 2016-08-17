import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import AutoComplete from './auto.jsx';
import Clock from './clock.jsx';
import Weather from './weather.jsx';
import Tabs from './tabs.jsx';

const Names = [
  'Abba',
  'Barney',
  'Barbara',
  'Jeff',
  'Jenny',
  'Sarah',
  'Sally',
  'Xander'
];

const Panes = [
  {title: 'one', content: 'I am the first'},
  {title: 'two', content: 'Second pane here'},
  {title: 'three', content: 'Third pane here'}
];

class MyComponent extends Component {
  render() {
    return(
      <div>
        <Clock />
        <Weather />
        <div className='interactive'>
          <Tabs panes={Panes} />
          <AutoComplete names={Names} />
        </div>
      </div>
    );
  }
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<MyComponent/>, document.getElementById('main'));
});
