export const selectToys = (state) => {
	return state.pokemonDetail ? Object.keys(state.pokemonDetail.toys).map((toyId) => {
		return state.pokemonDetail.toys[toyId];
	}) : [];
};
