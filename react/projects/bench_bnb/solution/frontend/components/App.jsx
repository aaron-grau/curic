import React from 'react';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch, HashRouter, Link, hashHistory } from 'react-router-dom';
import GreetingContainer from './greeting/greeting_container';
import SessionFormContainer from './session_form/session_form_container';
import SearchContainer from './search/search_container';
import BenchShowContainer from './bench_show/bench_show_container';
import BenchFormContainer from './bench_form/bench_form_container';

const App = ({ store }) => {


  const AuthRoute = ({Component, path, loggedIn}) => {
    return <Route path={path} render={(props) => (
      !store.getState().session.currentUser ? (
        <Component {...props}/>
      ) : (
        <Redirect to="/" />
      )
    )}/>
  }

  const ProtectedRoute = ({Component, path, loggedIn}) => {
    return <Route path={path} render={(props) => (
       store.getState().session.currentUser ? (
        <Component {...props}/>
      ) : (
        <Redirect to="/login"/>
      )
    )}/>
  }

  return (
    <div>
      <Provider store={store}>
        <HashRouter>
          <div>
            <header>
              <Link to="/" className="header-link">
                <h1>Bench BnB</h1>
              </Link>
              <GreetingContainer />
            </header>
              <AuthRoute path="/login" Component={SessionFormContainer}/>
              <AuthRoute path="/signup" Component={SessionFormContainer}/>
              <ProtectedRoute path="/benches/new" Component={BenchFormContainer}/>
              <Route path="/benches/:benchId"component={BenchShowContainer}/>
              <Route exact={true} path="/" component={SearchContainer}/>
          </div>
        </HashRouter>
      </Provider>
    </div>
  );
};

export default App;
