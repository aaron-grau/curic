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
    alert("Clicking here doesn't do anything yet. Maybe you can change that!")
  }

  addIndigo() {
    alert("Clicking here doesn't do anything yet. Maybe you can change that!")
  }

  render() {
    return(
      <div>
        <h2 className="blue"></h2>
        <h4 onClick={this.resetBlue}>Blue only</h4>
        <h4 onClick={this.addIndigo}>Add indigo</h4>

        {/* add <Route> tags here */}

      </div>
    );
  }
};

export default Blue;
