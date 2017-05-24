import { connect } from 'react-redux';
import PokemonDetail from './pokemon_detail';
import { requestSinglePokemon } from '../../actions/pokemon_actions';

const mapStateToProps = ({ pokemon, loading }, { match }) => ({
  pokemon: pokemon[match.params.pokemonId],
  loading: loading.detailLoading || !pokemon[match.params.pokemonId]
});

const mapDispatchToProps = dispatch => ({
  requestSinglePokemon: id => dispatch(requestSinglePokemon(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonDetail);
