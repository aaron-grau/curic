import React from 'react';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch, HashRouter, Link, hashHistory } from 'react-router-dom';
import GreetingContainer from './greeting/greeting_container';
import SessionFormContainer from './session_form/session_form_container';
import SearchContainer from './search/search_container';
import BenchShowContainer from './bench_show/bench_show_container';
import BenchFormContainer from './bench_form/bench_form_container';

const App = ({ store }) => {

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

            <Switch>
              <Route path="/login" render={(props) => (
                !store.getState().session.currentUser ? (
                    <SessionFormContainer {...props}/>
                  ) : (
                    <Redirect to="/"/>
                  )
              )}/>

              <Route path="/signup" render={(props) => (
                !store.getState().session.currentUser ? (
                  <SessionFormContainer {...props}/>
                ) : (
                  <Redirect to="/"/>
                )
              )}/>

              <Route path="/benches/new" render={(props) => (
                store.getState().session.currentUser ? (
                  <BenchFormContainer {...props}/>
                ) : (
                  <Redirect to="/login"/>
                )
              )}/>

              <Route path="/benches/:benchId" component={BenchShowContainer}/>

              <Route exact={true} path="/" component={SearchContainer}/>
            </Switch>

          </div>
        </HashRouter>
      </Provider>
    </div>
  );
};

export default App;
