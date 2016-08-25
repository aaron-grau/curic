export const selectToys = (state) => {
	return state.pokemonDetail && state.pokemonDetail.toys ? Object.keys(state.pokemonDetail.toys).map((toyId) => {
		return state.pokemonDetail.toys[toyId];
	}) : [];
};
