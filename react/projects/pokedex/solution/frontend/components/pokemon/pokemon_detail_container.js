import { connect } from 'react-redux';
import PokemonDetail from './pokemon_detail';
import { requestSinglePokemon } from '../../actions/pokemon_actions';

const mapStateToProps = state => ({
  pokemon: state.entities.pokemon[state.ui.pokeDisplay],
  items: state.entities.items,
  loading: state.ui.loading.detailLoading,
});

const mapDispatchToProps = dispatch => ({
  requestSinglePokemon: id => dispatch(requestSinglePokemon(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonDetail);
