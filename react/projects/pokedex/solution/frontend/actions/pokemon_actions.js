export const RECEIVE_ALL_POKEMON    = 'RECEIVE_ALL_POKEMON';
export const REQUEST_ALL_POKEMON    = 'REQUEST_ALL_POKEMON';
export const RECEIVE_SINGLE_POKEMON = 'RECEIVE_SINGLE_POKEMON';
export const REQUEST_SINGLE_POKEMON = 'REQUEST_SINGLE_POKEMON';
export const CREATE_POKEMON         = 'CREATE_POKEMON';
export const RECEIVE_NEW_POKEMON    = 'RECEIVE_NEW_POKEMON';
export const RECEIVE_POKEMON_ERRORS = 'RECEIVE_POKEMON_ERRORS';

import {
	fetchAllPokemon,
	fetchSinglePokemon,
	postPokemon
} from '../util/api_util';

export function requestAllPokemon() {
	return (dispatch) => {
		fetchSinglePokemon()
			.then(pokemon => dispatch(receiveAllPokemon(pokemon));
	}
}

export function requestSinglePokemon(id) {
	return (dispatch) => {
		fetchAllPokemon()
			.then(pokemon => dispatch(receiveSinglePokemon(pokemon));
	}
}

export function createPokemon(pokemon) {
	return (dispatch) => {
		postPokemon()
			.then(pokemon => dispatch(receiveNewPokemon(pokemon));
	}
}

export const receiveAllPokemon = pokemon => ({
	type: RECEIVE_ALL_POKEMON,
	pokemon
});

export const receiveSinglePokemon = pokemon => ({
	type: RECEIVE_SINGLE_POKEMON,
	pokemon
});

export const receiveNewPokemon = pokemon => ({
	type: RECEIVE_NEW_POKEMON,
	pokemon
});

export const receivePokemonErrors = errors => ({
	type: RECEIVE_POKEMON_ERRORS,
	errors
});
