import React from 'react';
import { Link } from 'react-router';
import SessionStore from '../stores/session_store';
import SessionActions from '../actions/session_actions';

const App = React.createClass({

  componentDidMount() {
    SessionStore.addListener(this.forceUpdate.bind(this));
  },

  _handleSignOut(){
    SessionActions.signOut();
  },

  greeting() {
    if (SessionStore.isUserLoggedIn()) {
      const numFavoriteBenches = SessionStore.currentUser().favorite_benches.length;

    	return (
    		<hgroup>
    			<h2>Hi, {SessionStore.currentUser().username}!</h2>
    			<input type="submit" value="logout" onClick={ this._handleSignOut } />
    			<h3>You have {numFavoriteBenches} favorite benches!</h3>
    		</hgroup>
    	);
    } else if ( !["/login", "/signup"].includes(this.props.location.pathname) ) {
      return (
        <nav>
          <Link to="/login" activeClassName="current">Login</Link>
          &nbsp;or&nbsp;
          <Link to="/signup" activeClassName="current">Sign up!</Link>
        </nav>
      );
    }
  },

  render() {
    return (
      <div>
        <header>
          <h1>Bench BnB</h1>
          { this.greeting() }
        </header>
        {this.props.children}
      </div>
    );
  }
});

export default App;
