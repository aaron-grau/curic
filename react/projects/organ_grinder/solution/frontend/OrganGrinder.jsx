const React = require('react');
const ReactDOM = require('react-dom');
const Organ = require('./components/Organ');
const $ = require('jquery');

require("./util/KeyListener");

$(function () {
  const root = document.getElementById('root');
  ReactDOM.render(<Organ/>, root);
});
