"use strict";

var React = require('react');
var ReactDOM = require('react-dom');

var ClickCounter = React.createClass({
  getInitialState: function(){
    return {count: 0};
  },
  click: function(event){
    event.preventDefault();
    this.setState({count: this.state.count + 1});
  },
  render: function(){
    return (
      <div>
        <button onClick={this.click}>CLICK ME</button>
        <span>{this.state.count}</span>
      </div>
    );
  } 
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<ClickCounter />, document.getElementById('my-component'));
});