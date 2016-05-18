var React = require('react'),
    ReactDOM = require('react-dom'),
    Watch = require('./watch');

document.addEventListener("DOMContentLoaded", function(){
  ReactDOM.render(<Watch/>, document.getElementById('root'));
});
