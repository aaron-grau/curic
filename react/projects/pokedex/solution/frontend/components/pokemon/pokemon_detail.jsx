import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Item from '../items/item';
import LoadingIcon from './loading_icon';
import ItemDetailContainer from '../items/item_detail_container';

class PokemonDetail extends Component {
  componentDidMount() {
    this.props.requestSinglePokemon(this.props.match.params.pokemonId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.pokemonId !== nextProps.match.params.pokemonId) {
      this.props.requestSinglePokemon(nextProps.match.params.pokemonId);
    }
  }

  render() {
    const { pokemonDetail, loading } = this.props;
    if (loading) {
      return <section className="pokemon-detail"><LoadingIcon /></section>;
    }
    return (
      <section className="pokemon-detail">
        <figure>
          <img src={pokemonDetail.image_url} alt={pokemonDetail.name} />
        </figure>
        <ul>
          <li>
            <h2>{pokemonDetail.name}</h2>
          </li>
          <li>Type: {pokemonDetail.poke_type}</li>
          <li>Attack: {pokemonDetail.attack}</li>
          <li>Defense: {pokemonDetail.defense}</li>
          <li>Moves: {pokemonDetail.moves.join(', ')}</li>
        </ul>
        <section className="toys">
          <h3>Items</h3>
          <ul className="toy-list">
            {pokemonDetail.items.map(item => <Item key={item.name} item={item} />)}
          </ul>
        </section>

        <Route path="/pokemon/:pokemonId/item/:itemId" component={ItemDetailContainer} />
      </section>
    );
  }
}

export default PokemonDetail;
