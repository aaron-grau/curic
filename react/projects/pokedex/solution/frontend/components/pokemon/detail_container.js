import { connect } from 'react-redux';
import PokemonDetail from './detail';
import { selectDetail, selectItems } from '../../reducers/selectors';

const mapStateToProps = state => {
  return ({
    pokemonDetail: state.pokemonDetail,//selectDetail(state),
    items: selectItems(state)
  });
}

export default connect(mapStateToProps)(PokemonDetail);
