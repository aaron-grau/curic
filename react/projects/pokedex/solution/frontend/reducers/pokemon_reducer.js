import { merge } from 'lodash';

import {
  RECEIVE_ALL_POKEMON,
  RECEIVE_NEW_POKEMON
} from '../actions/pokemon_actions';

const PokemonReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ALL_POKEMON:
      return action.pokemon;
    case RECEIVE_NEW_POKEMON:
      const newPokemon = {[action.pokemon.id]: action.pokemon};
      return merge({}, state, newPokemon);
    default:
      return state;
  }
};

export default PokemonReducer;
