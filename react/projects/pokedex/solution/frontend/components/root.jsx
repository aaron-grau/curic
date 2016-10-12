import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import History from '../util/history';

import PokemonIndexContainer from './pokemon/index_container';
import PokemonDetailContainer from './pokemon/detail_container';
import PokemonFormContainer from './pokemon/form_container';
import ItemDetailContainer from './items/item_detail_container';

import * as Actions from '../actions/pokemon_actions';


const Root = ({ store }) => {
	const requestAllPokemonOnEnter = () => {
		store.dispatch(Actions.requestAllPokemon());
	};

	const requestSinglePokemonOnEnter = (nextState) => {
		store.dispatch(Actions.requestSinglePokemon(nextState.params.pokemonId));
	};

	return (
		<Provider store={store}>
			<Router history={History}>
				<Route path="/" component={PokemonIndexContainer} onEnter={requestAllPokemonOnEnter}>
					<IndexRoute component={PokemonFormContainer}/>
					<Route 	path="pokemon/:pokemonId"
									component={PokemonDetailContainer} onEnter={requestSinglePokemonOnEnter}>
						<Route path="item/:itemId" component={ItemDetailContainer}/>
					</Route>
				</Route>
			</Router>
		</Provider>
	);
};

export default Root;
