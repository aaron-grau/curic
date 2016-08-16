import React from 'react';
import {withRouter} from 'react-router';

const handleClick = (router, url) => (
  () => router.push(url)
);

const PokemonIndexItem = ({pokemon, router}) => (
		<li onClick={handleClick(router, `/pokemon/${pokemon.id}`)}>
			<img src={pokemon.image_url} alt={pokemon.name}/>
			<span>{pokemon.name}</span>
		</li>
);


export default withRouter(PokemonIndexItem);
