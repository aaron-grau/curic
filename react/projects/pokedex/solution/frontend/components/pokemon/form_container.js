import { connect } from 'react-redux';
import { createPokemon } from '../../actions/pokemon_actions';
import PokemonForm from './form';

const mapStateToProps = state => ({
	pokemonTypes: state.pokemonTypes,
  pokemonErrors: state.pokemonErrors
});

const mapDispatchToProps = dispatch => ({
	createPokemon: (pokemon) => dispatch(createPokemon(pokemon))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonForm);
