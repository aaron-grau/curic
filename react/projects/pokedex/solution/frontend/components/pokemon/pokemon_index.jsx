import React, { Component } from 'react';
import PokemonIndexItem from './pokemon_index_item';
import LoadingIcon from './loading_icon';

const PokemonIndexItems = ({ pokemon }) => {
  return (
    <ul>
      { pokemon.map(poke => <PokemonIndexItem key={poke.id} pokemon={poke} />) }
    </ul>
  );
};

class PokemonIndex extends Component {
  componentDidMount() {
    this.props.fetchAllPokemon();
  }

  render() {
    const { pokemon, loading, children } = this.props;
    return loading ?
      <LoadingIcon /> :
      <section className="pokedex">
        <PokemonIndexItems pokemon={ pokemon } children={ children }/>;
        { children }
      </section>
  };

}
export default PokemonIndex;
