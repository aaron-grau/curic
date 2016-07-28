import { SessionConstants } from '../actions/session_actions';

const defaultState = {
  currentUser: null,
  errors: []
};

const SessionReducer = function(oldState = defaultState, action){
  switch(action.type){
    case SessionConstants.RECEIVE_CURRENT_USER:
      const currentUser = action.currentUser;
      return Object.assign({}, defaultState, {currentUser});
    case SessionConstants.LOGOUT:
      return defaultState;
    case SessionConstants.RECEIVE_ERRORS:
      const errors = action.errors;
      return Object.assign({}, defaultState, {errors});
    default:
      return oldState;
  }
};



export default SessionReducer;
