import React, { Component } from 'react';
import PokemonIndexItem from './pokemon_index_item';
import LoadingIcon from './loading_icon';

class PokemonIndex extends Component {
  componentDidMount() {
    this.props.requestAllPokemon();
  }

  render() {
    const { pokemon, loading, children } = this.props;
    return loading ?
      <LoadingIcon /> :
      <section className="pokedex">
        <ul>
          {pokemon.map(poke => <PokemonIndexItem key={poke.id} pokemon={poke} />)}
        </ul>
        {children}
      </section>
  };
}

export default PokemonIndex;
