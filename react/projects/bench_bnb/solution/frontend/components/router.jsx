import React from 'react';
//Router
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
//Components
import App from './app';
import SearchContainer from './search/search_container';
import BenchFormContainer from './bench_form/bench_form_container';
import BenchShowContainer from './bench_show/bench_show_container';
import ReviewFormContainer from './bench_show/review_form_container';
import SessionFormContainer from './session_form/session_form_container';

const AppRouter = (props, {store}) => (
  <Router history={ hashHistory }>
    <Route path="/" component={ App }>
      <IndexRoute component={ SearchContainer } />
      <Route path="/login" component={ SessionFormContainer } />
      <Route path="/signup" component={ SessionFormContainer } />
      <Route path="/benches/new" component={ BenchFormContainer } onEnter={ _ensureLoggedIn(store) }/>
      <Route path="/benches/:benchId" component={ BenchShowContainer} >
        <Route path="review" component={ ReviewFormContainer } onEnter={ _ensureLoggedIn(store) }/>
      </Route>
    </Route>
  </Router>
);

AppRouter.contextTypes = {
  store: React.PropTypes.object.isRequired
};

const _ensureLoggedIn = store => (nextState, replace) => {
  const currentUser = store.getState().session.currentUser;
  if (!currentUser) {
    replace('/login');
  }
};

export default AppRouter;
