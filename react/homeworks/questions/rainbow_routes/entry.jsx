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

        <h3 onClick={this.addRed}>Red</h3>
        <h3 onClick={this.addGreen}>Green</h3>
        <h3 onClick={this.addBlue}>Blue</h3>
        <h3 onClick={this.addViolet}>Violet</h3>
        {this.props.children}
      </div>
    );
  }

  // your add color functions here
});

const routes = (
  // your routes here
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    // render the router here (and don't forget what arguments ReactDOM's render method takes!)
  );
});
