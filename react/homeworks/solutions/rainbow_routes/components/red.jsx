const React = require('react');
const ReactRouter = require('react-router');
const hashHistory = ReactRouter.hashHistory;

module.exports = React.createClass({
  render() {
    return(
      <div>
        <h2 className="red"></h2>
        <h4 onClick={this.resetRed}>Red only</h4>
        <h4 onClick={this.addOrange}>Add orange</h4>
        <h4 onClick={this.addYellow}>Add yellow</h4>

        {this.props.children}
      </div>
    );
  },

  resetRed() {
    hashHistory.push('/red');
  },

  addOrange() {
    hashHistory.push('/red/orange');
  },

  addYellow() {
    hashHistory.push('/red/yellow');
  }
});
