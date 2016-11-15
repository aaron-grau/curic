export const fetchAllPokemon = success => {
  return $.ajax({
    method: 'GET',
    url: 'api/pokemon',
    success
  });
};

export const fetchSinglePokemon = (id, success) => {
  return $.ajax({
    method: 'GET',
    url: `api/pokemon/${id}`,
    success
  });
};

export const postPokemon = (pokemon, success, error) => {
  pokemon.moves = Object.keys(pokemon.moves).map(k => pokemon.moves[k]);
  return $.ajax({
    method: 'POST',
    url: 'api/pokemon/',
    data: {pokemon},
    success,
    error
  });
};
