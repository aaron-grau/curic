export const selectPokemonToy = (pokemonDetail, toyId) => pokemonDetail.toys[toyId] || {};

export const selectDetail = (pokemonDetail) => {
  if (pokemonDetail)
    return pokemonDetail;
  return {
    image_url: '',
    name: '',
    poke_type: '',
    attack: '',
    defense: '',
    moves: []
  };
};

export const selectToys = (pokemonDetail) => {
	return pokemonDetail && pokemonDetail.toys ? Object.keys(pokemonDetail.toys).map((toyId) => {
		return pokemonDetail.toys[toyId];
	}) : [];
};
