export const getAllPokemon = () => {
  return $.ajax({
    method: 'GET',
    url: 'api/pokemon'
  });
};

export const getSinglePokemon = (id) => {
  return $.ajax({
    method: 'GET',
    url: `api/pokemon/${id}`
  });
};

export const postPokemon = (pokemon) => {
  pokemon.moves = Object.keys(pokemon.moves).map(k => pokemon.moves[k]);
  return $.ajax({
    method: 'POST',
    url: 'api/pokemon/',
    data: { pokemon }
  });
};
