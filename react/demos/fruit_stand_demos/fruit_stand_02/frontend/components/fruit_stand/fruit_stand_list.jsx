import React from 'react';
import FruitStandListItem from './fruit_stand_list_item';

class FruitStandList extends React.Component {
	constructor(props) {
		super(props);

		this.handleRestock = this.handleRestock.bind(this);
	}

	handleRestock() {
		this.props.addFruits([
			'peach',
			'peach'
		]);
	}

	render() {
		return (
			<div className='fruit-stand-list'>
				<ul>
					{this.props.fruits.map((fruit, idx) => (
						<FruitStandListItem key={idx} fruit={fruit} />
					))}
				</ul>
	      <button onClick={this.handleRestock}>Re-stock!</button>
				<button onClick={this.props.sellOut}>Sell out!</button>
			</div>
		);
	}
};

export default FruitStandList;
