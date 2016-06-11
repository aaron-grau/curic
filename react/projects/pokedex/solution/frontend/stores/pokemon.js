'use strict';

const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const PokemonConstants = require('../constants/pokemon_constants.js');
const PokemonStore = new Store(AppDispatcher);

let _pokemons = {};

const resetPokemons = function (pokemons) {
  _pokemons = {};
  pokemons.forEach(function (pokemon) {
    _pokemons[pokemon.id] = pokemon;
  });
};

const resetPokemon = function (pokemon) {
  _pokemons[pokemon.id] = pokemon;
};

PokemonStore.all = function () {
  const pokemons = [];
  for (let id in _pokemons) {
    if (_pokemons.hasOwnProperty(id)) {
      pokemons.push(_pokemons[id]);
    }
  }
  return pokemons;
};

PokemonStore.find = function (id) {
  return _pokemons[id];
};

PokemonStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case PokemonConstants.POKEMONS_RECEIVED:
      resetPokemons(payload.pokemons);
      PokemonStore.__emitChange();
      break;
    case PokemonConstants.POKEMON_RECEIVED:
      resetPokemon(payload.pokemon);
      PokemonStore.__emitChange();
      break;
  }
};

module.exports = PokemonStore;
