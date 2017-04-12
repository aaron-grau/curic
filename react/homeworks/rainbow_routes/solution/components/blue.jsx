import React from 'react';
import { Route } from 'react-router';
import Indigo from './indigo';


class Blue extends React.Component {
  constructor() {
    super();
    this.resetBlue = this.resetBlue.bind(this);
    this.addIndigo = this.addIndigo.bind(this);
  }

  resetBlue() {
    this.props.history.push('/blue');
  }

  addIndigo() {
    this.props.history.push('/blue/indigo');
  }

  render() {
    return(
      <div>
        <h2 className="blue"></h2>
        <h4 onClick={this.resetBlue}>Blue only</h4>
        <h4 onClick={this.addIndigo}>Add indigo</h4>

        <Route path="/blue/indigo" component={Indigo} />
      </div>
    );
  }
};

export default Blue;
