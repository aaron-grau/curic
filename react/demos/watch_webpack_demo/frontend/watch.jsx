"use strict";

const React = require('react');
const Buttons = require('./buttons');
const Splits = require('./splits');
const Display = require('./display');

const Watch = React.createClass({
  getInitialState() {
    return {elapsed: 0, running: false, splits: []};
  },
  tick() {
    if (this.state.running){
      this.setState({elapsed: this.state.elapsed + 1});
    }
  },
  button1Pressed() {
    if (this.state.running){
      let splits = this.state.splits;
      splits.push(this.state.elapsed);
      this.setState({splits: splits});
    } else {
      this.setState({running: true});
    }
  },
  button2Pressed() {
    if (this.state.running){
      this.setState({running: false});
    } else {
      this.setState({elapsed: 0, splits: []});
    }
  },
  componentDidMount() {
    setInterval(this.tick, 1000);
  },
  render() {
    return (
      <div>
        <Display elapsed={this.state.elapsed}/>
        <Buttons
          running={this.state.running}
          button1Callback={this.button1Pressed}
          button2Callback={this.button2Pressed}
        />
      <Splits splits={this.state.splits}/>
      </div>
    );
  }
});

module.exports = Watch;
