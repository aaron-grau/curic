import React from 'react';
import { Link } from 'react-router';

const ToyItem = ({ item }) => (
  <li>
    <Link to={`/pokemon/${item.pokemon_id}/item/${item.id}`}>
      <img src={item.image_url} alt={item.name}/>
    </Link>
  </li>
);

export default ToyItem;
