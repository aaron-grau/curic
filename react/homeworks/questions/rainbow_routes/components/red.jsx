import { Component } from 'react';
import { hashHistory } from 'react-router';

class Red extends Component {
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
  }

  resetRed() {
    // your code here
  }

  addOrange() {
    // your code here
  }

  addYellow() {
    // your code here
  }
};

export default Red;
