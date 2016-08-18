import {connect} from 'react-redux';
import ToyDetail from './toy_detail';

const mapStateToProps = (state, ownProps) => {
  const toyId = ownProps.params.toyId;
  const toy = state.pokemonDetail.toys[toyId] || {};
  return {
    toy
  };
};

export default connect(
  mapStateToProps,
  null
)(ToyDetail);
