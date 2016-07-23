'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

const AutoComplete = require('./components/auto.jsx');
const Clock = require('./components/clock.jsx');
const Weather = require('./components/weather.jsx');
const Tabs = require('./components/tabs.jsx');

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

const MyComponent = React.createClass({
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
});

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(<MyComponent />, document.getElementById('main'));
});
