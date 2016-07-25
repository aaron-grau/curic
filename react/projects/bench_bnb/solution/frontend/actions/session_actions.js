import { LOGIN,
         LOGOUT,
         SIGNUP,
         RECEIVE_CURRENT_USER,
         RECEIVE_ERRORS
       } from '../constants/session_constants';

export const signup = user => ({
  type: SIGNUP,
  user
});

export const login = user => ({
  type: LOGIN,
  user
});

export const logout = () => ({
  type: LOGOUT
});

export const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});
