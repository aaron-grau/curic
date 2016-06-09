module.exports = {
  fetchAllPokemons (cb) {
    $.ajax({
      url: "api/pokemon",
      success: cb
    });
  },

  fetchSinglePokemon (id, cb) {
    $.ajax({
      url: `api/pokemon/${id}`,
      success: cb
    });
  },

  createPokemon (newPokemon, cb, redirectCb) {
    $.ajax({
      url: "api/pokemon",
      method: "POST",
      data: {pokemon: newPokemon},
      success: function (pokemon) {
        cb(pokemon, redirectCb);
      }
    });
  },

  updateToy (toy, cb, redirectCb) {
    $.ajax({
      url: `api/toys/${toy.id}`,
      method: "PATCH",
      data: {toy: toy},
      success: function (pokemon) {
        cb(pokemon, redirectCb);
      }
    });
  }
};
