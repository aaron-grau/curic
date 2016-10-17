import { values } from 'lodash';

export const selectPokemonItem = ({pokemonDetail}, itemId) => {
	const foundItem = pokemonDetail.items.find( item => item.id === itemId);
	return foundItem || {};
}

export const selectItems = ({pokemonDetail}) => {
	return pokemonDetail && pokemonDetail.items ? Object.keys(pokemonDetail.items).map((itemId) => {
		return pokemonDetail.items[itemId];
	}) : [];
};

export const selectAllPokemon = ({pokemon}) => values(pokemon);
