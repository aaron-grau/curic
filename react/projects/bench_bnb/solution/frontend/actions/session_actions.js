import SessionConstants from '../constants/session_constants';
import SessionApiUtil from '../util/session_api_util';
import SessionStore from '../stores/session_store';
import AppDispatcher from '../dispatcher/dispatcher';

const SessionActions = {

  receiveCurrentUser(currentUser) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGIN,
      currentUser: currentUser
    });
  },

  removeCurrentUser() {
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGOUT
    });
  }

};

export default SessionActions;
