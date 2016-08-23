import { connect } from 'react-redux';
import PokemonIndex from './pokemon_index';

const mapStateToProps = state => ({
  pokemon: state.pokemon,
  loading: state.loading
});

export default connect(mapStateToProps)(PokemonIndex);
