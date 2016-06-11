'use strict';
const React = require('react');
const PokemonForm = require('./pokemons/form');
const PokemonIndex = require('./pokemons/index');

module.exports = React.createClass({

  render () {
    return(
      <div id="pokedex">
        <div className="pokemon-index-pane">
          <PokemonForm />
          <PokemonIndex />
        </div>

        {this.props.children}
      </div>
    );
  }
});
