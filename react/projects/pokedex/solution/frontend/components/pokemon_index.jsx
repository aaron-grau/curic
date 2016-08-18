import React from 'react';
import PokemonIndexItem from './pokemon_index_item';

class PokemonIndex extends React.Component {

	componentDidMount() {
		this.props.requestAllPokemon();
	}

	render() {
		return (
			<section className="pokedex">
				<ul>
					{this.props.pokemon && this.props.pokemon.map((pokemon)=> {
						return (<PokemonIndexItem key={pokemon.id} pokemon={pokemon}/>);
					})}
				</ul>

				{this.props.children}
			</section>
		);
	}
}

export default PokemonIndex;
