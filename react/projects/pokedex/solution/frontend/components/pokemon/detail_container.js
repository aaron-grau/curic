import { connect } from 'react-redux';
import PokemonDetail from './detail';
import { selectDetail, selectToys } from '../../reducers/selectors';

const mapStateToProps = state => ({
  pokemonDetail: selectDetail(state.pokemonDetail),
  toys: selectToys(state.pokemonDetail)
});

export default connect(mapStateToProps)(PokemonDetail);
