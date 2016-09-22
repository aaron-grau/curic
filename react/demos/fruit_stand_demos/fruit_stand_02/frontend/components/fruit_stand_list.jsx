import React from 'react';
import FruitStandListItem from './fruit_stand_list_item';

class FruitStandList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='fruit-stand-list'>
				<ul>
					{this.props.fruits.map((fruit, idx) => (
						<FruitStandListItem key={idx} fruit={fruit} />
					))}
				</ul>
	      <button onClick={this.props.addFruits}>Re-stock!</button>
			</div>
		);
	}
};

export default FruitStandList;
