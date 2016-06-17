"use strict";

const React = require('react');
const	ReactDOM = require('react-dom');
const Watch = require('./watch');

document.addEventListener("DOMContentLoaded", function(){
  ReactDOM.render(<Watch/>, document.getElementById('root'));
});
