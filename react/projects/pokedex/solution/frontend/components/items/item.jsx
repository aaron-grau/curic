import React from 'react';
import { withRouter } from 'react-router';

const ToyItem = ({ item, router }) => {
  const handleClick = url => () => router.push(url);

  return(
		<li onClick={handleClick(`/pokemon/${item.pokemon_id}/item/${item.id}`)}>
			<img src={item.image_url} alt={item.name}/>
		</li>
  )
};


export default withRouter(ToyItem);
