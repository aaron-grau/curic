import { connect } from 'react-redux';
import NavBar from './nav_bar';

import { login, logout } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => ({
  buttonValue: ownProps.pathname === '/' ? "log in" : "log out",
  nextRoute: ownProps.pathname === '/' ? '/dashboard' : '/'
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const sessionAction = ownProps.pathname === '/' ? login : logout;
  return ({
    processClick: () => dispatch(sessionAction())
  });
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
