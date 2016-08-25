import { connect } from 'react-redux';
import PokemonDetail from './detail';
import { selectToys } from '../../util/toy_selector';

const mapStateToProps = state => ({
  pokemonDetail: state.pokemonDetail,
  toys: selectToys(state)
});

export default connect(mapStateToProps)(PokemonDetail);
