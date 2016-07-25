import { LOGIN,
         LOGOUT,
         SIGNUP
       } from '../constants/session_constants';

import { login, signup, logout } from '../util/session_api_util';

export default ({getState, dispatch}) => next => action => {
  switch(action.type){
    case LOGIN:
      login(action.user, dispatch);
      break;
    case LOGOUT:
      logout(next.bind(null, action))
      break;
    case SIGNUP:
      signup(action.user, dispatch);
      break;
    default:
      next(action)
  }
};
