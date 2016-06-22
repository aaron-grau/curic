const React = require('react');
const ReactRouter = require('react-router');
const hashHistory = ReactRouter.hashHistory;

module.exports = React.createClass({
  render() {
    return(
      <div>
        <h2 className="blue"></h2>
        <h4 onClick={this.resetBlue}>Blue only</h4>
        <h4 onClick={this.addIndigo}>Add indigo</h4>

        {this.props.children}
      </div>
    );
  },

  resetBlue() {
    hashHistory.push('/blue');
  },

  addIndigo() {
    hashHistory.push('/blue/indigo');
  }
});
