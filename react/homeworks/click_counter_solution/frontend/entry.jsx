var React = require('react'),
    ClickCounter = require('./components/clickCounter.jsx'),
    ReactDOM = require('react-dom');

document.addEventListener('DOMContentLoaded', function(){
  ReactDOM.render(
    React.createElement(ClickCounter, {}),
    document.getElementById('root')
  );
}, false);
