import { connect } from 'react-redux';
import PokemonDetail from './pokemon_detail';

const mapStateToProps = ({ pokemonDetail }) => ({
  items: pokemonDetail.items,
  pokemonDetail,
});

export default connect(mapStateToProps)(PokemonDetail);
