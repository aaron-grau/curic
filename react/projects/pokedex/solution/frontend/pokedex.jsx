import { Router, Route, IndexRoute, hashHistory } from 'react-router'

const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./components/app.jsx');
const PokemonDetail = require('./components/pokemons/detail.jsx');
const ToyDetail = require('./components/toys/detail.jsx');

const routes = (
  <Route path="/" component={App}>
    <Route path="pokemon/:pokemonId" component={PokemonDetail}>
      <Route path="toys/:toyId" component={ToyDetail} />
    </Route>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <Router history={hashHistory}>{routes}</Router>,
    document.getElementById('root')
  );
});
