'use strict';
const React = require('react');
const PokemonStore = require('../../stores/pokemon.js');
const ToysIndex = require('../toys/index.jsx');
const PokemonActions = require('../../actions/pokemon_actions.js');

module.exports = React.createClass({
  getStateFromStore () {
    return { pokemon: PokemonStore.find(parseInt(this.props.params.pokemonId)) };
  },

  _onChange () {
    this.setState(this.getStateFromStore());
  },

  getInitialState () {
    return this.getStateFromStore();
  },

  componentWillReceiveProps (newProps) {
    PokemonActions.fetchSinglePokemon(parseInt(newProps.params.pokemonId));
  },

  componentDidMount () {
    this.pokemonListener = PokemonStore.addListener(this._onChange);
    PokemonActions.fetchSinglePokemon(parseInt(this.props.params.pokemonId));
  },

  componentWillUnmount () {
    this.pokemonListener.remove();
  },

  render () {
    if(this.state.pokemon === undefined) { return <div></div>; }

    return(
      <div>
        <div className="pokemon-detail-pane">
          <div className="detail">
            <img src={this.state.pokemon.image_url} />
            {['name', 'attack', 'defense', 'poke_type', 'moves'].map((attr) => {
              return <p key={attr}>{attr}: {this.state.pokemon[attr]}</p>;
            })}
          </div>

          <h2 className='detail-header'>Toys: </h2>
          <ToysIndex toys={this.state.pokemon.toys} />
        </div>

        {this.props.children}

      </div>
    );
  }
});
