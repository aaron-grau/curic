import React from 'react';
import History from '../../util/history';

const handleClick = url => (
  () => History.push(url)
);

const ToyItem = ({item}) => (
		<li onClick={handleClick(`/pokemon/${item.pokemon_id}/item/${item.id}`)}>
			<img src={item.image_url} alt={item.name}/>
		</li>
);


export default ToyItem;
