import {connect} from 'react-redux';
import ToyDetail from './toy_detail';
import {requestToy} from '../actions/pokemon_actions';

const mapStateToProps = (state, ownProps) => {
  const toyId = ownProps.params.toyId;
  const toy = state.pokemonDetail.toys[toyId] || {};
  return {
    toyId,
    toy
  };
};

// const mapDispatchToProps = dispatch => ({
// 	requestToy: (id) => dispatch(requestToy(id))
// });

export default connect(
  mapStateToProps,
  null
)(ToyDetail);
