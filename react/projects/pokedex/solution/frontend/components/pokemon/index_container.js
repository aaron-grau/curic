import { connect } from 'react-redux';
import PokemonIndex from './index';

const mapStateToProps = state => ({
  pokemon: state.pokemon,
  loading: state.loading
});

export default connect(mapStateToProps)(PokemonIndex);
