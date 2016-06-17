"use strict";

const React = require("react");
const ClickActions = require("../actions/click_actions.js");
const ClickStore = require("../stores/click_store.js");

const ClickCounter = React.createClass({
  getInitialState() {
    return {count: ClickStore.count()};
  },
  _countChanged() {
    this.setState({count: ClickStore.count()});
  },
  componentDidMount() {
    ClickStore.addListener(this._countChanged);
  },
  click(e) {
    e.preventDefault();
    ClickActions.increment();
  },
  render() {
    return (
      <div>
        <button onClick={this.click}>CLICK ME</button>
        <span>{this.state.count}</span>
      </div>
    );
  }
});

module.exports = ClickCounter;
