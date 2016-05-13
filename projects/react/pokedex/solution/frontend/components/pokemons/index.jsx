var React = require('react');
var PokemonStore = require('../../stores/pokemon.js');
var ClientActions = require('../../actions/clientActions.js');
var PokemonIndexItem = require('./indexItem.jsx');

module.exports = React.createClass({
  getInitialState: function () {
    return { pokemons: PokemonStore.all() };
  },

  _onChange: function () {
    this.setState({ pokemons: PokemonStore.all() });
  },

  componentDidMount: function () {
    this.pokemonListener = PokemonStore.addListener(this._onChange);
    ClientActions.fetchAllPokemons();
  },

  compomentWillUnmount: function () {
    this.pokemonListener.remove();
  },

  render: function () {
    return(
      <ul>
        {this.state.pokemons.map(function (pokemon) {
          return <PokemonIndexItem key={pokemon.id} pokemon={pokemon} />;
        })}
      </ul>
    );
  }
});
