import { connect } from 'react-redux';
import ItemDetail from './item_detail';
import { selectPokemonItem } from '../../reducers/selectors';

const mapStateToProps = (state, { params }) => ({
  item: selectPokemonItem(state, parseInt(params.itemId))
});

export default connect(
  mapStateToProps
)(ItemDetail);
