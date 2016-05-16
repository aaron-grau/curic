var React = require('react');
var PokemonForm = require('./pokemons/form');
var PokemonIndex = require('./pokemons/index');

module.exports = React.createClass({

  render: function () {
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
