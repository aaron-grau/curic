"use strict";

const React = require('react');
const ReactDOM = require('react-dom');
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

const Red = require('./red.jsx');
const Orange = require('./orange.jsx');
const Yellow = require('./yellow.jsx');
const Green = require('./green.jsx');
const Blue = require('./blue.jsx');
const Indigo = require('./indigo.jsx');
const Violet = require('./violet.jsx');


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
    hashHistory.push('/red');
  },

  addGreen() {
    hashHistory.push('/green');
  },

  addBlue() {
    hashHistory.push('/blue');
  },

  addViolet() {
    hashHistory.push('/violet');
  }
});

const routes = (
  <Route path="/" component={Rainbow}>
    <Route path="red" component={Red}>
      <Route path="orange" component={Orange} />
      <Route path="yellow" component={Yellow} />
    </Route>
    <Route path="green" component={Green} />
    <Route path="blue" component={Blue}/>
    <Route component={Blue}>
      <Route path="indigo" component={Indigo} />
    </Route>
    <Route path="violet" component={Violet} />
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <Router history={hashHistory}>{routes}</Router>,
    document.getElementById('main')
  );
});
