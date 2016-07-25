import { RECEIVE_CURRENT_USER,
         LOGOUT,
         RECEIVE_ERRORS
       } from '../constants/session_constants';

const defaultState = {
  currentUser: null,
  errors: []
};

const SessionReducer = function(oldState = defaultState, action){
  switch(action.type){
    case RECEIVE_CURRENT_USER:
      const currentUser = action.currentUser;
      return Object.assign({}, defaultState, {currentUser});
    case LOGOUT:
      return defaultState;
    case RECEIVE_ERRORS:
      const errors = action.errors;
      return Object.assign({}, defaultState, {errors});
    default:
      return oldState;
  }
};



export default SessionReducer;
