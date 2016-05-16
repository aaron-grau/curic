var React = require('react');

var Headers = React.createClass({
  render: function () {
    var selected = this.props.selectedPane;
    var that = this;
    var headers = this.props.panes.map(function (pane, index) {
      var title = pane.title;
      var klass = ""
      if (index === selected) {
        klass = "active"
      }

      return (
        <span
          key={ index }
          className={klass}
          onClick={that.props.onTabChosen.bind(null, index)}>
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

var Tabs = React.createClass({
  getInitialState: function () {
    return {selectedPane: 0};
  },
  selectTab: function (num) {
    this.setState({selectedPane: num});
  },
  render: function () {
    var pane = this.props.panes[this.state.selectedPane];

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
