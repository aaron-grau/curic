import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, withRouter } from 'react-router';

import Red from './components/red.jsx';
import Orange from './components/orange.jsx';
import Yellow from './components/yellow.jsx';
import Green from './components/green.jsx';
import Blue from './components/blue.jsx';
import Indigo from './components/indigo.jsx';
import Violet from './components/violet.jsx';


class Rainbow extends React.Component {
  constructor() {
    super();
    this.addRed = this.addRed.bind(this);
    this.addGreen = this.addGreen.bind(this);
    this.addBlue = this.addBlue.bind(this);
    this.addViolet = this.addViolet.bind(this);
  }

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
  }

  addRed() {
    // your code here
  }

  addGreen() {
    // your code here
  }

  addBlue() {
    // your code here
  }

  addViolet() {
    // your code here
  }
};

Rainbow = withRouter(Rainbow);

const routes = (
  <Route path="/" component={Rainbow}>
    // your routes here
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <Router history={hashHistory}>{routes}</Router>,
    document.getElementById('main')
  );
});
