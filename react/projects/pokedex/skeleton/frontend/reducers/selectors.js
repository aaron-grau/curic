export const selectPokemonToy = ({pokemonDetail}, itemId) => pokemonDetail.items[itemId] || {};

export const selectItems = ({pokemonDetail}) => {
	return pokemonDetail && pokemonDetail.items ? Object.keys(pokemonDetail.items).map((itemId) => {
		return pokemonDetail.items[itemId];
	}) : [];
};
