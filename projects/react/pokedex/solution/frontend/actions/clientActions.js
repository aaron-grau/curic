var ApiUtil = require('../util/apiUtil.js');

module.exports = {
  fetchAllPokemons: function() {
    ApiUtil.fetchAllPokemons();
  },

  createPokemon: function(pokemon, callback) {
    ApiUtil.createPokemon(pokemon, callback)
  },

  fetchSinglePokemon: function(id) {
    ApiUtil.fetchSinglePokemon(id);
  },

}
