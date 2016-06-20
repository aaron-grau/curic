const React = require('react');
import { hashHistory } from 'react-router';

module.exports = React.createClass({
  render() {
    return(
      <div>
        <h2 className="blue">BLUE</h2>
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
    hashHistory.push('/indigo');
  }
});
