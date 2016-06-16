const React = require('react');
const ClickCounter = require('./components/clickCounter.jsx');
const ReactDOM = require('react-dom');

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    React.createElement(ClickCounter, {}),
    document.getElementById('root')
  );
}, false);
