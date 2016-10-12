import {
  RECEIVE_SINGLE_POKEMON,
  RECEIVE_NEW_POKEMON
 } from '../actions/pokemon_actions';

const _defaultState = {
  image_url: '',
  name: '',
  poke_type: '',
  attack: '',
  defense: '',
  moves: [],
  items: []
};

export default (state = _defaultState, action) => {
  switch(action.type){
    case RECEIVE_SINGLE_POKEMON:
      return action.pokemon;
    case RECEIVE_NEW_POKEMON:
      return action.pokemon;
    default:
      return state;
  }
};
