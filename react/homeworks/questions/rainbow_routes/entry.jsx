import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Red from './components/red';
import Orange from './components/orange';
import Yellow from './components/yellow';
import Green from './components/green';
import Blue from './components/blue';
import Indigo from './components/indigo';
import Violet from './components/violet';


const Rainbow = React.createClass({
  render() {
    return(
      <div>
        <h1>Rainbow Router!</h1>

        <h4 onClick={this.addRed}>Red</h4>
        <h4 onClick={this.addGreen}>Green</h4>
        <h4 onClick={this.addBlue}>Blue</h4>
        <h4 onClick={this.addViolet}>Violet</h4>

        <div id="rainbow">
          {this.props.children}
        </div>
      </div>
    );
  },

  addRed() {
    // your code here
  },

  addGreen() {
    // your code here
  },

  addBlue() {
    // your code here
  },

  addViolet() {
    // your code here
  }
});

const routes = (
  <Route path="/" component={Rainbow}>
    // your code here
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <Router history={hashHistory}>{routes}</Router>,
    document.getElementById('main')
  );
});
