export const fetchAllPokemon = function (success) {
  $.ajax({
    method: 'GET',
    url: 'api/pokemon',
    success
  });
};

export const fetchSinglePokemon = function (id, success) {
  $.ajax({
    method: 'GET',
    url: `api/pokemon/${id}`,
    success
  });
};

export const postPokemon = function (pokemon, success, error) {
  pokemon.moves = Object.keys(pokemon.moves).map(k => pokemon.moves[k]);
  $.ajax({
    method: 'POST',
    url: 'api/pokemon/',
    data: {pokemon: pokemon},
    success,
    error
  });
};
