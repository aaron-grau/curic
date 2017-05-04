import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import PokemonIndexContainer from './components/pokemon/pokemon_index_container';

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  const root = document.getElementById('root');

  const Root = () => (
    <Provider store={store}>
      <HashRouter>
        <Route path="/" component={PokemonIndexContainer} />
      </HashRouter>
    </Provider>
  );

  ReactDOM.render(<Root store={store} />, root);
});
