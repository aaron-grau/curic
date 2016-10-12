import { connect } from 'react-redux';
import ItemDetail from './item_detail';
import { selectPokemonToy } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
  const { params: {itemId} } = ownProps;
  const item = selectPokemonToy(state.pokemonDetail, itemId);

  return { item };
};

export default connect(
  mapStateToProps,
  null
)(ItemDetail);
