//React
import React from 'react';
import ReactDOM from 'react-dom';
//Router
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
//Redux
import { Provider } from 'react-redux';
import Store from './store/store';
//Components
import App from './components/app';
import Search from './components/search/search_container';
import BenchForm from './components/bench_form/bench_form_container';
import BenchShow from './components/bench_show/bench_show_container';
import ReviewForm from './components/bench_show/review_form_container';
import SessionForm from './components/session_form/session_form_container';
//Actions
import { receiveCurrentUser } from './actions/session_actions';

const appRouter = (
  <Router history={ hashHistory }>
    <Route path="/" component={ App }>
      <IndexRoute component={ Search } />
      <Route path="/login" component={ SessionForm } />
      <Route path="/signup" component={ SessionForm } />
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
  const currentUser = Store.getState().session.currentUser;
    if (!currentUser) {
      replace('/login');
    }
}

document.addEventListener('DOMContentLoaded', function() {
  if (window.currentUser) {
    const action = receiveCurrentUser(window.currentUser);
    Store.dispatch(action);
  }

  const root = document.getElementById('content');
  ReactDOM.render(<Provider store={Store}>{appRouter}</Provider>, root);
});
