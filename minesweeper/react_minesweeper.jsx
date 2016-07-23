"use strict";

const Game = require('./components/game');
const React = require('react');
const ReactDOM = require('react-dom');

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(
	  <Game />,
	  document.getElementById('main')
  );
});
