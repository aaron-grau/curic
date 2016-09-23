import { connect } from 'react-redux';
import PokemonIndex from './index';

const mapStateToProps = ({ pokemon, loading }) => ({
  pokemon,
  loading
});

export default connect(
  mapStateToProps
)(PokemonIndex);
