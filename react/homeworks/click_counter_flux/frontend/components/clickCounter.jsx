var React = require("react"),
    ClickActions = require("../actions/clickActions.js"),
    ClickStore = require("../stores/clickStore.js");

var ClickCounter = React.createClass({
  getInitialState: function(){
    return {count: ClickStore.count()};
  },
  _countChanged: function(){
    this.setState({count: ClickStore.count()});
  },
  componentDidMount: function () {
    ClickStore.addListener(this._countChanged);
  },
  click: function(e){
    e.preventDefault();
    ClickActions.increment();
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

module.exports = ClickCounter;
