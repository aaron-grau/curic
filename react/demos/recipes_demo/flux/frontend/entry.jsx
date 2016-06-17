const ReactDOM = require('react-dom');
const React = require('react');
const Recipes = require('./components/recipes');

document.addEventListener("DOMContentLoaded", function () {
  let root = document.querySelector('#root');
  ReactDOM.render(<Recipes />, root);
});

