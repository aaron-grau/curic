import React from 'react';

class ToyDetail extends React.Component {
	render() {
		return (
					<ul>
						<li>{this.props.toy.name}</li>
						<li>{this.props.toy.happiness}</li>
						<li>{this.props.toy.price}</li>
					</ul>
				);
	}
}

export default ToyDetail;
