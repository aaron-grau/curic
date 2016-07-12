'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

const AutoComplete = require('./auto.jsx');
const Clock = require('./clock.jsx');
const Weather = require('./weather.jsx');
const Tabs = require('./tabs.jsx');

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
        <AutoComplete names={Names} />
        <Clock />
        <Weather />
        <Tabs panes={Panes} />
      </div>
    );
  }
});

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(<MyComponent />, document.getElementById('main'));
});
