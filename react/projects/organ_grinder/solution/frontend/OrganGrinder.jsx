var React = require('react'),
    ReactDOM = require('react-dom'),
    Organ = require('./components/Organ'),
    $ = require('jquery');

require("./util/KeyListener");

$(function () {
  var root = document.getElementById('root');
  ReactDOM.render(<Organ/>, root);
});
