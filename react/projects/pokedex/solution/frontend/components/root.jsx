import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import PokemonIndexContainer from './pokemon/pokemon_index_container';
import PokemonDetailContainer from './pokemon/pokemon_detail_container';
import PokemonFormContainer from './pokemon/pokemon_form_container';
import ItemDetailContainer from './items/item_detail_container';

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={PokemonIndexContainer}>
          <IndexRoute component={PokemonFormContainer} />
          <Route path="pokemon/:pokemonId" component={PokemonDetailContainer}>
            <Route path="item/:itemId" component={ItemDetailContainer} />
          </Route>
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
