import {PokemonConstants} from '../actions/pokemon_actions';

const PokemonReducer = function (oldState = {loading: false}, action) {
  switch (action.type) {
    case PokemonConstants.RECEIVE_ALL_POKEMON:
      oldState.loading = false;
      return Object.assign({}, oldState, {pokemon: action.pokemon});
    case PokemonConstants.RECEIVE_SINGLE_POKEMON:
      oldState.loading = false;
      return Object.assign({}, oldState, {pokemonDetail: action.pokemon});
    case PokemonConstants.RECEIVE_NEW_POKEMON:
      return Object.assign({}, oldState, {
        pokemonDetail: action.pokemon, pokemon: [...oldState.pokemon, action.pokemon]
      });
    case PokemonConstants.POKEMON_ERROR:
      return Object.assign({}, oldState, {pokemonErrors: action.errors});
    case PokemonConstants.REQUEST_ALL_POKEMON:
      return Object.assign({}, oldState, {loading: true});
    case PokemonConstants.REQUEST_SINGLE_POKEMON:
      return Object.assign({}, oldState, {loading: true});
    default:
      return oldState;
  }
};

export default PokemonReducer;
