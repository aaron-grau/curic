import { connect } from 'react-redux';
import PokemonDetail from './detail';
import { selectDetail, selectItems } from '../../reducers/selectors';

const mapStateToProps = state => {
  return ({
    pokemonDetail: state.pokemonDetail,
    items: state.pokemonDetail.items
  });
};

export default connect(mapStateToProps)(PokemonDetail);
