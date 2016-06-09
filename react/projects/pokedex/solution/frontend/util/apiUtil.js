var ServerActions = require('../actions/serverActions.js');

module.exports = {
  fetchAllPokemons: function () {
    $.ajax({
      url: "api/pokemon",
      success: function (pokemons) {
        ServerActions.receiveAllPokemons(pokemons);
      }
    })
  },

  fetchSinglePokemon: function (id) {
    $.ajax({
      url: "api/pokemon/" + id,
      success: function (pokemon) {
        ServerActions.receiveSinglePokemon(pokemon);
      }
    })
  },

  createPokemon: function (pokemon, callback) {
    $.ajax({
      url: "api/pokemon",
      method: "POST",
      data: {pokemon: pokemon},
      success: function (pokemon) {
        ServerActions.receiveSinglePokemon(pokemon);
        callback && callback(pokemon.id);
      }
    })
  }
}
