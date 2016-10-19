import { combineReducers } from 'redux';

import PokemonReducer from './pokemon_reducer';
import PokemonDetailReducer from './pokemon_detail_reducer';
import LoadingReducer from './loading_reducer';
import ErrorsReducer from './errors_reducer';

export default combineReducers({
  pokemon: PokemonReducer,
  pokemonDetail: PokemonDetailReducer,
  loading: LoadingReducer,
  errors: ErrorsReducer
});
