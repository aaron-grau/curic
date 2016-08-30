import React from 'react';
//Router
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
//Components
import App from '../app';
import SearchContainer from '../search/search_container';
import BenchFormContainer from '../bench_form/bench_form_container';
import BenchShowContainer from '../bench_show/bench_show_container';
import ReviewFormContainer from '../bench_show/review_form_container';
import SessionFormContainer from '../session_form/session_form_container';

class AppRouter extends React.Component{
  constructor(props){
    super(props);
    this._ensureLoggedIn = this._ensureLoggedIn.bind(this);
    this._redirectIfLoggedIn = this._redirectIfLoggedIn.bind(this);
  }

  _ensureLoggedIn(nextState, replace){
    const currentUser = this.props.currentUser;
    if (!currentUser) {
      replace('/login');
    }
  }

  _redirectIfLoggedIn(nextState, replace){
    const currentUser = this.props.currentUser;
    if (currentUser) {
      replace('/');
    }
  }

  render(){
    return(
      <Router history={ hashHistory }>
        <Route path="/" component={ App }>
          <IndexRoute component={ SearchContainer } />
          <Route path="/login" component={ SessionFormContainer } onEnter={this._redirectIfLoggedIn}/>
          <Route path="/signup" component={ SessionFormContainer } onEnter={this._redirectIfLoggedIn}/>
          <Route path="/benches/new" component={ BenchFormContainer } onEnter={ this._ensureLoggedIn }/>
          <Route path="/benches/:benchId" component={ BenchShowContainer} >
            <Route path="review" component={ ReviewFormContainer } onEnter={ this._ensureLoggedIn }/>
          </Route>
        </Route>
      </Router>
    );
  }
}

export default AppRouter;
