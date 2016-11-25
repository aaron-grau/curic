import {
  RECEIVE_ALL_POKEMON,
  RECEIVE_SINGLE_POKEMON,
  RECEIVE_NEW_POKEMON,
  RECEIVE_POKEMON_ERRORS,
  CREATE_POKEMON,
  REQUEST_ALL_POKEMON,
  REQUEST_SINGLE_POKEMON } from '../actions/pokemon_actions';

const initialState = {
  indexLoading: false,
  detailLoading: false
}

export default (state = initialState, action) => {
  switch(action.type){
    case RECEIVE_ALL_POKEMON:
    case RECEIVE_NEW_POKEMON:
    case RECEIVE_SINGLE_POKEMON:
    case RECEIVE_POKEMON_ERRORS:
      return initialState;
    case REQUEST_ALL_POKEMON:
    return Object.assign({}, state, { indexLoading: true });
    case CREATE_POKEMON:
    case REQUEST_SINGLE_POKEMON:
      return Object.assign({}, state, { detailLoading: true });
    default:
      return state;
  }
};
