var ReactDOM = require('react-dom');
var React = require('react');
var Recipes = require('./components/Recipes');

document.addEventListener("DOMContentLoaded", function () {
  var root = document.querySelector('#root');
  ReactDOM.render(<Recipes />, root);
});

