export const selectPokemonToy = ({pokemonDetail}, itemId) => pokemonDetail.items[itemId] || {};

export const selectDetail = ({pokemonDetail}) => {
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

export const selectItems = ({pokemonDetail}) => {
	return pokemonDetail && pokemonDetail.items ? Object.keys(pokemonDetail.items).map((itemId) => {
		return pokemonDetail.items[itemId];
	}) : [];
};
