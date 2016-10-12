import { connect } from 'react-redux';
import PokemonDetail from './detail';
import { selectDetail, selectItems } from '../../reducers/selectors';

const mapStateToProps = state => ({
  pokemonDetail: selectDetail(state.pokemonDetail),
  items: selectItems(state.pokemonDetail)
});

export default connect(mapStateToProps)(PokemonDetail);
