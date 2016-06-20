const React = require('react');
import { hashHistory } from 'react-router';

module.exports = React.createClass({
  render() {
    return(
      <div>
        <h2 className="red">RED</h2>
        <h4 onClick={this.resetRed}>Red only</h4>
        <h4 onClick={this.addOrange}>Add orange</h4>
        <h4 onClick={this.addYellow}>Add yellow</h4>

        {this.props.children}
      </div>
    );
  }

  // your add color functions here
});
