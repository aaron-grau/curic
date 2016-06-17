'use strict';
const React = require('react');
const PokemonStore = require('../../stores/pokemon.js');
const PokemonActions = require('../../actions/pokemon_actions.js');
const PokemonIndexItem = require('./index_item.jsx');

module.exports = React.createClass({
  getInitialState () {
    return { pokemons: PokemonStore.all() };
  },

  _onChange () {
    this.setState({ pokemons: PokemonStore.all() });
  },

  componentDidMount () {
    this.pokemonListener = PokemonStore.addListener(this._onChange);
    PokemonActions.fetchAllPokemons();
  },

  compomentWillUnmount () {
    this.pokemonListener.remove();
  },

  render () {
    return(
      <ul>
        {this.state.pokemons.map((pokemon) => {
          return <PokemonIndexItem key={pokemon.id} pokemon={pokemon} />;
        })}
      </ul>
    );
  }
});
