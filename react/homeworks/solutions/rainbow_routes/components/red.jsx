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
    hashHistory.push('/red');
  }

  addOrange() {
    hashHistory.push('/red/orange');
  }

  addYellow() {
    hashHistory.push('/red/yellow');
  }
};

export default Red;
