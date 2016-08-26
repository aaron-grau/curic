import { PokemonConstants } from '../actions/pokemon_actions';
import merge from 'lodash/merge';

const PokemonReducer = (oldState = {loading: false}, action) => {
  switch (action.type) {
    case PokemonConstants.RECEIVE_ALL_POKEMON:
      oldState.loading = false;
      return merge({}, oldState, {pokemon: action.pokemon});
    case PokemonConstants.RECEIVE_SINGLE_POKEMON:
      oldState.loading = false;
      return merge({}, oldState, {pokemonDetail: action.pokemon});
    case PokemonConstants.RECEIVE_NEW_POKEMON:
      action.pokemon.toys = {};
      return merge({}, oldState, {
        pokemonDetail: action.pokemon, pokemon: [...oldState.pokemon, action.pokemon]
      });
    case PokemonConstants.POKEMON_ERROR:
      return merge({}, oldState, {pokemonErrors: action.errors});
    case PokemonConstants.REQUEST_ALL_POKEMON:
      return merge({}, oldState, {loading: true});
    case PokemonConstants.REQUEST_SINGLE_POKEMON:
      return merge({}, oldState, {loading: true});
    default:
      return oldState;
  }
};

export default PokemonReducer;
