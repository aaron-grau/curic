"use strict";

const React = require('react');

const Buttons = React.createClass({
  render() {
    let btn1Text, btn2Text;
    if (this.props.running){
        btn1Text = "split";
        btn2Text = "stop";
    } else {
        btn1Text = "start";
        btn2Text = "reset";
    }
    return(
      <div>
        <button onClick={this.props.button1Callback}>{btn1Text}</button>
        <button onClick={this.props.button2Callback}>{btn2Text}</button>
      </div>
    );
  }
});

module.exports = Buttons;
