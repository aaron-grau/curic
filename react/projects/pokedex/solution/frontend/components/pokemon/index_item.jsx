import React from 'react';
import History from '../../util/history';

const handleClick = url => (
  () => History.push(url)
);

const PokemonIndexItem = ({pokemon}) => (
		<li
      className="pokemon-index-item"
      onClick={handleClick(`/pokemon/${pokemon.id}`)}>
			<span>{pokemon.id}</span>
			<img src={pokemon.image_url} alt={pokemon.name}/>
			<span>{pokemon.name}</span>
		</li>
);

export default PokemonIndexItem;
