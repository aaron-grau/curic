import {connect} from 'react-redux';
import {requestSinglePokemon} from '../actions/pokemon_actions';
import PokemonDetail from './pokemon_detail';
import {selectToys} from '../util/toy_selector';

const mapStateToProps = (state) => ({
  pokemonDetail: state.pokemonDetail,
  toys: selectToys(state)
});

const mapDispatchToProps = dispatch => ({
	requestSinglePokemon: (id) => dispatch(requestSinglePokemon(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonDetail);
