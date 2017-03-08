import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router,
  Route,
  IndexRoute,
  hashHistory,
  withRouter
} from 'react-router';

import Red from './components/red';
import Orange from './components/orange';
import Yellow from './components/yellow';
import Green from './components/green';
import Blue from './components/blue';
import Indigo from './components/indigo';
import Violet from './components/violet';


class Rainbow extends React.Component {
  constructor() {
    super();
    this.addRed = this.addRed.bind(this);
    this.addGreen = this.addGreen.bind(this);
    this.addBlue = this.addBlue.bind(this);
    this.addViolet = this.addViolet.bind(this);
  }

  addRed() {
    this.props.router.push('/red');
  }

  addGreen() {
    this.props.router.push('/green');
  }

  addBlue() {
    this.props.router.push('/blue');
  }

  addViolet() {
    this.props.router.push('/violet');
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
          {this.props.children}
        </div>
      </div>
    );
  }
};

Rainbow = withRouter(Rainbow);

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

document.addEventListener('DOMContentLoaded', () => {
  const main = document.getElementById('main');
  ReactDOM.render(
    <Router history={hashHistory}>{routes}</Router>,
    main
  );
});
