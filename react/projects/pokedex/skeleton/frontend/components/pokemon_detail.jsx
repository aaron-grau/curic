import React from 'react';
import ToyItem from './toy_item';

class PokemonDetail extends React.Component {

	componentDidMount() {
		this.props.requestSinglePokemon(this.props.params.pokemonId);
	}

	componentWillReceiveProps(newProps) {
		if (this.props.pokemonDetail && this.props.pokemonDetail.id !== parseInt(newProps.params.pokemonId)) {
				this.props.requestSinglePokemon(newProps.params.pokemonId);
			}
	}

	toys(toys) {
		return (
					<ul>
						{toys.map((toy) => <ToyItem key={toy.name} toy={toy}/>)}
					</ul>
					);
	}

	details() {
		let details;
		if (this.props.pokemonDetail) {
			details = (
					<ul>
					<img src={this.props.pokemonDetail.image_url} alt=""/>
						<li>{this.props.pokemonDetail.name}</li>
						<li>{this.props.pokemonDetail.poke_type}</li>
						<li>{this.props.pokemonDetail.attack}</li>
						<li>{this.props.pokemonDetail.defense}</li>
						<li>{this.props.pokemonDetail.moves.join(', ')}</li>

						{this.toys(this.props.toys)}
					</ul>);
		} else {
			details = <p>LOADING</p>;
		}
		return details;
	}

	render() {
		return (
			<section>
				{this.details()}
				{this.props.children}
			</section>
		);
	}
}

export default PokemonDetail;
