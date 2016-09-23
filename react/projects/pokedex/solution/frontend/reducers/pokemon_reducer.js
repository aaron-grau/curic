import {
  RECEIVE_ALL_POKEMON,
  RECEIVE_SINGLE_POKEMON,
  RECEIVE_NEW_POKEMON,
  POKEMON_ERROR,
  REQUEST_ALL_POKEMON,
  REQUEST_SINGLE_POKEMON } from '../actions/pokemon_actions';
  
import merge from 'lodash/merge';

const PokemonReducer = (state = {loading: false, pokemon: []}, action) => {
  switch (action.type) {
    case RECEIVE_ALL_POKEMON:
      return merge({}, state, {
        loading: false,
        pokemon: action.pokemon
      });
    case RECEIVE_SINGLE_POKEMON:
      return merge({}, state, {
        loading: false,
        pokemonDetail: action.pokemon
      });
    case RECEIVE_NEW_POKEMON:
      action.pokemon.toys = {};
      return merge({}, state, {
        pokemonDetail: action.pokemon,
        pokemon: [...state.pokemon, action.pokemon]
      });
    case POKEMON_ERROR:
      return merge({}, state, {
        pokemonErrors: action.errors
      });
    case REQUEST_ALL_POKEMON:
      return merge({}, state, {
        loading: true
      });
    case REQUEST_SINGLE_POKEMON:
      return merge({}, state, {
        loading: true
      });
    default:
      return state;
  }
};

export default PokemonReducer;
