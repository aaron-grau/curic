import { connect } from 'react-redux';
import ToyDetail from './detail';
import { selectPokemonToy } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
  const { params: {toyId} } = ownProps;
  const toy = selectPokemonToy(state.pokemonDetail, toyId);

  return { toy };
};

export default connect(
  mapStateToProps,
  null
)(ToyDetail);
