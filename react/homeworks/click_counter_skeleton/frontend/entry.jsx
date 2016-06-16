"use strict";

const React = require('react');
const ClickCounter = require('./components/click_counter.jsx');
const ReactDOM = require('react-dom');

document.addEventListener('DOMContentLoaded', function(){
  ReactDOM.render(
    <ClickCounter/>,
    document.getElementById('root')
  );
}, false);
