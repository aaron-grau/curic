var React = require('react');
var ReactDOM = require('react-dom');

var AutoComplete = require('./auto.jsx');
var Clock = require('./clock.jsx').Clock;
var Weather = require('./clock.jsx').Weather;
var Tabs = require('./tabs.jsx');

var names = [
  'Abba',
  'Barney',
  'Barbara',
  'Jeff',
  'Jenny',
  'Sarah',
  'Sally',
  'Xander'
];

var panes = [
  {title: 'one', content: 'I am the first'},
  {title: 'two', content: 'Second pane here'},
  {title: 'three', content: 'Third pane here'}
];

var MyComponent = React.createClass({
  render: function () {
    return(
      <div>
        <AutoComplete names={names} />
        <Clock />
        <Weather />
        <Tabs panes={panes} />
      </div>
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<MyComponent />, document.getElementById('main'));
});
