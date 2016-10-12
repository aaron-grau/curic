import {
  RECEIVE_ALL_POKEMON,
  RECEIVE_SINGLE_POKEMON,
  RECEIVE_NEW_POKEMON,
  CREATE_POKEMON,
  REQUEST_ALL_POKEMON,
  REQUEST_SINGLE_POKEMON } from '../actions/pokemon_actions';

export default (state = false, action) => {
  switch(action.type){
    case RECEIVE_ALL_POKEMON:
      return false;
    case RECEIVE_NEW_POKEMON:
      return false;
    case RECEIVE_SINGLE_POKEMON:
      return false;
    case CREATE_POKEMON:
      return true;
    case REQUEST_ALL_POKEMON:
      return true;
    case REQUEST_SINGLE_POKEMON:
      return true;
    default:
      return state;
  }
};
