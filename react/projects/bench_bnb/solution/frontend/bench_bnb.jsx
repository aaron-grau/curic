//React
import React from 'react';
import ReactDOM from 'react-dom';
//Router
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
//Components
import App from './components/App';
import Search from './components/Search';
import BenchForm from './components/BenchForm';
import BenchShow from './components/BenchShow';
import ReviewForm from './components/ReviewForm';
import LoginForm from './components/LoginForm';
//Auth
import SessionStore from './stores/session_store';
import SessionActions from './actions/session_actions';

const appRouter = (
  <Router history={ hashHistory }>
    <Route path="/" component={ App } onEnter={ _ensureUserFetched }>
      <IndexRoute component={ Search } />
      <Route path="/login" component={ LoginForm } />
      <Route path="/signup" component={ LoginForm } />
      <Route path="benches/new" component={ BenchForm } onEnter={ _ensureLoggedIn }/>
      <Route path="benches/:benchId" component={ BenchShow} >
        <Route path="review" component={ ReviewForm } onEnter={ _ensureLoggedIn }/>
      </Route>
    </Route>
  </Router>
);

function _ensureUserFetched(nextState, replace, asyncDoneCallback){
  //Any time we render the app, we want to ensure that we have already
  //checked to see if the user is logged in. This should only fire once --
  //when the user first visits our website / after a reload
  if ( SessionStore.currentUserHasBeenFetched() ) {
    asyncDoneCallback();
  } else {
    SessionActions.fetchCurrentUser(asyncDoneCallback);
  }
}

function _ensureLoggedIn(nextState, replace, asyncDoneCallback) {
  // We don't want users to be able to visit our 'new' or 'review' routes
  // if they haven't already signed in/up. Let's redirect them!
  // Router is in the process of entering a route.
  // Will wait for us to call the `asyncDoneCallback`
  // before it actually enters the route (and renders onto the page)
  //
  // Let's check if user is signed in, if they are, we can just call
  // the asyncDoneCallback and the Router will enter the Route normally,
  // else, if user is NOT signed in, let's call the `replace` argument
  // to instead redirect the user to the login route/component.
  if (SessionStore.currentUserHasBeenFetched()) {
    redirectIfNotLoggedIn();
  } else {
    SessionActions.fetchCurrentUser(redirectIfNotLoggedIn);
  }

  function redirectIfNotLoggedIn() {
    if (!SessionStore.isUserLoggedIn()) {
      // `replace` is like a redirect. It replaces the current entry
      // into the history (and the hashFragment), so the Router is forced
      // to re-route.
      replace('/login');
    }

    // The `asyncDoneCallback` is the React Router's way of telling us
    // "let me know when you're done doing any async stuff, and I'll see
    // if I render the original Route or navigate to another one. In the
    // meantime, I'll just wait and not do anything".
    asyncDoneCallback();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('content');
  ReactDOM.render(appRouter, root);
});
