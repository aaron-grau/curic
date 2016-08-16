import React from 'react';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import PokemonIndexContainer from './pokemon_index_container';
import PokemonDetailContainer from './pokemon_detail_container';
import PokemonFormContainer from './pokemon_form_container';
import ToyDetailContainer from './toy_detail_container';

const Root = ({store}) => (

	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="/" component={PokemonIndexContainer}>
				<IndexRoute component={PokemonFormContainer}/>
				<Route path="pokemon/:pokemonId" component={PokemonDetailContainer}>
					<Route path="toy/:toyId" component={ToyDetailContainer}/>
				</Route>
			</Route>
		</Router>
	</Provider>
);

export default Root;
