import React from 'react';

class ToyDetail extends React.Component {
	render() {
		return (
					<ul>
						<li><h3>{this.props.toy.name}</h3></li>
						<li>Happiness: {this.props.toy.happiness}</li>
						<li>Price: &#36;{this.props.toy.price}</li>
					</ul>
				);
	}
}

export default ToyDetail;
