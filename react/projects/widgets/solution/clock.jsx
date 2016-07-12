'use strict';

const React = require('react');

const Clock = React.createClass({
  getInitialState() {
    return {time: new Date()};
  },

  componentDidMount() {
    this.intervalId = setInterval(this.tick, 1000);
  },

  tick() {
    this.setState({time: new Date()});
  },

  render() {
    return (
      <div className='clock'>
        <p>Time: {this.state.time.toTimeString()}</p>
        <p>Date: {this.state.time.toDateString()}</p>
      </div>
    );
  }
});



module.exports = Clock;
