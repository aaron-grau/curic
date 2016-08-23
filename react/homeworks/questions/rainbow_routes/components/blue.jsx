import { Component } from 'react';
import { hashHistory } from 'react-router';

class Blue extends Component {
  render() {
    return(
      <div>
        <h2 className="blue"></h2>
        <h4 onClick={this.resetBlue}>Blue only</h4>
        <h4 onClick={this.addIndigo}>Add indigo</h4>

        {this.props.children}
      </div>
    );
  }

  resetBlue() {
    // your code here
  }

  addIndigo() {
    // your code here
  }
};

export default Blue;
