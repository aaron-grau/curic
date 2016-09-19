import { RECEIVE_ALL_POKEMON, RECEIVE_SINGLE_POKEMON, RECEIVE_NEW_POKEMON, 
  POKEMON_ERROR, REQUEST_ALL_POKEMON, REQUEST_SINGLE_POKEMON } from '../actions/pokemon_actions';
import merge from 'lodash/merge';

const PokemonReducer = (oldState = {loading: false}, action) => {
  switch (action.type) {
    case RECEIVE_ALL_POKEMON:
      return merge({}, oldState, {loading: false, pokemon: action.pokemon});
    case RECEIVE_SINGLE_POKEMON:
      return merge({}, oldState, {loading: false, pokemonDetail: action.pokemon});
    case RECEIVE_NEW_POKEMON:
      action.pokemon.toys = {};
      return merge({}, oldState, {
        pokemonDetail: action.pokemon, pokemon: [...oldState.pokemon, action.pokemon]
      });
    case POKEMON_ERROR:
      return merge({}, oldState, {pokemonErrors: action.errors});
    case REQUEST_ALL_POKEMON:
      return merge({}, oldState, {loading: true});
    case REQUEST_SINGLE_POKEMON:
      return merge({}, oldState, {loading: true});
    default:
      return oldState;
  }
};

export default PokemonReducer;
