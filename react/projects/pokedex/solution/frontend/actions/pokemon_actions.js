export const RECEIVE_ALL_POKEMON = 'RECEIVE_ALL_POKEMON';
export const REQUEST_ALL_POKEMON = 'REQUEST_ALL_POKEMON';
export const RECEIVE_SINGLE_POKEMON = 'RECEIVE_SINGLE_POKEMON';
export const REQUEST_SINGLE_POKEMON = 'REQUEST_SINGLE_POKEMON';
export const CREATE_POKEMON = 'CREATE_POKEMON';
export const RECEIVE_NEW_POKEMON = 'RECEIVE_NEW_POKEMON';
export const RECEIVE_POKEMON_ERRORS = 'RECEIVE_POKEMON_ERRORS;

export const receiveAllPokemon = pokemon => ({
	type: PokemonConstants.RECEIVE_ALL_POKEMON,
	pokemon
});

export const requestAllPokemon = () => ({
	type: PokemonConstants.REQUEST_ALL_POKEMON
});

export const receiveSinglePokemon = pokemon => ({
	type: PokemonConstants.RECEIVE_SINGLE_POKEMON,
	pokemon
});

export const requestSinglePokemon = id => ({
	type: PokemonConstants.REQUEST_SINGLE_POKEMON,
	id
});

export const createPokemon = (pokemon, push) => ({
	type: PokemonConstants.CREATE_POKEMON,
	pokemon,
	push
});

export const receiveNewPokemon = pokemon => ({
	type: PokemonConstants.RECEIVE_NEW_POKEMON,
	pokemon
});

export const pokemonErrors = errors => ({
	type: PokemonConstants.RECEIVE_POKEMON_ERRORS,
	errors
});
