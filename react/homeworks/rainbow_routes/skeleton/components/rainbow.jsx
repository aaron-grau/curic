import React from 'react';
import {
  Route,
  withRouter
} from 'react-router-dom';

import Red from './red';
import Green from './green';
import Blue from './blue';
import Violet from './violet';



class Rainbow extends React.Component {
  constructor() {
    super();
    this.addRed = this.addRed.bind(this);
    this.addGreen = this.addGreen.bind(this);
    this.addBlue = this.addBlue.bind(this);
    this.addViolet = this.addViolet.bind(this);
  }

  addRed() {
    alert("Clicking here doesn't do anything yet. Maybe you can change that!")
  }

  addGreen() {
    alert("Clicking here doesn't do anything yet. Maybe you can change that!")
  }

  addBlue() {
    alert("Clicking here doesn't do anything yet. Maybe you can change that!")
  }

  addViolet() {
    alert("Clicking here doesn't do anything yet. Maybe you can change that!")
  }

  render() {
    return (
      <div>
        <h1>Rainbow Router!</h1>

        <h4 onClick={this.addRed}>Red</h4>
        <h4 onClick={this.addGreen}>Green</h4>
        <h4 onClick={this.addBlue}>Blue</h4>
        <h4 onClick={this.addViolet}>Violet</h4>

        <div id="rainbow">
          {/* add <Route> tags here */}

        </div>
      </div>
    );
  }
};

export default Rainbow;
