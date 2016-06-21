const React = require('react');
const ReactDOM = require('react-dom');
const Organ = require('./components/organ');
const $ = require('jquery');

$(function () {
  const root = document.getElementById('root');
  ReactDOM.render(<Organ/>, root);
});
