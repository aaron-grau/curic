"use strict";

const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');

const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;

const Red = require('./components/red.jsx');
const Orange = require('./components/orange.jsx');
const Yellow = require('./components/yellow.jsx');
const Green = require('./components/green.jsx');
const Blue = require('./components/blue.jsx');
const Indigo = require('./components/indigo.jsx');
const Violet = require('./components/violet.jsx');


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
    <Route path="blue" component={Blue}>
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
