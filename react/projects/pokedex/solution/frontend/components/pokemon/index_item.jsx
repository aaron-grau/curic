import React from 'react';
import { withRouter } from 'react-router';

const handleClick = (router, url) => (
  () => router.push(url)
);

const PokemonIndexItem = ({ pokemon, router }) => (
		<li
      className="pokemon-index-item"
      onClick={handleClick(router, `/pokemon/${pokemon.id}`)}>
			<span>{pokemon.id}</span>
			<img src={pokemon.image_url} alt={pokemon.name}/>
			<span>{pokemon.name}</span>
		</li>
);

export default withRouter(PokemonIndexItem);
