"use strict";

const React = require('react');

const Headers = React.createClass({
  render() {
    let selected = this.props.selectedPane;
    let headers = this.props.panes.map((pane, index) => {
      let title = pane.title;
      let klass = "";
      if (index === selected) {
        klass = "active";
      }

      return (
        <span
          key={ index }
          className={klass}
          onClick={this.props.onTabChosen.bind(null, index)}>
          {title}{' '}
        </span>
      );
    });
    return (
      <div>
        {headers}
      </div>

    );
 }
});

const Tabs = React.createClass({
  getInitialState() {
    return {selectedPane: 0};
  },
  selectTab(num) {
    this.setState({selectedPane: num});
  },
  render() {
    let pane = this.props.panes[this.state.selectedPane];

    return (
      <div>
        <Headers
          selectedPane={this.state.selectedPane}
          onTabChosen={this.selectTab}
          panes={this.props.panes}>
        </Headers>
        <p>
          {pane.content}
        </p>
      </div>
    );
  }
});

module.exports = Tabs;
