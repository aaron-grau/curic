import SessionConstants from '../constants/session_constants';
import SessionApiUtil from '../util/session_api_util';
import SessionStore from '../stores/session_store';
import AppDispatcher from '../dispatcher/dispatcher';

var SessionActions = {

  receiveCurrentUser: function (currentUser) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGIN,
      currentUser: currentUser
    });
  },

  removeCurrentUser: function () {
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGOUT
    });
  }

};

module.exports = SessionActions;
