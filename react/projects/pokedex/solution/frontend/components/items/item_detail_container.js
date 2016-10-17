import { connect } from 'react-redux';
import ItemDetail from './item_detail';
import { selectPokemonItem } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
  const { params: {itemId} } = ownProps;
  const item = selectPokemonItem(state, parseInt(itemId));
  return { item };
};

export default connect(
  mapStateToProps,
  null
)(ItemDetail);
