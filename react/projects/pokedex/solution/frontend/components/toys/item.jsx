import React from 'react';
import { withRouter } from 'react-router';

const handleClick = (router, url) => (
  () => router.push(url)
);

const ToyItem = ({ toy, router }) => (
		<li onClick={handleClick(router, `/pokemon/${toy.pokemon_id}/toy/${toy.id}`)}>
			<img src={toy.image_url} alt={toy.name}/>
		</li>
);


export default withRouter(ToyItem);
