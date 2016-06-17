'use strict';
const ApiUtil = require('../util/api_util.js');
const Dispatcher = require('../dispatcher/dispatcher.js');
const PokemonConstants = require('../constants/pokemon_constants.js');

module.exports = {
  fetchAllPokemons () {
    ApiUtil.fetchAllPokemons(this.receiveAllPokemons);
  },

  createPokemon (pokemon, redirectCb) {
    ApiUtil.createPokemon(pokemon, this.receiveSinglePokemon, redirectCb);
  },

  fetchSinglePokemon (id) {
    ApiUtil.fetchSinglePokemon(id, this.receiveSinglePokemon);
  },

  receiveAllPokemons (pokemons) {
    Dispatcher.dispatch({
      actionType: PokemonConstants.POKEMONS_RECEIVED,
      pokemons: pokemons
    });
  },

  receiveSinglePokemon (pokemon, redirectCb) {
    Dispatcher.dispatch({
      actionType: PokemonConstants.POKEMON_RECEIVED,
      pokemon: pokemon
    });

    if (typeof redirectCb === 'function') {
      redirectCb(pokemon);
    }
  }

};
