import { connect } from 'react-redux';

import App from './App';

const mapStateToProps = state => ({
    loggedIn: Boolean(state.session.currentUser)
});

export default connect(
  mapStateToProps,
  null
)(App);
