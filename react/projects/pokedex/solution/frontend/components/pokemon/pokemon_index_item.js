import React from 'react';
import { Link } from 'react-router';

const PokemonIndexItem = ({ pokemon, router }) => (
  <li className="pokemon-index-item">
    <Link to={`/pokemon/${pokemon.id}`}>
      <span>{pokemon.id}</span>
      <img src={pokemon.image_url} alt={pokemon.name} />
      <span>{pokemon.name}</span>
    </Link>
  </li>
);

export default PokemonIndexItem;
