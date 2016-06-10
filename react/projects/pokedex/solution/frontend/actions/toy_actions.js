const ApiUtil = require('../util/api_util.js');
const PokemonActions = require('./pokemon_actions.js');
const Dispatcher = require('../dispatcher/dispatcher.js');
const PokemonConstants = require('../constants/pokemon_constants.js');

module.exports = {
  updateToy (toy, redirectCb) {
    ApiUtil.updateToy(toy, PokemonActions.receiveSinglePokemon, redirectCb);
  }
};
