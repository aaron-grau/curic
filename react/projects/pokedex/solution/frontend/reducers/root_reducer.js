import { combineReducers } from 'redux';

import PokemonReducer from './pokemon_reducer';
import LoadingReducer from './loading_reducer';
import ErrorsReducer from './errors_reducer';

export default combineReducers({
  pokemon: PokemonReducer,
  loading: LoadingReducer,
  errors: ErrorsReducer
});
