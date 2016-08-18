import {hashHistory} from 'react-router';

import {fetchAllPokemon,
        fetchSinglePokemon,
        postPokemon} from '../util/api_util.js';

import {receiveAllPokemon,
				receiveSinglePokemon,
        receiveNewPokemon,
        PokemonConstants,
        pokemonErrors} from '../actions/pokemon_actions.js';


export default ({dispatch}) => next => action => {
  const receivePokemonSuccess = data => dispatch(receiveAllPokemon(data));
  const receiveSinglePokemonSuccess = data => dispatch(receiveSinglePokemon(data));
  const receiveNewPokemonSuccess = data => {
    dispatch(receiveNewPokemon(data));
    hashHistory.push(`/pokemon/${data.id}`);
  };
  const pokemonFailure = errors => dispatch(pokemonErrors(errors));
  switch (action.type) {
    case PokemonConstants.REQUEST_ALL_POKEMON:
      fetchAllPokemon(receivePokemonSuccess);
      break;
    case PokemonConstants.REQUEST_SINGLE_POKEMON:
      fetchSinglePokemon(action.id, receiveSinglePokemonSuccess);
      break;
    case PokemonConstants.CREATE_POKEMON:
      postPokemon(action.pokemon, receiveNewPokemonSuccess, pokemonFailure);
      break;
    default:
      next(action);
  }
};
