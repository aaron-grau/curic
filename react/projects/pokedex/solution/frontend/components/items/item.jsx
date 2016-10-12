import React from 'react';
import { withRouter } from 'react-router';

const handleClick = (router, url) => (
  () => router.push(url)
);

const ToyItem = ({ item, router }) => (
		<li onClick={handleClick(router, `/pokemon/${item.pokemon_id}/item/${item.id}`)}>
			<img src={item.image_url} alt={item.name}/>
		</li>
);


export default withRouter(ToyItem);
