import { connect } from 'react-redux';
import PokemonDetail from './pokemon_detail';
import { fetchSinglePokemon } from '../../actions/pokemon_actions';

const mapStateToProps = ({ pokemonDetail, loading }) => ({
  pokemonDetail,
  loading: loading.detailLoading
});

const mapDispatchToProps = dispatch => ({
  fetchSinglePokemon: id => dispatch(fetchSinglePokemon(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonDetail);
