import { LOGIN, LOGOUT } from '../actions/session_actions';

const sessionReducer = (state = false, action) => {
  console.log(action.type);
  switch(action.type) {
    case LOGIN:
      return true;
    case LOGOUT:
      return false;
    default:
      return state;
  }
};

export default sessionReducer;
