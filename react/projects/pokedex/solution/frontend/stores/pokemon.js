var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var PokemonConstants = require('../constants/pokemonConstants.js');
var PokemonStore = new Store(AppDispatcher);

var _pokemons = {};

var resetPokemons = function (pokemons) {
  _pokemons = {};
  pokemons.forEach(function (pokemon) {
    _pokemons[pokemon.id] = pokemon;
  });
};

var resetPokemon = function (pokemon) {
  _pokemons[pokemon.id] = pokemon;
};

PokemonStore.all = function () {
  var pokemons = [];
  for (var id in _pokemons) {
    pokemons.push(_pokemons[id]);
  }
  return pokemons;
}

PokemonStore.find = function (id) {
  return _pokemons[id];
}

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
}

module.exports = PokemonStore;
