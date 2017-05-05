import React from 'react';
import { Route } from 'react-router-dom';
import Orange from './orange';
import Yellow from './yellow';

class Red extends React.Component {
  constructor() {
    super();
    this.resetRed = this.resetRed.bind(this);
    this.addOrange = this.addOrange.bind(this);
    this.addYellow = this.addYellow.bind(this);
  }

  resetRed() {
    alert("Clicking here doesn't do anything yet. Maybe you can change that!")
  }

  addOrange() {
    alert("Clicking here doesn't do anything yet. Maybe you can change that!")
  }

  addYellow() {
    alert("Clicking here doesn't do anything yet. Maybe you can change that!")
  }

  render() {
    return(
      <div>
        <h2 className="red"></h2>
        <h4 onClick={this.resetRed}>Red only</h4>
        <h4 onClick={this.addOrange}>Add orange</h4>
        <h4 onClick={this.addYellow}>Add yellow</h4>

        {/* add <Route> tags here */}

      </div>
    );
  }
};

export default Red;
