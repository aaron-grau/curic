import AppDispatcher from '../dispatcher/dispatcher';
import SessionConstants from '../constants/session_constants';
import SessionApiUtil from '../util/session_api_util';
import ErrorActions from './error_actions';

const SessionActions = {

  signUp(formData){
    SessionApiUtil.signUp(formData,
      this.receiveCurrentUser,
      ErrorActions.setErrors);
  },

  signIn(formData){
    SessionApiUtil.signIn(formData,
      this.receiveCurrentUser,
      ErrorActions.setErrors);
  },

  signOut() {
    SessionApiUtil.signOut(this.removeCurrentUser);
  },

  fetchCurrentUser(complete){
    SessionApiUtil.fetchCurrentUser(this.receiveCurrentUser, complete);
  },

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
