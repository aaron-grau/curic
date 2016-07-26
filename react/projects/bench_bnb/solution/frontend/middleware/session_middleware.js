import { LOGIN,
         LOGOUT,
         SIGNUP
       } from '../constants/session_constants';

import { receiveCurrentUser, receiveErrors } from '../actions/session_actions';

import { login, signup, logout } from '../util/session_api_util';

export default ({getState, dispatch}) => next => action => {
  const successCallback = user => dispatch(receiveCurrentUser(user));
  const errorCallback = xhr => {
    const errors = xhr.responseJSON;
    dispatch(receiveErrors(errors));
  };
  
  switch(action.type){
    case LOGIN:
      login(action.user, successCallback, errorCallback);
      break;
    case LOGOUT:
      logout(() => next(action))
      break;
    case SIGNUP:
      signup(action.user, successCallback, errorCallback);
      break;
    default:
      next(action)
  }
};
