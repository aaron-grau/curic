import React from 'react';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import PokemonIndexContainer from './pokemon_index_container';
import PokemonDetailContainer from './pokemon_detail_container';
import PokemonFormContainer from './pokemon_form_container';
import ToyDetailContainer from './toy_detail_container';

import * as Actions from '../actions/pokemon_actions';


const Root = ({store}) => {
	const requestAllPokemonOnEnter = () => {
		store.dispatch(Actions.requestAllPokemon());
	};

	const requestSinglePokemonOnEnter = (nextState) => {
		store.dispatch(Actions.requestSinglePokemon(nextState.params.pokemonId));
	};

	return (
		<Provider store={store}>
			<Router history={hashHistory}>
				<Route path="/" component={PokemonIndexContainer} onEnter={requestAllPokemonOnEnter}>
					<IndexRoute component={PokemonFormContainer}/>
					<Route 	path="pokemon/:pokemonId"
									component={PokemonDetailContainer} onEnter={requestSinglePokemonOnEnter}>
						<Route path="toy/:toyId" component={ToyDetailContainer}/>
					</Route>
				</Route>
			</Router>
		</Provider>
	);
};

export default Root;
