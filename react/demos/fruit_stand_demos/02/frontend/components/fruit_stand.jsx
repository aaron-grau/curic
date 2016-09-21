import React from 'react';

class FruitStand extends React.Component {
	constructor(props) {
		super(props);
		this.props.store.subscribe(this.forceUpdate.bind(this));
	}

	render() {
		return (
			<ul>
			{this.props.store.getState().map((fruit, idx) => (
				<li key={idx}>{fruit}</li>
			))}
			</ul>
		);
	}
};

export default FruitStand;
