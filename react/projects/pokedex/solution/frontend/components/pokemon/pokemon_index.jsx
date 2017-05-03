import React, { Component } from 'react';
import PokemonIndexItem from './pokemon_index_item';
import LoadingIcon from './loading_icon';
import PokemonFormContainer from './pokemon_form_container';
import PokemonDetailContainer from './pokemon_detail_container';
import { Route } from 'react-router-dom';

class PokemonIndex extends Component {
  componentDidMount() {
    this.props.requestAllPokemon();
  }

  render() {
    const { pokemon, loading } = this.props;
    return (
      loading ?
      <LoadingIcon /> :
      <section className="pokedex">
        <ul>
          {pokemon.map(poke => (
            <PokemonIndexItem key={poke.id} pokemon={poke} />
          ))}
        </ul>

        <Route exact path="/" component={PokemonFormContainer} />
        <Route path="/pokemon/:pokemonId" component={PokemonDetailContainer} />
      </section>
    );
  }
}

export default PokemonIndex;
