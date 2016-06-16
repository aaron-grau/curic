"use strict";

const React = require('react');
const ClickCounter = require('./components/click_counter.jsx');
const ReactDOM = require('react-dom');

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    React.createElement(ClickCounter, {}),
    document.getElementById('root')
  );
}, false);
