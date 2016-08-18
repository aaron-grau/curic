import React from 'react';
import ToyItem from './toy_item';

class PokemonDetail extends React.Component {

	componentDidMount() {
		this.props.requestSinglePokemon(this.props.params.pokemonId);
	}

	componentWillReceiveProps(newProps) {
		if (this.props.pokemonDetail &&
			this.props.pokemonDetail.id !== parseInt(newProps.params.pokemonId, 10)) {
				this.props.requestSinglePokemon(newProps.params.pokemonId);
			}
	}

	toys(toys) {
		return (
					<section className="toys">
							<h3>Toys</h3>
						<ul className="toy-list">
							{toys.map((toy) => <ToyItem key={toy.name} toy={toy}/>)}
						</ul>
					</section>
					);
	}

	details() {
		let details;
		if (this.props.pokemonDetail) {
			details = (
					<ul>
					<img src={this.props.pokemonDetail.image_url} alt=""/>
						<li><h2>{this.props.pokemonDetail.name}</h2></li>
						<li>Type: {this.props.pokemonDetail.poke_type}</li>
						<li>Attack: {this.props.pokemonDetail.attack}</li>
						<li>Defense: {this.props.pokemonDetail.defense}</li>
						<li>Moves: &#34;{this.props.pokemonDetail.moves.join(', ')}&#34;</li>

						{this.toys(this.props.toys)}
					</ul>);
		} else {
			details = <p>LOADING</p>;
		}
		return details;
	}

	render() {
		return (
			<section className="pokemon-detail">
				{this.details()}
				{this.props.children}
			</section>
		);
	}
}

export default PokemonDetail;
