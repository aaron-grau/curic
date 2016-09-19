import React from 'react';

const ToyDetail = ({ toy }) => (
	<ul>
		<li><h3>{toy.name}</h3></li>
		<li>Happiness: {toy.happiness}</li>
		<li>Price: &#36;{toy.price}</li>
	</ul>
);

export default ToyDetail;
