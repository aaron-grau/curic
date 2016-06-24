"use strict";

//React
const React = require('react');
const ReactDOM = require('react-dom');
//Router
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;
//Components
const App = require('./components/app');
const Search = require('./components/search');
const BenchForm = require('./components/bench_form');
const BenchShow = require('./components/bench_show');
const ReviewForm = require('./components/review_form');
const LoginForm = require('./components/login_form');
//Auth
const SessionStore = require('./stores/session_store');
const SessionActions = require('./actions/session_actions');

const appRouter = (
  <Router history={ hashHistory }>
    <Route path="/" component={ App }>
      <IndexRoute component={ Search } />
      <Route path="/login" component={ LoginForm } />
      <Route path="/signup" component={ LoginForm } />
      <Route path="/benches/new" component={ BenchForm } onEnter={ _ensureLoggedIn }/>
      <Route path="/benches/:benchId" component={ BenchShow} >
        <Route path="review" component={ ReviewForm } onEnter={ _ensureLoggedIn }/>
      </Route>
    </Route>
  </Router>
);

function _ensureLoggedIn(nextState, replace) {
  // We don't want users to be able to visit our 'new' or 'review' routes
  // if they haven't already signed in/up. Let's redirect them!
  // `replace` is like a redirect. It replaces the current entry
  // into the history (and the hashFragment), so the Router is forced
  // to re-route.
    if (!SessionStore.isUserLoggedIn()) {
      replace('/login');
    }
}

document.addEventListener('DOMContentLoaded', function() {
  if (window.currentUser) {
    SessionActions.receiveCurrentUser(window.currentUser);
  }
  
  const root = document.getElementById('content');
  ReactDOM.render(appRouter, root);
});
