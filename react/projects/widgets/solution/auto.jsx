'use strict';

const React = require('react');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');


const AutoComplete = React.createClass({
  getInitialState() {
    return {inputVal: ''};
  },

  handleInput(event) {
    this.setState({inputVal: event.currentTarget.value});
  },

  matches() {
    const matches = [];
    if (this.state.inputVal.length === 0) {
      return this.props.names;
    }

    this.props.names.forEach(name => {
      let sub = name.slice(0, this.state.inputVal.length);
      if (sub.toLowerCase() === this.state.inputVal.toLowerCase()) {
        matches.push(name);
      }
    });

    if (matches.length === 0) {
      matches.push('No matches');
    }

    return matches;
  },

  selectName(event) {
    let name = event.currentTarget.innerText;
    this.setState({inputVal: name});
  },

  render() {
    let results = this.matches().map((result, i) => {
      return (
          <li key={i} onClick={this.selectName}>{result}</li>
      );
    });


    return(
      <div>
        <input
          onChange={this.handleInput}
          value={this.state.inputVal} />
        <ul>
          <ReactCSSTransitionGroup
            transitionName='auto'
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
            {results}
          </ReactCSSTransitionGroup>
        </ul>
      </div>
    );
  }
});

module.exports = AutoComplete;
